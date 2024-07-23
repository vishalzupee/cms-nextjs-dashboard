import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request:any) {
  try {
    const formData = await request.json();
    //const filePath = path.join(process.cwd(), 'public', 'formData.json');
    const dataDir = path.join(process.cwd(), 'src', '_data','jsonFromData');
    const filePath = path.join(dataDir, 'formData.json');

    fs.writeFileSync(filePath, JSON.stringify(formData, null, 2));
    return NextResponse.json({ message: 'Form data saved successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error writing file:', error);
    return NextResponse.json({ error: 'Error saving data' }, { status: 500 });
  }
}
