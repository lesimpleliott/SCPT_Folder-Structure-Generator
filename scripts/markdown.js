import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";
import { generateTreeStructure } from "./core.js";

const { directory } = await inquirer.prompt([
  {
    type: "input",
    name: "directory",
    message: "Dossier à convertir en fichier Markdown :",
    default: ".",
  },
]);

const cleanDir = directory.replace(/^["']|["']$/g, "");
const isValid = fs.existsSync(cleanDir) && fs.lstatSync(cleanDir).isDirectory();

if (!isValid) {
  console.error("❌ Le dossier spécifié n'existe pas ou n'est pas valide.");
  process.exit(1);
}

const tree = generateTreeStructure(cleanDir);
const outputPath = path.join(cleanDir, "content.md");
await fs.writeFile(outputPath, tree);

console.log(`\n✅ Fichier Markdown généré : ${outputPath}`);
