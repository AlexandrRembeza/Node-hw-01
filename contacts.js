const fs = require('fs').promises;
const path = require('path');
require('colors');

const contactsPath = path.resolve('./db/contacts.json');

async function listContacts() {
  return JSON.parse(await fs.readFile(contactsPath, 'utf8'));
}

async function getContactById(contactId) {
  return JSON.parse(await fs.readFile(contactsPath, 'utf8')).find(({ id }) => id === contactId);
}

async function removeContact(contactId) {
  const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8')).filter(
    ({ id }) => id !== contactId
  );
  await fs.writeFile(contactsPath, JSON.stringify(contacts));
}

async function addContact(name, email, phone) {
  if (name && email && phone) {
    const contacts = JSON.parse(await fs.readFile(contactsPath, 'utf8'));
    contacts.push({ id: `${Number(contacts[contacts.length - 1].id) + 1}`, name, email, phone });
    await fs.writeFile(contactsPath, JSON.stringify(contacts));
    return;
  }
  return console.log("Don't have all data".red);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
