import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('renders Inventory Management heading', async () => {
  render(<App />);

  await waitFor(() => {
    const headingElement = screen.getByText(/Inventory Management/i);
    expect(headingElement).toBeInTheDocument();
  });
});
