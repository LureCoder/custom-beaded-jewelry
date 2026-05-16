// get-new-arrivals.ts: 按日期读取新品图片 — 从最新日期文件夹读取
import { readdirSync, existsSync } from "fs";
import { join } from "path";

const NEW_ARRIVALS_DIR = join(process.cwd(), "public", "images", "new");

function getDateFolders(): string[] {
  if (!existsSync(NEW_ARRIVALS_DIR)) return [];

  const entries = readdirSync(NEW_ARRIVALS_DIR, { withFileTypes: true });
  const folders = entries
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name)
    .filter((name) => /^\d{4}-\d{2}-\d{2}$/.test(name))
    .sort((a, b) => b.localeCompare(a));

  return folders;
}

function getImagesInFolder(dateFolder: string): string[] {
  const folderPath = join(NEW_ARRIVALS_DIR, dateFolder);
  if (!existsSync(folderPath)) return [];

  const entries = readdirSync(folderPath, { withFileTypes: true });
  const images = entries
    .filter((entry) => entry.isFile())
    .filter((entry) => /\.(jpeg|jpg|png|webp)$/i.test(entry.name))
    .map((entry) => `/images/new/${dateFolder}/${entry.name}`)
    .sort();

  return images;
}

export function getNewArrivals(): { date: string; images: string[] } {
  const dateFolders = getDateFolders();

  for (const folder of dateFolders) {
    const images = getImagesInFolder(folder);
    if (images.length > 0) {
      return { date: folder, images };
    }
  }

  return { date: "", images: [] };
}
