// Ce fichier définit la structure des données pour les meubles

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Furniture = sequelize.define('Furniture', {
  // Le type de meuble (chaise, table, etc.)
  type: {
    type: DataTypes.STRING,
    allowNull: false          // Obligatoire
  },
  
  // Le prix
  price: {
    type: DataTypes.DECIMAL(10, 2),  // Nombre avec 2 décimales
    allowNull: false                 // Obligatoire
  },
  
  // Les dimensions
  dimensions: {
    type: DataTypes.STRING,
    allowNull: true           // Optionnel
  },
  
  // Les couleurs
  colors: {
    type: DataTypes.STRING,
    allowNull: true           // Optionnel
  },
  
  // Les matériaux
  materials: {
    type: DataTypes.STRING,
    allowNull: true           // Optionnel
  },
  
  // Description détaillée
  description: {
    type: DataTypes.TEXT,
    allowNull: true           // Optionnel
  },
  
  // Statut du meuble
  status: {
    type: DataTypes.ENUM('draft', 'pending', 'for_sale', 'sold'),
    defaultValue: 'draft'     // Par défaut c'est un brouillon
  },
  
  // ID de l'utilisateur qui a proposé ce meuble
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: true           // Peut être null (administrateur)
  }
}, {
  tableName: 'furniture',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'updated_at'
});

module.exports = Furniture;