import clipboardy from "clipboardy";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";

// Fonction pour générer la structure arborescente sous forme de chaîne
const generateTreeStructure = (dir, indent = "") => {
  const files = fs.readdirSync(dir);
  let tree = "";

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const prefix = isLast ? "└─ " : "├─ ";
    const filePath = path.join(dir, file);
    const stats = fs.lstatSync(filePath);

    if (file === ".git" || file === "node_modules" || file === ".next") {
      tree += `${indent}${prefix}${file}\n`;
      return;
    }
    if (file === ".DS_Store") {
      return;
    }

    tree += `${indent}${prefix}${file}\n`;
    if (stats.isDirectory()) {
      tree += generateTreeStructure(
        filePath,
        `${indent}${isLast ? "   " : "│  "}`
      );
    }
  });

  return tree;
};

(async () => {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "directory",
      message: "Veuillez entrer le chemin du dossier à examiner:",
      default: ".",
    },
  ]);

  // Nettoie les guillemets simples ou doubles éventuels
  const dir = answers.directory;
  const cleanDir = dir.replace(/^["']|["']$/g, "");

  const treeStructure = generateTreeStructure(cleanDir);

  // Affiche la structure dans le terminal
  console.log(treeStructure);

  // Copie dans le presse-papiers
  clipboardy.writeSync(treeStructure);

  // Message de succès
  console.log(
    "La structure du dossier a été copiée dans le presse-papiers avec succès !"
  );
})();
