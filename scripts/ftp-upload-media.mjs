import { Client } from "basic-ftp";
import path from "node:path";

const localPath = process.argv[2];
const remoteDir = process.argv[3] ?? "/www/topinshur.online/media";

if (!localPath) {
  console.error("Использование: node ftp-upload-media.mjs <localPath> [remoteDir]");
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
  await client.ensureDir(remoteDir);
  const fileName = path.basename(localPath);
  await client.uploadFrom(localPath, fileName);
  console.log(`Загружено: ${remoteDir}/${fileName}`);
} finally {
  client.close();
}
