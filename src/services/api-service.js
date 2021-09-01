/*
 * This is a mock CRUD api, to be replaced by real calls
 *
 * We declare a schema to be used for validation and some
 * dummy data.
 *
 */

// This is to avoid entangling the mock objects with the React state
function deepCopy(object) {
  return JSON.parse(JSON.stringify(object));
}

const itemSchema = {
  type: "object",
  required: ["name", "price", "quantity"],
  properties: {
    name: {type: "string"},
    price: {type: "number"},
    quantity: {type: "integer"},
  }
}

const mockItems = [
  { id: 1, name: "pen", price: 33.25, quantity: 50 },
  { id: 2, name: "pencil", price: 5.00, quantity: 200 },
  { id: 3, name: "ream of paper", price: 25.00, quantity: 20 },
]

let nextId = 4;

async function createItem(data) {
  const newItem = {...data, id: nextId}
  nextId++;

  mockItems.push(newItem);

  return deepCopy(newItem);
}

async function retrieveItems() {
  return deepCopy(mockItems);
}

async function updateItem(itemId, data) {
  let targetItem = mockItems.find((item) => item.id === itemId); 

  if (!targetItem) {
    console.error(`Item of id (${itemId}) not found.`);
    return false;
  }

  targetItem = {...targetItem, ...data};

  return deepCopy(targetItem);
}

async function deleteItem(itemId) {
  mockItems.splice(mockItems.indexOf(item => item.id === itemId), 1);

  return true;
}

export {
  createItem,
  retrieveItems,
  updateItem,
  deleteItem,
}
