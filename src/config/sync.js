const sequelize = require('./database');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('✅ Connexion PostgreSQL réussie !');
    process.exit(0);
  } catch (err) {
    console.error('❌ Erreur de connexion :', err.message);
    process.exit(1);
  }
}

testConnection();