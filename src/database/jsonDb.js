const fs = require('fs/promises');
const path = require('path');

const dbPath = path.join(__dirname, 'db.json');

async function getDb() {
  const data = await fs.readFile(dbPath, 'utf-8');
  return JSON.parse(data);
}

async function saveDb(db) {
  await fs.writeFile(dbPath, JSON.stringify(db, null, 2), 'utf-8');
}

module.exports = {
  getDb,
  saveDb,
}; 