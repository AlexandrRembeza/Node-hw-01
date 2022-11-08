const fs = require('fs');
const path = require('path');
require('colors');

const contactsPath = path.resolve('./db/contacts.json');

function listContacts() {
  return JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
}

function getContactById(contactId) {
  return JSON.parse(fs.readFileSync(contactsPath, 'utf8')).find(({ id }) => id === contactId);
}

function removeContact(contactId) {
  const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8')).filter(
    ({ id }) => id !== contactId
  );
  fs.writeFileSync(contactsPath, JSON.stringify(contacts));
}

function addContact(name, email, phone) {
  if (name && email && phone) {
    const contacts = JSON.parse(fs.readFileSync(contactsPath, 'utf8'));
    contacts.push({ id: `${Number(contacts[contacts.length - 1].id) + 1}`, name, email, phone });
    fs.writeFileSync(contactsPath, JSON.stringify(contacts));
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
