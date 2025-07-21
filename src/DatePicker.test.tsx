import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DatePicker from './DatePicker';

test('DatePicker renders without crashing', () => {
  render(<DatePicker />);
  // expect(screen.getByText(/date/i)).toBeInTheDocument();
});
