# README - Back Office

## Fonctionnalités du Back Office

Pour le projet "Anciens meubles pour une nouvelle vie", le back office comprend :

- **Page de connexion**
- **Gestion des produits** (liste, modification, suppression)
- **Système de validation des meubles proposés par les utilisateurs**
- **Gestion des comptes utilisateurs** (conformité RGPD)

## Mise en place des fonctionnalités

### 1. Authentification pour Lauréline (la propriétaire)

- **Login/mot de passe sécurisé**
- **Sessions ou JWT (JSON Web Tokens)** pour maintenir l'état de connexion

### 2. Gestion des produits

- **API CRUD** pour les meubles (Create, Read, Update, Delete)
- **Système de stockage pour les images** (peut-être avec Multer pour gérer les uploads)
- **Possibilité d'ajouter un statut aux meubles** (en vente, vendu, proposé par un utilisateur, etc.)

### 3. Espace utilisateur

- **Inscription/Connexion des utilisateurs**
- **Possibilité de proposer des meubles à vendre**
- **Gestion des préférences** (types de meubles recherchés)
- **Système de suppression de compte** (RGPD)

### 4. Interface administrateur

- **Tableau de bord** pour voir les produits proposés par les utilisateurs
- **Système de validation avant publication**

## Technologies utilisées

### Back-end

- **Node.js et Express.js** pour créer l'API
- **MySQL** pour la base de données (gérée via phpMyAdmin)
- **Sequelize** comme ORM pour faciliter les interactions avec MySQL depuis Node.js

### Structure du projet

- **Express Generator** pour mettre en place la structure initiale (optionnel)
- **Middleware `express.json()`** pour traiter les données JSON
- **dotenv** pour gérer les variables d'environnement

### Authentification

- **bcrypt** pour hacher les mots de passe
- **jsonwebtoken** pour gérer les JWT (JSON Web Tokens)
- **express-session** si vous préférez utiliser les sessions

### Gestion des fichiers

- **multer** pour gérer l'upload des images de meubles