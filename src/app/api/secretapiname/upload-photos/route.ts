import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/utils/mongodb'; // Utility to connect to MongoDB
import { CompanyPhoto } from '@/models/CompanyPhoto'; // Mongoose model for CompanyPhoto

// API to upload photos and store data in MongoDB
export async function POST(req: NextRequest) {
  const { company, description, photos } = await req.json();

  if (!company || !description || !photos || photos.length === 0) {
    return NextResponse.json(
      { message: 'Please provide company, description, and at least one photo.' },
      { status: 400 }
    );
  }

  try {
    await connectToDatabase();

    const newCompanyPhoto = new CompanyPhoto({
      company,
      description,
      photos, // Array of base64 images
      createdAt: new Date(),
    });

    // Save the new document to MongoDB
    await newCompanyPhoto.save();

    return NextResponse.json({ message: 'Photos uploaded successfully!' }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: 'An error occurred while uploading photos.' },
      { status: 500 }
    );
  }
}
