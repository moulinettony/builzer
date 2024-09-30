import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    console.log("Received data:", data);  // DEBUG: Ensure correct data is received

    const filePath = path.join(process.cwd(), "data", "new-page.json");

    // Save the data to the file
    fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf8");

    return NextResponse.json({ message: "Page saved successfully!" });
  } catch (error) {
    console.error("Error saving page:", error);
    return NextResponse.json({ message: "Error saving page" }, { status: 500 });
  }
}
