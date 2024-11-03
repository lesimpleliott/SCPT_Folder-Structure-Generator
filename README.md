
# Folder Structure Generator

## Introduction
Folder Structure Generator est un script conçu pour générer la structure d'un dossier sous forme de fichier Markdown ou pour la copier directement dans le presse-papiers. Ce projet facilite l'exploration et la documentation de la hiérarchie des fichiers dans un répertoire donné.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Dependencies](#dependencies)
- [Scripts Overview](#scripts-overview)
- [Contributing](#contributing)
- [License](#license)

## Installation
Pour installer ce projet, assurez-vous d'avoir Node.js installé sur votre machine, puis suivez ces étapes :

1. Clonez le dépôt ou téléchargez les fichiers.
2. Installez les dépendances en exécutant la commande suivante :
   \`\`\`bash
   npm install
   \`\`\`

## Usage
Le projet propose deux scripts principaux pour travailler avec la structure des dossiers :

### 1. Copier la structure du dossier dans le presse-papiers
Pour utiliser le script qui copie la structure d'un dossier dans le presse-papiers, exécutez la commande :
\`\`\`bash
npm run clipboard
\`\`\`
Ce script vous demandera le chemin du dossier que vous souhaitez analyser et copiera la structure dans le presse-papiers.

### 2. Générer un fichier Markdown de la structure du dossier
Pour générer un fichier \`content.md\` contenant la structure d'un dossier, utilisez la commande suivante :
\`\`\`bash
npm run markdown
\`\`\`
Le script vous demandera le chemin du dossier à examiner et créera un fichier \`content.md\` dans le même dossier.

## Features
- **Structure de dossier intuitive** : Visualisation en arborescence facile à lire.
- **Sortie flexible** : Copie dans le presse-papiers ou sauvegarde dans un fichier Markdown.
- **Exclusion automatique** : Les dossiers comme \`.git\`, \`node_modules\`, et \`.next\` ainsi que les fichiers \`.DS_Store\` sont ignorés pour garder la sortie propre.

## Dependencies
Le projet utilise les dépendances suivantes :
- **[clipboardy](https://www.npmjs.com/package/clipboardy)** : Pour copier la sortie dans le presse-papiers.
- **[fs-extra](https://www.npmjs.com/package/fs-extra)** : Extension de \`fs\` pour une meilleure gestion des fichiers.
- **[inquirer](https://www.npmjs.com/package/inquirer)** : Pour l'interaction en ligne de commande.

Installez toutes les dépendances avec :
\`\`\`bash
npm install
\`\`\`

## Scripts Overview
### tree-to-clipboard.js
Ce script génère la structure d'un dossier et la copie dans le presse-papiers. Il est interactif et demande le chemin du dossier à analyser.

### tree-to-markdown.js
Ce script génère la structure d'un dossier et l'enregistre dans un fichier \`content.md\` dans le dossier spécifié. Il vérifie si le dossier existe et est valide avant de générer le fichier.

## Contributing
Les contributions sont les bienvenues. Pour proposer une amélioration ou corriger un bug, n'hésitez pas à ouvrir une issue ou à soumettre une pull request.

## License
Ce projet est sous licence MIT. Vous êtes libre de l'utiliser, le modifier et le distribuer sous les conditions de cette licence.

---

N'hésitez pas à partager vos commentaires ou vos suggestions pour améliorer ce projet !
