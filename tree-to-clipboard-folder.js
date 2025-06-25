import clipboardy from "clipboardy";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";

const EXCLUDED = [".git", "node_modules", ".next", ".DS_Store"];

const generateFilteredTree = (dir, level = 0, indent = "") => {
  const files = fs.readdirSync(dir);
  let tree = "";

  files.forEach((file, index) => {
    if (EXCLUDED.includes(file)) return;

    const isLast = index === files.length - 1;
    const prefix = isLast ? "└─ " : "├─ ";
    const filePath = path.join(dir, file);
    const stats = fs.lstatSync(filePath);

    if (level < 2) {
      // Niveau 0 et 1 : fichiers et dossiers
      tree += `${indent}${prefix}${file}\n`;
      if (stats.isDirectory()) {
        tree += generateFilteredTree(
          filePath,
          level + 1,
          `${indent}${isLast ? "   " : "│  "}`
        );
      }
    } else {
      // À partir du niveau 2 (3e niveau réel) : uniquement les dossiers
      if (stats.isDirectory()) {
        tree += `${indent}${prefix}${file}\n`;
        tree += generateFilteredTree(
          filePath,
          level + 1,
          `${indent}${isLast ? "   " : "│  "}`
        );
      }
    }
  });

  return tree;
};

(async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "directory",
      message: "Veuillez entrer le chemin du dossier à examiner :",
      default: ".",
    },
  ]);

  const cleanDir = answers.directory.replace(/^["']|["']$/g, "");

  const treeStructure = generateFilteredTree(cleanDir);

  console.log(treeStructure);
  clipboardy.writeSync(treeStructure);

  console.log("Structure copiée dans le presse-papiers avec succès !");
})();
