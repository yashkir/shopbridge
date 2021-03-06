import { useEffect, useState } from 'react';
import { validateName, validatePrice, validateQuantity } from '../../utils/validators';
import styles from './ItemRow.module.css';


export default function ItemRow(props) {
  const { item, doDeleteItem, doUpdateItem } = props;
  const [activeAction, setActiveAction] = useState(null);
  const [formData, setFormData] = useState({
    name: item.name,
    price: item.price,
    quantity: item.quantity,
  });
  const [formError, setFormError] = useState('');
  const [nameInvalid, setNameInvalid] = useState(false);
  const [priceInvalid, setPriceInvalid] = useState(false);
  const [quantityInvalid, setQuantityInvalid] = useState(false);

  const DELETE = 'DELETE';
  const EDIT = 'EDIT';


  // Validate whenever form data changes
  useEffect(() => {
    const nameError = validateName(formData.name);
    const priceError = validatePrice(formData.price);
    const quantityError = validateQuantity(formData.quantity);

    nameError ? setNameInvalid(true) : setNameInvalid(false);
    priceError ? setPriceInvalid(true) : setPriceInvalid(false);
    quantityError ? setQuantityInvalid(true) : setQuantityInvalid(false);
  }, [formData]);

  function handleUpdate() {
    const nameError = validateName(formData.name);
    const priceError = validatePrice(formData.price);
    const quantityError = validateQuantity(formData.quantity);

    if (nameError || priceError || quantityError) {
      setFormError(nameError || priceError || quantityError);
      return;
    }

    setFormError('');
    doUpdateItem(item.id, formData);
    setActiveAction(null);
  }

  // Set up the 'actions' cell depending on current action state
  let actions;
  switch (activeAction) {
    case DELETE:
      actions =
        <>
          <button style={{backgroundColor: "red" }}
            onClick={() => { doDeleteItem(item.id); setActiveAction(null); }}
          >
            Confirm DELETE
          </button>
          <button onClick={() => setActiveAction(null)}>cancel</button>
        </>;
      break;
    case EDIT:
      actions =
        <>
          <button onClick={() => { handleUpdate(item.id, formData); }} >
            Save Data
          </button>
          <button onClick={() => setActiveAction(null)}>Cancel</button>
        </>;
      break;
    default:
      actions =
        <div>
          <button data-testid="delete-button" onClick={() => setActiveAction(DELETE)}>Delete</button>
          <button onClick={() => setActiveAction(EDIT)}>Edit</button>
        </div>;
  }


  // If we are in edit mode, present a form
  if (activeAction === EDIT) {
    return (
      <tr className={styles.itemRow}>
        <td>
          <input style={{width: "90%"}}
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
          {actions}
        </td>
      </tr>
    );
  }

  // If we are not in edit mode present the data
  return (
    <tr className={styles.itemRow}>
      <td data-testid="name-cell">
        {item.name}
      </td>
      <td>
        {item.price}
      </td>
      <td>
        {item.quantity}
      </td>
      <td>
        {actions}
      </td>
    </tr>
  );
}
