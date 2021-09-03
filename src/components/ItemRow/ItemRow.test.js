import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ItemRow from './ItemRow';

test('renders a row', () => {
  const item = { id: 1, name: "pen", price: 33.25, quantity: 50 };
  render(
    <table>
      <tbody>
        <ItemRow
          item={item}
        />
      </tbody>
    </table>
  );

  expect(screen.getByTestId("name-cell")).toHaveTextContent("pen");

  const deleteButton = screen.getByTestId("delete-button");
  expect(deleteButton).toHaveTextContent("Delete");

  userEvent.click(deleteButton);
  expect(screen.getByText("cancel")).toBeInTheDocument();
});

