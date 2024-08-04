import { NextResponse } from "next/server";
import fs, { readdir, readFile } from 'fs/promises';
import path from "path";

export async function POST(request:Request, content:any){

    try{
    const data = await request.json();
  //console.log(data);
    const dirPath = path.join(process.cwd(), 'src', '_data', 'jsonFromData');
    //if required read directory
    //const rdDir = await readdir(dirPath);
    //read file from current directory.
    const filePath = path.join(dirPath, `${data.slug}.json`);

    //console.log('Directory path:', dirPath);
    //console.log('File path:', filePath);

try {
        await fs.access(filePath);
      } catch {
        return NextResponse.json({ error: `File not found: ${data.slug}.json` }, { status: 404 });
      }

    // Read the file from the directory
    const fileContent = await readFile(filePath, 'utf-8');
   //const fileContent = await fs.readFile(filePath, 'utf-8');
    return NextResponse.json({ content: JSON.parse(fileContent) });

    }catch(error){
        return NextResponse.json({ error: (error as Error).message }, { status: 500 });
 
    }
}