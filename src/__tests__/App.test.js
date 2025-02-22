import { render, screen } from '@testing-library/react';
import App from '../App';

// test('renders Directory text', () => {
//   render(<App />);
//   const copyPathElements = screen.getAllByTitle(/Copy path/i);
//   expect(copyPathElements.length).toBeGreaterThan(0);
// });

// test('renders Root directory', () => {
//   render(<App />);
//   const rootDirectory = screen.getAllByText(/Root/i);
//   expect(rootDirectory.length).toBeGreaterThan(0);
// });

test('renders File-1 file', () => {
  render(<App />);
  const file1 = screen.getByText(/File-1/i);
  expect(file1).toBeInTheDocument();
});

test('renders Root-1 directory', () => {
  render(<App />);
  const root1Directory = screen.getByText(/Root-1/i);
  expect(root1Directory).toBeInTheDocument();
});