import fs from "fs-extra";
import inquirer from "inquirer";
import path from "path";

// Function to generate the tree structure as a Markdown string
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
  try {
    // Step 1: Prompt the user to select a folder
    const { directory } = await inquirer.prompt([
      {
        type: "input",
        name: "directory",
        message: "Please enter the path to the folder:",
        validate: (input) =>
          fs.existsSync(input) && fs.lstatSync(input).isDirectory()
            ? true
            : "The folder does not exist. Please enter a valid directory path.",
      },
    ]);

    // Step 2: Generate the tree structure
    const folderStructure = generateTreeStructure(directory);

    // Step 3: Write to content.md in the selected folder
    const outputPath = path.join(directory, "content.md");
    await fs.writeFile(outputPath, folderStructure);
    console.log(`The folder structure has been saved to: ${outputPath}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }

  // Step 4 : Write the tree structure to the console
  // TO BE CODED
})();
