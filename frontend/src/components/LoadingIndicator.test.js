import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import LoadingIndicator from './LoadingIndicator';

// Testataan LoadingIndicator-komponenttia
test('LoadingIndicator renders correctly', () => {
  render(<LoadingIndicator />);
  const loadingElement = screen.findAllByLabelText('loading-indicator');
    expect(loadingElement).toBeDefined();
});