# Le Carnet — installation sur Android

Cette app est une PWA (Progressive Web App) : une fois **hébergée en ligne** une
seule fois, elle devient installable sur l'écran d'accueil et fonctionne ensuite
**sans connexion internet**. Un simple fichier ouvert depuis le stockage du
téléphone (file://) ne peut pas être installé ni mis en cache par un service
worker — c'est une règle de sécurité des navigateurs, pas une limite de l'app.

## Étapes (avec GitHub Pages, gratuit — comme tes autres projets)

1. Crée un dépôt GitHub (ex: `carnet-financier`).
2. Mets-y les 3 fichiers + le dossier `icons/` de ce package :
   - `index.html`
   - `manifest.json`
   - `service-worker.js`
   - `icons/` (icon-192.png, icon-512.png, icon-512-maskable.png, apple-touch-icon.png)
3. Dans les paramètres du dépôt → **Pages** → source : branche `main`, dossier `/root`.
4. Attends 1–2 minutes, ton lien sera du type :
   `https://ton-pseudo.github.io/carnet-financier/`

## Installer sur ton téléphone Android

1. Ouvre ce lien dans **Chrome** sur ton téléphone.
2. Laisse la page charger complètement une fois (pour que le cache hors-ligne
   se remplisse : polices, graphiques, générateur de PDF).
3. Menu ⋮ → **"Installer l'application"** (ou une bannière apparaît automatiquement).
4. L'icône "Le Carnet" apparaît sur ton écran d'accueil, comme une vraie app.
5. À partir de là, tu peux couper les données mobiles/le wifi : tout continue
   de fonctionner, y compris l'export PDF.

## Où sont mes données ?

Tout est stocké **localement dans le navigateur de ton téléphone**
(`localStorage`), rien n'est envoyé sur un serveur. C'est privé, mais ça veut
aussi dire :
- Si tu changes de téléphone, utilise le bouton **"💾 Sauvegarder mes
  données"** dans l'app pour exporter un fichier `.json`, puis
  **"📂 Restaurer"** sur le nouvel appareil pour tout récupérer.
- Si tu vides le cache/données du navigateur, fais une sauvegarde avant.

## Alternatives à GitHub Pages

Netlify Drop (netlify.com/drop) ou Firebase Hosting fonctionnent aussi très
bien et sont tout aussi gratuits — glisse simplement le dossier.
