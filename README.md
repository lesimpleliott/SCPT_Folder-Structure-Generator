# Folder Structure Generator - V2

## 📦 Description

Un utilitaire Node.js simple et modulaire pour générer l'arborescence d'un dossier, avec plusieurs modes d'export :

- copie dans le presse-papiers
- export dans un fichier `content.md`
- version complète ou allégée (light)

---

## 🚀 Modes disponibles

| Mode              | Commande                 | Résultat                                 |
| ----------------- | ------------------------ | ---------------------------------------- |
| 🟢 Standard       | `npm start`              | Arborescence complète → presse-papiers   |
| 🟢 Standard       | `npm run clipboard`      | Arborescence complète → presse-papiers   |
| 🟡 Light          | `npm run light`          | Arborescence simplifiée → presse-papiers |
| 🔵 Markdown       | `npm run markdown`       | Arborescence complète → content.md       |
| 🟣 Markdown Light | `npm run markdown-light` | Arborescence simplifiée → content.md     |

---

## 🛠️ Installation

```bash
npm install
```

---

## ▶️ Utilisation

Placez-vous dans le dossier du projet, puis :

```bash
npm start
```

ou l'un des modes suivants :

```bash
npm run light
npm run markdown
npm run markdown-light
```

Collez ou indiquez le chemin du dossier cible dans le terminal.

```bash
? Dossier à analyser : /Users/****/****/****
```

---

## 📂 Exemple de sortie

```
📁 dossier-exemple
├─ src
│  ├─ components
│  └─ pages
├─ public
└─ package.json
```

---

## 📦 Dépendances

- `clipboardy` → copie dans le presse-papiers
- `fs-extra` → gestion des fichiers
- `inquirer` → interface CLI interactive

---

## 📄 Licence

Projet libre d’utilisation, sans aucune dépendance externe obligatoire.
Développé par Eliott Lesimple.
