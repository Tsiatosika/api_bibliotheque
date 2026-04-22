const app      = require('./app');
const sequelize = require('./config/database');
require('./models'); 

const PORT = process.env.PORT || 8000;

async function start() {
  await sequelize.sync({ alter: true }); // crée/met à jour les tables
  console.log('✅ Tables synchronisées');
  app.listen(PORT, () => console.log(`🚀 Serveur lancé sur http://localhost:${PORT}`));
}

start().catch(console.error);