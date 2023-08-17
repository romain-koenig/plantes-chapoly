# Projet : Les plantes du jardin du Chapoly

[![Netlify Status](https://api.netlify.com/api/v1/badges/c2158e47-60c8-4506-a4fc-06ce1ee38c05/deploy-status)](https://app.netlify.com/sites/jardin/deploys)

Ce projet est un site interactif qui utilise Eleventy (11ty) comme générateur de site statique, Airtable comme base de données pour stocker les informations sur les plantes, et Netlify pour le déploiement et l'hébergement.

## Caractéristiques principales :

- Liste des plantes organisée par ordre alphabétique.
- Présentation des plantes par mois.
- Option pour ajouter une nouvelle plante ou une nouvelle photo.

## Technologies utilisées :

- **Eleventy (11ty)** : Générateur de site statique pour transformer des templates et des données en pages web.
- **Airtable** : Base de données en ligne qui permet de stocker, organiser et manipuler les données sur les plantes.
- **Netlify** : Plateforme d'hébergement qui permet de déployer des sites web et d'automatiser des tâches comme la construction et le déploiement.

## Mise en route :

1. **Clonez le dépôt** :

    ```bash
    git clone https://github.com/romain-koenig/plantes-chapoly
    cd plantes-chapoly
    ```

2. **Installez les dépendances** :

    ```bash
    npm install
    ```

3. **Définissez vos variables d'environnement**. 
   Assurez-vous de définir vos clés d'API Airtable et autres informations sensibles dans un fichier `.env`.
	```
	AIRTABLE_API_KEY=À_RENSEIGNER
	AIRTABLE_BASE_ID=À_RENSEIGNER
	AIRTABLE_PLANTES_TABLE_ID=À_RENSEIGNER
	AIRTABLE_PHOTOS_TABLE_ID=À_RENSEIGNER
	```


4. **Démarrez le serveur de développement** :

    ```bash
    npm run dev
    ```

   Ceci démarrera un serveur de développement local sur `http://localhost:8080`.

5. **Construire pour la production** :

    ```bash
    npm run build
    ```

## Déploiement sur Netlify :

1. Connectez-vous à votre compte Netlify.
2. Cliquez sur "New site from Git" et choisissez votre dépôt.
3. Définissez les variables d'environnement dans les paramètres du site.
4. Déployez votre site !

## Contribuer :

Les contributions sont les bienvenues ! Veuillez ouvrir un problème ou une pull request pour toute contribution.

## Licence :

MIT

