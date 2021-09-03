import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Inventory Management heading', () => {
  render(<App />);
  const headingElement = screen.getByText(/Inventory Management/i);
  expect(headingElement).toBeInTheDocument();
});
