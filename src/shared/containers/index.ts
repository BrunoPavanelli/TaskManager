import fs from 'fs';
import path from 'path';

function searchContainerInSubFolders(folderPath: string) {
  const subfolders = fs
    .readdirSync(folderPath, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  subfolders.forEach((subfolder) => {
    const containerFolder = path.resolve(folderPath, subfolder, 'container');

    if (fs.existsSync(containerFolder)) {
      require(containerFolder);
    }
  });
}

const modulesPath = path.resolve(__dirname, '..', '..', 'modules');

searchContainerInSubFolders(modulesPath);
