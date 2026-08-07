export function GET() {
    return Response.json("Welcome to the Dinosaur app");
    
}
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    // 读取原始文件内容
    const filePath = path.join(process.cwd(), 'src/app/api/data.json');
    let rawData = fs.readFileSync(filePath, 'utf8');

    // 【关键步骤】清洗非法控制字符
    // 正则解释：匹配 Unicode 0x00 到 0x1F 之间的所有控制字符
    // 如果业务数据中允许换行，需确保 JSON 字符串内的换行是转义的 (\n)，否则建议直接移除
    const cleanedRaw = rawData.replace(/[\u0000-\u001f]/g, '');

    // 解析清洗后的 JSON
    const data = JSON.parse(cleanedRaw);

    return NextResponse.json(data);
  } catch (error) {
    console.error('Failed to parse data.json:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
