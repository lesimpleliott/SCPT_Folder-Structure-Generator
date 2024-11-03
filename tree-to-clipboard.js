import clipboardy from "clipboardy";
import fs from "fs";
import inquirer from "inquirer";
import path from "path";

// Function to generate the tree structure as a string
const generateTreeStructure = (dir, indent = "") => {
  const files = fs.readdirSync(dir);
  let tree = "";

  files.forEach((file, index) => {
    const isLast = index === files.length - 1;
    const prefix = isLast ? "└─ " : "├─ ";
    const filePath = path.join(dir, file);
    const stats = fs.lstatSync(filePath);

    // Ignore the contents of .git, node_modules, and ignore .DS_Store files
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

  const dir = answers.directory;
  const treeStructure = generateTreeStructure(dir);

  // Print the tree structure to the terminal
  console.log(treeStructure);

  // Copy the tree structure to the clipboard
  clipboardy.writeSync(treeStructure);

  // Print success message
  console.log(
    "La structure du dossier a été copiée dans le presse-papiers avec succès !"
  );
})();
