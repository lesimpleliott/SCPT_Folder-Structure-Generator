import fs from "fs";
import path from "path";

const EXCLUDED = [".git", "node_modules", ".next", ".DS_Store"];

export function generateTreeStructure(dir, options = {}) {
  const {
    indent = "",
    level = 0,
    maxDepth = Infinity,
    lightMode = false,
  } = options;

  const files = fs.readdirSync(dir);
  let tree = "";

  files.forEach((file, index) => {
    if (EXCLUDED.includes(file)) return;

    const filePath = path.join(dir, file);
    const stats = fs.lstatSync(filePath);
    const isLast = index === files.length - 1;
    const prefix = isLast ? "└─ " : "├─ ";

    const nextIndent = indent + (isLast ? "   " : "│  ");

    // Light mode : n'affiche que fichiers + dossiers jusqu'au niveau 2
    if (lightMode && level >= 2 && !stats.isDirectory()) return;

    tree += indent + prefix + file + "\n";

    if (stats.isDirectory() && level < maxDepth) {
      tree += generateTreeStructure(filePath, {
        indent: nextIndent,
        level: level + 1,
        maxDepth,
        lightMode,
      });
    }
  });

  return tree;
}
