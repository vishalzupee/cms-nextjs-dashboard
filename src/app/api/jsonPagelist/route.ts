import { NextResponse } from "next/server";
import fs from 'fs/promises';
import path from "path";

export async function GET() {
    try {
        const dirPath = path.join(process.cwd(), 'src', '_data', 'jsonFromData');
        const files = await fs.readdir(dirPath);

        const data = await Promise.all(files.map(async (file) => {
            const filePath = path.join(dirPath, file);
            const fileContent = await fs.readFile(filePath, 'utf-8');
            return { fileName: file, content: JSON.parse(fileContent) };
        }));

        return NextResponse.json(data);
    } catch (e: any) {
        return NextResponse.json({ "Error": e.message });
    }
}
