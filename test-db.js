const { Sequelize } = require('sequelize');
const sequelize = require('./config/db');
const User = require('./models/User');

async function testInsert() {
    try {
        await sequelize.authenticate(); // Vérifie la connexion
        console.log('Connexion à la base de données réussie.');

        // Insérer un utilisateur
        const newUser = await User.create({
            email: 'testbug2@example.com',
            password: 'hashedpassword'
        });

        console.log('Utilisateur créé :', newUser.toJSON());
    } catch (error) {
        console.error('Erreur lors de l\'insertion :', error);
    } finally {
        await sequelize.close(); // Ferme la connexion après le test
    }
}

testInsert();
