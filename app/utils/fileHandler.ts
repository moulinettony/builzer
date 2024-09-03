// utils/fileHandler.ts
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('data.json');

export const readData = () => {
  const rawData = fs.readFileSync(filePath, 'utf-8');
  return JSON.parse(rawData);
};

export const writeData = (data: any) => {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
};