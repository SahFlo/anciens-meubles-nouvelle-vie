// Ce fichier regroupe tous nos modèles et définit leurs relations

// On importe nos modèles
const User = require("./User");
const Furniture = require("./Furniture");
const FurnitureImage = require("./FurnitureImages");

// On importe aussi sequelize pour la synchronisation
const sequelize = require("../config/db");

// ===== RELATIONS ENTRE LES MODÈLES =====

// 1. Relation User - Furniture
// Un utilisateur peut avoir plusieurs meubles
User.hasMany(Furniture, {
  foreignKey: "user_id", // La clé qui fait le lien
  as: "furniture", // Nom pour y accéder facilement
});

// Un meuble appartient à un seul utilisateur
Furniture.belongsTo(User, {
  foreignKey: "user_id",
  as: "owner", // On peut y accéder avec furniture.owner
});

// 2. Relation Furniture - FurnitureImage
// Un meuble peut avoir plusieurs images
Furniture.hasMany(FurnitureImage, {
  foreignKey: "furniture_id",
  as: "images",
  onDelete: "CASCADE", // Si on supprime un meuble, on supprime ses images
});

// Une image appartient à un seul meuble
FurnitureImage.belongsTo(Furniture, {
  foreignKey: "furniture_id",
  as: "furniture",
});

// ===== SYNCHRONISATION AVEC LA BASE DE DONNÉES =====

// Cette fonction synchronise nos modèles avec la base de données
// Elle crée les tables si elles n'existent pas encore
async function syncModels() {
  try {
    // { alter: true } signifie qu'on met à jour la structure si nécessaire
    await sequelize.sync({ alter: true });
    console.log(
      "✅ Tous les modèles ont été synchronisés avec la base de données"
    );
  } catch (error) {
    console.error("❌ Erreur lors de la synchronisation des modèles:", error);
  }
}

// On lance la synchronisation
syncModels();

// On exporte tous nos modèles pour pouvoir les utiliser ailleurs
module.exports = {
  User,
  Furniture,
  FurnitureImage,
};
