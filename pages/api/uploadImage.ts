// pages/api/uploadImage.ts
import { NextApiRequest, NextApiResponse } from 'next';
import formidable, { File } from 'formidable';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from "../../app/utils/supabaseClient";

export const config = {
  api: {
    bodyParser: false, // formidable will handle body parsing
  },
};

const uploadDir = path.join(process.cwd(), 'public', 'uploads'); // Define the upload directory

export default async function uploadImage(req: NextApiRequest, res: NextApiResponse) {
  try {
    // Ensure the upload directory exists
    await fs.mkdir(uploadDir, { recursive: true });

    // Initialize formidable
    const form = formidable({
      multiples: false, // Only allow single file uploads
      uploadDir, // Store uploads in the defined directory
      filename: (name, ext, part) => {
        return Date.now().toString() + '_' + part.originalFilename; // Unique filename
      },
    });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('File upload error:', err);
        return res.status(500).json({ message: 'File upload failed' });
      }

      const uploadedFile = files.file; // Access the uploaded file

      if (Array.isArray(uploadedFile)) {
        const file = uploadedFile[0];
        const newPath = path.join('/uploads', path.basename(file.filepath));
        await updateSupabase(newPath); // Update Supabase with the new path
        return res.status(200).json({ imageUrl: newPath });
      } else if (uploadedFile) {
        const file = uploadedFile as File;
        const newPath = path.join('/uploads', path.basename(file.filepath));
        await updateSupabase(newPath); // Update Supabase with the new path
        return res.status(200).json({ imageUrl: newPath });
      } else {
        return res.status(400).json({ message: 'No file uploaded' });
      }
    });
  } catch (error) {
    console.error('Error handling the upload:', error);
    res.status(500).json({ message: 'Error handling the upload' });
  }
}

async function updateSupabase(imagePath: string) {
  // Update your Supabase table with the new image path
  const { data, error } = await supabase
    .from('content')
    .update({ image1: imagePath })
    .eq('id', 1); // Change this to the appropriate condition for updating the correct row

  if (error) {
    console.error('Error updating Supabase:', error);
    throw new Error('Failed to update Supabase');
  }
}