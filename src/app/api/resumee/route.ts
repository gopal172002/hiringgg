import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

export async function POST(req: NextRequest): Promise<NextResponse> {
  try {
    const formData = await req.formData();
    const file = formData.get("resume") as File | null;
    const jobDescription = formData.get("jobDescription") as string | null;

    // Validate inputs
    if (!file || !jobDescription) {
      return NextResponse.json(
        { error: "Resume and job description are required." },
        { status: 400 }
      );
    }

    // File size validation (5 MB limit)
    const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5 MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: "File size exceeds the allowed limit of 5 MB." },
        { status: 400 }
      );
    }

    // Read `.tex` file content
    const fileBuffer = Buffer.from(await file.arrayBuffer());
    const resumeContent = fileBuffer.toString("utf-8");

    if (!resumeContent.trim()) {
      return NextResponse.json(
        { error: "Uploaded file is empty or invalid." },
        { status: 400 }
      );
    }

    // Log file details for debugging
    console.log("Uploaded File Details:", {
      name: file.name,
      size: fileBuffer.length,
      mimeType: file.type,
    });

    // Initialize the Google Generative AI client
    if (!process.env.GEMINI_API_KEY) {
      throw new Error("GEMINI_API_KEY is not set in the environment variables.");
    }
    const EN=process.env.GEMINI_API_KEY || "AIzaSyB0dAEUQ10ruhR45mIfKqWi_WgWHknJSlM"
    
    console.log(EN);
    const genAI = new GoogleGenerativeAI(EN);

    // Use Google Gemini API to modify the `.tex` content
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });
    const response = await model.generateContent([
      {
        inlineData: {
          data: Buffer.from(resumeContent).toString("base64"),
          mimeType: "text/plain", // `.tex` files are treated as plain text
        },
      },
      {
        text: `
        Below is a LaTeX resume. Modify the LaTeX code to:
        - Add only the technical skills required for the following job description.
        - Ensure the additions integrate seamlessly within the LaTeX structure.
        - Do not add or modify sections unrelated to technical skills.

        LaTeX Code:
        ${resumeContent}

        Job Description:
        ${jobDescription}

        Return the full modified LaTeX code as output without any extra comments or explanations.`,
      },
    ]);

    const tailoredContent =
      response?.response?.text?.() || "No tailored content generated.";

    // Return the tailored `.tex` file
    return new NextResponse(tailoredContent, {
      headers: {
        "Content-Disposition": `attachment; filename=${file.name || "tailored_resume"}.tex`,
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("Error processing the request:", error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
