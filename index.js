const { getContactById, listContacts, removeContact, addContact } = require('./contacts');
const { Command } = require('commander');
const program = new Command();
require('colors');

program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case 'list':
      console.table(listContacts());
      break;

    case 'get':
      console.log(getContactById(id));
      break;

    case 'add':
      addContact(name, email, phone);
      console.table(listContacts());
      break;

    case 'remove':
      removeContact(id);
      console.table(listContacts());
      break;

    default:
      console.warn('\x1B[31m Unknown action type!'.red);
  }
}

invokeAction(argv);
