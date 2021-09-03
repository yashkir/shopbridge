function validateName(name) {
  const error = name ? '' : 'Name required';
  console.log(error);
  return error;
}

function validatePrice(price) {
  const regexA = /^\d*\.?\d+/;
  const regexB = /^\d+\.?\d*/;
  const error = regexA.test(price) || regexB.test(price) ? '' : 'Price is not valid';
  return error;
}

function validateQuantity(price) {
  const regex = /^\d+/;
  const error = regex.test(price) ? '' : 'Quantity is not valid';
  return error;
}

export {
  validateName,
  validatePrice,
  validateQuantity,
}
