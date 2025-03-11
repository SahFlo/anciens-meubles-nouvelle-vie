// Ce fichier permet de connecter notre application à la base de données MySQL

// On importe Sequelize (notre "traducteur" entre JavaScript et MySQL)
const { Sequelize } = require('sequelize');

// On importe dotenv pour lire les variables d'environnement du fichier .env
require('dotenv').config();

// On crée une nouvelle connexion à la base de données
// C'est comme si on composait un numéro de téléphone pour appeler MySQL
const sequelize = new Sequelize(
  process.env.DB_NAME,       // Le nom de la base de données
  process.env.DB_USER,       // Le nom d'utilisateur
  process.env.DB_PASSWORD,   // Le mot de passe
  {
    host: process.env.DB_HOST,  // L'adresse du serveur
    dialect: 'mysql',           // Le type de base de données
    logging: console.log        // Pour voir ce qui se passe en coulisses
  }
);

// Cette fonction vérifie si la connexion fonctionne
async function testConnection() {
  try {
    // On essaie de se connecter
    await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie !');
  } catch (error) {
    // Si ça ne marche pas, on affiche l'erreur
    console.error('❌ Impossible de se connecter à la base de données:', error);
  }
}

// On teste la connexion dès le démarrage
testConnection();

// On rend cette connexion disponible pour les autres fichiers de notre projet
module.exports = sequelize;