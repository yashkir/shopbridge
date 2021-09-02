import { useState } from 'react';


export function ItemRow(props) {
  const { item, doDeleteItem, doUpdateItem } = props;
  const [activeAction, setActiveAction] = useState(null);
  const [formData, setFormData] = useState({
    name: item.name,
    price: item.price,
  });

  const DELETE = 'DELETE';
  const EDIT = 'EDIT';

  let actions;

  switch (activeAction) {
    case DELETE:
      actions =
        <>
          Delete this item?
          <button onClick={() => {
            doDeleteItem(item.id);
            setActiveAction(null);
          }}
          >
            DELETE
          </button>
          <button onClick={() => setActiveAction(null)}>cancel</button>
        </>;
      break;
    case EDIT:
      actions =
        <>
          Save changes?
          <button onClick={() => {
            doUpdateItem(item.id, formData);
            setActiveAction(null);
          }}
          >
            Save
          </button>
          <button onClick={() => setActiveAction(null)}>cancel</button>
        </>;
      break;
    default:
      actions =
        <div>
          <button onClick={() => setActiveAction(DELETE)}>Delete</button>
          <button onClick={() => setActiveAction(EDIT)}>Edit</button>
        </div>;
  }

  if (activeAction === EDIT) {
    return (
      <tr>
        <td>
          <input
            type="text"
            placeholder="name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required />
        </td>
        <td>
          <input
            type="number"
            placeholder="item price"
            value={formData.price}
            onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            required />
        </td>
        <td>
          {actions}
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>
        {item.name}
      </td>
      <td>
        {item.price}
      </td>
      <td>
        {actions}
      </td>
    </tr>
  );


}
