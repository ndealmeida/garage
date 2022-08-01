import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const garage = screen.getByText(/garage/i);
  expect(garage).toBeInTheDocument();
});
