import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Navbar from '@/components/layout/Navbar';

describe('Navbar', () => {
  it('renders brand and links', () => {
    render(<Navbar />);
    expect(screen.getByLabelText('TGF Home')).toBeInTheDocument();
    expect(screen.getByText('Projects')).toBeInTheDocument();
  });
});

