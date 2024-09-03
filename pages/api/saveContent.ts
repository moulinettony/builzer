import type { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const { title, sublink, titleSize, buttonSize } = req.body;

      // Validate input
      if (typeof title !== 'string' || typeof sublink !== 'string' ||
          typeof titleSize !== 'string' || typeof buttonSize !== 'string') {
        return res.status(400).json({ message: 'Invalid data' });
      }

      // Define the path to the data.json file
      const filePath = path.join(process.cwd(), 'public', 'data.json');

      // Log file path and data for debugging
      console.log('File path:', filePath);
      console.log('Data to save:', { title, sublink, titleSize, buttonSize });

      // Write the data to the JSON file
      fs.writeFileSync(filePath, JSON.stringify({ title, sublink, titleSize, buttonSize }, null, 2));

      res.status(200).json({ message: 'Content saved successfully' });
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ message: 'Internal Server Error' });
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}
