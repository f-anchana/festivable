- Lien vers l'API : https://festivable-2.onrender.com/
- Lien vers le front : https://festivable.fr/
- Lien vers le dashboard et admin : https://dashboard.festivable.fr/
- Lien vers le dépôt Github : https://github.com/f-anchana/festivable

# Hébergement du projet Festivable
Portabilité du site web pour APF France handicap
Ce projet est composé de quatres parties distinctes :
- Front (site public) — Framework : Next.js
- Dashboard (back-office) — Framework : Next.js
- API — Framework : Node.js + Express
- Base de données — MongoDB

## Front et Dashboard (Next.js) sur Vercel
Déployés temporairement sur Vercel pour tester le build.

1. Mettre les dossiers front et dashboard sur GitHub (deux repos distincts recommandés).
2. Aller sur Vercel, créer un compte ou se connecter.
3. Lier son compte GitHub à Vercel.
4. Créer un nouveau projet sur Vercel → choisir le repo correspondant → sélectionner Next.js comme framework.
5. Lancer le déploiement.

Important : Le Front et le Dashboard doivent être hébergés séparément (deux projets différents sur Vercel).

## Mise en production sur o2switch
1. Récupérer le build du projet (npm run build).
2. Zipper le contenu du dossier .next.
3. Uploader ce zip via le cPanel d’o2switch (rubrique Gestionnaire de fichiers).
4. Décompresser à la racine du dossier public (public_html).
5. S’assurer que les chemins sont corrects (basePath, images statiques, etc.).

# API (Node + Express)
Déploiement temporaire sur Render

1. Mettre l’API sur GitHub.
2. Se connecter à Render et lier son compte GitHub.
3. Créer un nouveau service Web → importer le repo de l’API.
4. Configurer les variables d’environnement (.env) dans Render (onglet Environment).
5. Render génère une URL publique pour accéder à l’API.


## Mise en production sur o2switch
1. Créer un sous-domaine ou domaine
- Aller dans cPanel > Sous-domaines.
- Créer un sous-domaine (ex. api-festivable.domaine.com) et noter le dossier racine associé (ex. /public_html/api-festivable).

2. Uploader le projet
- Aller dans le File Manager de cPanel.
- Se rendre dans le dossier racine du sous-domaine (/public_html/api).
- Uploader et extraire le projet (via un .zip ou FTP).
- Supprimer le dossier node_modules s’il est présent : o2switch génère ses propres modules dans un environnement isolé.

3. Configurer l'application Node.js App
- Aller dans cPanel > Setup Node.js App.
- Cliquer sur "Create Application" :
- Version : Node.js 18+
- Mode : Production
- Application root : public_html/festivable-api
- Startup file : server.js
- Remplir les variables d’envirenment (selon le .env)
- Cliquer sur Create une fois les infos remplies.


4. Installer les dépendances
Cliquer sur "Run NPM Install" pour installer les dépendances

5. Redémarrer l'application
Cliquer sur "Restart" pour lancer ou relancer l’application.

# Exporter une base MongoDB
1. Depuis MongoDB Compass ou en ligne de commande taper:

mongodump --uri="mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<nomDB>" --out=./dump
(Vous pouvez retroutrouver le username, mot de passe, cluster et nomDB dans le .env)

Cela va créer un dossier dump/ avec ta base à l’intérieur.

2. Importer la base ailleurs avec la commande :

mongorestore --uri="mongodb+srv://<nouveauUser>:<nouveauMdp>@<nouveauCluster>.mongodb.net" ./dump/<nomDB>


# Conseils supplémentaires
- Sécuriser l'API (modifier le CORS)

### Pour lancer le projet en local

- API : node server.js
- front : npm run dev
- dashboard : npm run dev