// Ce fichier définit la structure des données pour les images de meubles

const { DataTypes } = require("sequelize");
const sequelize = require("../config/db");

const FurnitureImage = sequelize.define(
  "FurnitureImage",
  {
    // Le chemin vers l'image
    image_path: {
      type: DataTypes.STRING,
      allowNull: false, // Obligatoire
    },

    // Si c'est l'image principale du meuble
    is_main: {
      type: DataTypes.BOOLEAN,
      defaultValue: false, // Par défaut, ce n'est pas l'image principale
    },

    // ID du meuble auquel cette image est associée
    furniture_id: {
      type: DataTypes.INTEGER,
      allowNull: false, // Obligatoire
    },
  },
  {
    tableName: "furniture_images",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
  }
);

module.exports = FurnitureImage;
