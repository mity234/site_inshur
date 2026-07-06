import { Client } from "basic-ftp";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localDir = path.resolve(__dirname, "..", "out");
const remoteDir = process.argv[2];

if (!remoteDir) {
  console.error("Использование: node ftp-deploy.mjs <remoteDir>");
  process.exit(1);
}

const client = new Client();
try {
  await client.access({
    host: process.env.FTP_HOST,
    port: Number(process.env.FTP_PORT ?? 21),
    user: process.env.FTP_USER,
    password: process.env.FTP_PASSWORD,
  });
  console.log(`Загружаю ${localDir} -> ${remoteDir}`);
  await client.ensureDir(remoteDir);
  // Не чистим remoteDir целиком — там может лежать /media с видео для соцсетей.
  await client.uploadFromDir(localDir);
  console.log("Готово.");
} finally {
  client.close();
}
