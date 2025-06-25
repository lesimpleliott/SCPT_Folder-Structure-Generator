import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";

// Fonction pour générer la structure arborescente au format Markdown
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
  try {
    // Étape 1 : Saisie et nettoyage du dossier
    const { directory: rawDirectory } = await inquirer.prompt([
      {
        type: "input",
        name: "directory",
        message: "Please enter the path to the folder:",
      },
    ]);

    // Nettoyage des guillemets simples ou doubles
    const directory = rawDirectory.replace(/^["']|["']$/g, "");

    // Validation du dossier (après nettoyage)
    if (!fs.existsSync(directory) || !fs.lstatSync(directory).isDirectory()) {
      console.error(
        "The folder does not exist. Please enter a valid directory path."
      );
      process.exit(1);
    }

    // Étape 2 : Génération de l’arborescence
    const folderStructure = generateTreeStructure(directory);

    // Étape 3 : Écriture dans content.md dans le dossier sélectionné
    const outputPath = path.join(directory, "content.md");
    await fs.writeFile(outputPath, folderStructure);
    console.log(`The folder structure has been saved to: ${outputPath}`);

    // Étape 4 : Affichage de l’arborescence dans la console
    console.log("\nArborescence générée :\n");
    console.log(folderStructure);
  } catch (error) {
    console.error("An error occurred:", error);
  }
})();
