import inquirer from "inquirer";
import clipboardy from "clipboardy";
import { generateTreeStructure } from "./core.js";

const { directory } = await inquirer.prompt([
  {
    type: "input",
    name: "directory",
    message: "Dossier à analyser :",
    default: ".",
  },
]);

const cleanDir = directory.replace(/^["']|["']$/g, "");
const tree = generateTreeStructure(cleanDir);

console.log(tree);
clipboardy.writeSync(tree);
console.log("\n✅ Structure copiée dans le presse-papiers.");
