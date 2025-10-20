import React from 'react';
import { render, screen, cleanup, waitFor } from '@testing-library/react';
import FAQ from '../../components/FAQ';

describe('FAQ', () => {

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('renders FAQ questions and answers from mock data', async () => {
    // Mock fetch response
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([
          { question: 'What is X?', answer: 'X is ...' },
          { question: 'How does Y work?', answer: 'Y works by ...' }
        ]),
      })
    );
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    // Wait for the data to be rendered
    await waitFor(() => {
      expect(screen.getByText('What is X?')).toBeInTheDocument();
      expect(screen.getByText('How does Y work?')).toBeInTheDocument();
    });
  });

  it('shows error message if faqData is not an array', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve({ question: 'Wrong shape' }), // Not an array
      })
    );

    render(<FAQ />);

    await waitFor(() => {
      expect(screen.getByText(/Sorry, FAQ data could not be loaded/i)).toBeInTheDocument();
    });
  });

  it('renders nothing but heading if faqData is empty array', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        json: () => Promise.resolve([]), // Empty array
      })
    );

    render(<FAQ />);

    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();

    await waitFor(() => {
      // Expect no FAQ items
      const faqItems = screen.queryByRole('listitem');
      expect(faqItems).not.toBeInTheDocument();
    });
  });
});
