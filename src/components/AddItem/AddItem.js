import { useState, useEffect } from 'react';
import { validateName, validatePrice, validateQuantity } from '../../utils/validators';


export function AddItem({ doCreateItem }) {
  const [formData, setFormData] = useState({
    name: "",
    price: "",
  });

  const [formError, setFormError] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);
  const [priceInvalid, setPriceInvalid] = useState(false);
  const [quantityInvalid, setQuantityInvalid] = useState(false);

  // Validate
  useEffect(() => {
    const nameError = validateName(formData.name);
    const priceError = validatePrice(formData.price);
    const quantityError = validateQuantity(formData.quantity);

    nameError ? setNameInvalid(true) : setNameInvalid(false);
    priceError ? setPriceInvalid(true) : setPriceInvalid(false);
    quantityError ? setQuantityInvalid(true) : setQuantityInvalid(false);
  }, [formData]);

  function handleSubmit(e) {
    e.preventDefault();

    const nameError = validateName(formData.name);
    const priceError = validatePrice(formData.price);
    const quantityError = validateQuantity(formData.quantity);

    if (nameError || priceError || quantityError) {
      setFormError(nameError || priceError || quantityError);
      return;
    }

    setFormError('');
    doCreateItem(formData);
  }

  return (
    <tr>
      <td>
        <input
          className={nameInvalid ? "invalid-input" : null}
          type="text"
          placeholder="name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
      </td>
      <td>
        <input style={{width: "90%"}}
          className={priceInvalid ? "invalid-input" : null}
          type="number"
          placeholder="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
        />
      </td>
      <td>
        <input style={{width: "90%"}}
          className={quantityInvalid ? "invalid-input" : null}
          type="number"
          placeholder="quantity"
          value={formData.quantity}
          onChange={(e) => setFormData({ ...formData, quantity: e.target.value })}
          required
        />
      </td>
      <td>
        <button onClick={handleSubmit}>Add Item</button>
        <em><small> {formError}</small></em>
      </td>
    </tr>
  );
}
