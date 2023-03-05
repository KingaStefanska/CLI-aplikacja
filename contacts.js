const fs = require("fs").promises;
const path = require("node:path");

const contactsPath = path.resolve("./db/contacts.json");

const fetchContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const pushContacts = async (contacts) => {
  const stringifyContacts = JSON.stringify(contacts);
  await fs.writeFile(contactsPath, stringifyContacts);
};

const listContacts = async () => {
  const contacts = await fetchContacts();
  console.table(contacts);
  return;
};

const getContactById = async (contactId) => {
  const contacts = await fetchContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  console.log(contact);
  return;
};

const removeContact = async (contactId) => {
  const contacts = await fetchContacts();
  const contact = await getContactById(contactId);
  const newContacts = contacts.find((contact) => contact.id !== contactId);
  const stringifyNewContacts = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, stringifyNewContacts);
  return contact;
};

const addContact = async (name, email, phone) => {
  const contacts = await fetchContacts();
  const newContact = { id: `${contacts.length + 1}`, name, email, phone };
  const newContacts = [...contacts, newContact];
  const stringifyNewContacts = JSON.stringify(newContacts);
  await fs.writeFile(contactsPath, stringifyNewContacts);
  return;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
