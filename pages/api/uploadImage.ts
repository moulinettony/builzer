// api/uploadImage.ts
import { NextApiRequest, NextApiResponse } from "next";
import formidable, { File } from "formidable";
import fs from "fs/promises";
import { supabaseAdmin } from "../../app/utils/supabaseClient"; // Use supabaseAdmin for server-side operations

export const config = {
  api: {
    bodyParser: false, // formidable will handle body parsing
  },
};

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Formidable parse error:', err);
        return res.status(500).json({ message: 'File upload failed' });
      }

      const uploadedFile = Array.isArray(files.file) ? files.file[0] : files.file;

      if (!uploadedFile) {
        return res.status(400).json({ message: 'No file uploaded' });
      }

      const file = uploadedFile as File;
      const fileData = await fs.readFile(file.filepath);

      // Fix: Make sure targetColumn is a string
      const targetColumn = Array.isArray(fields.column) ? fields.column[0] : fields.column || "image1"; 

      // Upload to Supabase Storage using the service role key (supabaseAdmin)
      const { data, error: storageError } = await supabaseAdmin.storage
        .from('images') // Replace 'images' with your bucket name
        .upload(`public/${Date.now()}_${file.originalFilename}`, fileData, {
          contentType: file.mimetype || undefined,
        });

      if (storageError) {
        console.error('Supabase storage upload error:', storageError);
        return res.status(500).json({ message: 'Error uploading to Supabase storage' });
      }

      // Get public URL of the uploaded file
      const { data: publicData } = supabaseAdmin.storage
        .from('images')
        .getPublicUrl(data.path);

      const publicUrl = publicData?.publicUrl;

      if (!publicUrl) {
        console.error('Public URL is null');
        return res.status(500).json({ message: 'Error generating public URL' });
      }

      // Save the public URL to the correct column (image1 or image2)
      await updateSupabase(publicUrl, targetColumn);

      // Return success message
      return res.status(200).json({ message: 'Image uploaded successfully', imageUrl: publicUrl });
    });
  } catch (error) {
    console.error('Unexpected server error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}

async function updateSupabase(imageUrl: string, column: string) {
  const { data, error } = await supabaseAdmin // Use supabaseAdmin here as well
    .from("content")
    .update({ [column]: imageUrl }) // Dynamically update either image1 or image2 based on the column
    .eq("id", 1); // Adjust the ID as needed

  if (error) {
    console.error("Error updating Supabase:", error);
    throw new Error("Failed to update Supabase");
  }
}
