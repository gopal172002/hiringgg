import { NextResponse } from 'next/server';
import connectMongo from '@/models/mongo';
import {CompanyPhoto} from '@/models/CompanyPhoto';  

export async function GET() {
  try {
    await connectMongo(); 
    const photos = await CompanyPhoto.find(); 
    // console.log('Fetched photos:', photos);
    return NextResponse.json(photos); 
  } catch (error) {
    return NextResponse.json({ message: 'Error fetching data from database', error }, { status: 500 });
  }
}
