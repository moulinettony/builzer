import type { NextApiRequest, NextApiResponse } from "next";
import { supabase } from "../../app/utils/supabaseClient";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    try {
      const { title, sublink, titleSize, buttonSize } = req.body;

      // Validate input
      if (
        typeof title !== "string" ||
        typeof sublink !== "string" ||
        typeof titleSize !== "string" ||
        typeof buttonSize !== "string"
      ) {
        return res.status(400).json({ message: "Invalid data" });
      }

      const existingId = 1; // Replace with the actual ID of the row you want to update

      const { data, error } = await supabase
        .from("content")
        .upsert([{ id: existingId, title, sublink, titleSize, buttonSize }], {
          onConflict: "id",
        });

      if (error) {
        console.error("Error upserting data:", error.message);
      } else {
        console.log("Data upserted successfully:", data);
      }

      res.status(200).json({ message: "Content saved successfully" });
    } catch (error) {
      console.error("Error in API handler:", error); // Log general error details
      if (error instanceof Error) {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: error.message });
      } else {
        res
          .status(500)
          .json({ message: "Internal Server Error", error: "Unknown error" });
      }
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
