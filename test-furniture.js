const sequelize = require('./config/db');
const Furniture = require('./models/Furniture');

// Fonction pour insérer plusieurs meubles
async function seedFurniture() {
  try {
    // Connexion à la base de données
    await sequelize.authenticate();
    console.log('✅ Connexion réussie');

    // Liste de meubles à insérer
    const furnitures = [
      // Chaises
      { type: 'Chaise', price: 45.00, dimensions: '45x45x80', colors: 'Red', materials: 'Plastic', description: 'Chaise en plastique rouge', status: 'for_sale', user_id: 1 },
      { type: 'Chaise', price: 75.00, dimensions: '50x50x90', colors: 'Black', materials: 'Metal', description: 'Chaise en métal noir', status: 'for_sale', user_id: 2 },

      // Tables
      { type: 'Table', price: 120.00, dimensions: '150x80x75', colors: 'Brown', materials: 'Wood', description: 'Table en bois brun', status: 'for_sale', user_id: 3 },
      { type: 'Table', price: 200.00, dimensions: '200x100x75', colors: 'White', materials: 'Glass', description: 'Table en verre blanc', status: 'pending', user_id: 4 },

      // Tables basses
      { type: 'Table basse', price: 100.00, dimensions: '100x60x40', colors: 'Brown', materials: 'Wood', description: 'Table basse en bois brun', status: 'for_sale', user_id: 5 },
      { type: 'Table basse', price: 150.00, dimensions: '120x70x45', colors: 'Grey', materials: 'Glass', description: 'Table basse en verre gris', status: 'for_sale', user_id: 6 },

      // Canapés
      { type: 'Canapé', price: 500.00, dimensions: '200x100x80', colors: 'Grey', materials: 'Fabric', description: 'Canapé en tissu gris', status: 'for_sale', user_id: 7 },
      { type: 'Canapé', price: 600.00, dimensions: '220x120x90', colors: 'Blue', materials: 'Leather', description: 'Canapé en cuir bleu', status: 'for_sale', user_id: 8 },

      // Étagères murales
      { type: 'Étagère murale', price: 30.00, dimensions: '60x20x30', colors: 'White', materials: 'Wood', description: 'Étagère murale en bois blanc', status: 'for_sale', user_id: 9 },
      { type: 'Étagère murale', price: 40.00, dimensions: '70x25x35', colors: 'Black', materials: 'Metal', description: 'Étagère murale en métal noir', status: 'for_sale', user_id: 10 },

      // Meubles télé
      { type: 'Meuble télé', price: 250.00, dimensions: '160x40x50', colors: 'Black', materials: 'Wood', description: 'Meuble télé en bois noir', status: 'for_sale', user_id: 11 },
      { type: 'Meuble télé', price: 300.00, dimensions: '180x50x60', colors: 'White', materials: 'Metal', description: 'Meuble télé en métal blanc', status: 'pending', user_id: 12 }
    ];

    // Insertion des meubles dans la base de données
    const results = await Furniture.bulkCreate(furnitures);
    console.log('✅ Meubles insérés avec succès, IDs:', results.map(meuble => meuble.id));

  } catch (error) {
    console.error('❌ Erreur:', error.message);
  } finally {
    // Fermeture de la connexion
    await sequelize.close();
    console.log('Connexion fermée');
  }
}

// Exécution de la fonction pour alimenter la base de données
seedFurniture();

