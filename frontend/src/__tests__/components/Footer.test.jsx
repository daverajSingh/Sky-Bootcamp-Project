import React from 'react';
import { render, screen } from '@testing-library/react';
import Footer from '../../components/Footer';

describe('Footer', () => {
  it('renders the footer container', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toBeInTheDocument();
  });

  it('displays the correct text', () => {
    render(<Footer />);
    expect(screen.getByText('© Sky Immersion')).toBeInTheDocument();
  });

  it('applies the expected CSS classes', () => {
    render(<Footer />);
    const footer = screen.getByTestId('footer');
    expect(footer).toHaveClass('flex');
    expect(footer).toHaveClass('justify-center');
    expect(footer).toHaveClass('items-center');
    expect(footer).toHaveClass('bg-white');
  });
});
