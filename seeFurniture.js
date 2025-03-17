const sequelize = require('./config/db');
const Furniture = require('./models/Furniture');

async function testFurnitureInsert() {
  let connection;
  try {
    connection = await sequelize.authenticate();
    console.log('✅ Connexion à la base de données réussie');
    
    // Synchronisation du modèle avec la base de données (optionnel)
    // Cela vérifie que la structure de la table correspond au modèle
    await Furniture.sync({ alter: false });
    console.log('✅ Modèle synchronisé avec la base de données');
    
    // Test d'insertion d'un seul meuble avec logging détaillé
    console.log('Tentative d\'insertion d\'un meuble...');
    
    const newFurniture = await Furniture.create({
      type: 'Chaise de test',
      price: 99.99,
      dimensions: '50x50x100',
      colors: 'Green',
      materials: 'Wood',
      description: 'Chaise de test pour debug',
      status: 'for_sale',
      user_id: 1
    }, {
      logging: console.log // Affiche la requête SQL générée
    });
    
    console.log('✅ Meuble créé avec ID:', newFurniture.id);
    console.log('Détails:', JSON.stringify(newFurniture.toJSON(), null, 2));
    
    // Vérifions si le meuble existe dans la base de données
    const check = await Furniture.findByPk(newFurniture.id);
    console.log('✅ Vérification de l\'existence:', check ? 'Trouvé' : 'Non trouvé');
    
  } catch (error) {
    console.error('❌ Erreur lors de l\'insertion:', error);
    console.error('Message d\'erreur:', error.message);
    console.error('Type d\'erreur:', error.name);
    if (error.parent) {
      console.error('Erreur SQL:', error.parent.message);
      console.error('Code SQL:', error.parent.code);
    }
    if (error.errors) {
      error.errors.forEach(err => {
        console.error('- Erreur de validation:', err.message);
        console.error('  Sur le champ:', err.path);
        console.error('  Type d\'erreur:', err.type);
      });
    }
  } finally {
    if (connection) {
      await sequelize.close();
      console.log('Connexion à la base de données fermée');
    }
  }
}

// Exécution du test
console.log('Démarrage du test d\'insertion...');
testFurnitureInsert().then(() => {
  console.log('Test terminé');
}).catch(err => {
  console.error('Erreur globale:', err);
});