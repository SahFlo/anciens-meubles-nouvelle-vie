// Ce fichier définit la structure des données pour les utilisateurs

// On importe les outils dont on a besoin
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // Notre connexion à la base de données

// On définit le modèle User (comme un plan d'architecte)
const User = sequelize.define('User', {
  // Chaque propriété correspond à une colonne dans la table "users"
  
  // L'email de l'utilisateur
  email: {
    type: DataTypes.STRING,        // C'est un texte
    allowNull: false,              // Il est obligatoire
    unique: true,                  // Il doit être unique
    validate: {
      isEmail: true                // Il doit être un email valide
    }
  },
  
  // Le mot de passe
  password: {
    type: DataTypes.STRING,
    allowNull: false               // Il est obligatoire
  },
  
  // Le rôle (admin ou simple utilisateur)
  role: {
    type: DataTypes.ENUM('admin', 'user'),  // Seulement ces deux valeurs possibles
    defaultValue: 'user'                    // Par défaut, c'est un utilisateur
  },
  
  // Les préférences (types de meubles recherchés)
  preferences: {
    type: DataTypes.TEXT,          // Pour stocker du texte plus long
    allowNull: true                // C'est optionnel
  }
}, {
  // Options supplémentaires
  tableName: 'users',              // Le nom de la table dans MySQL
  timestamps: true,                // Ajoute created_at et updated_at
  createdAt: 'created_at',         // Renomme pour correspondre à notre table
  updatedAt: 'updated_at'          // Idem
});

// On rend ce modèle disponible pour les autres fichiers
module.exports = User;