import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import FAQ from '../../../components/FAQ';

// Mock the faqData import
jest.mock('../../../data/faq.json', () => ([
  { question: 'What is X?', answer: 'X is ...' },
  { question: 'How does Y work?', answer: 'Y works by ...' }
]));

describe('FAQ', () => {
  afterEach(cleanup);

  it('renders FAQ questions and answers from mock data', () => {
    render(<FAQ />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    expect(screen.getByText('What is X?')).toBeInTheDocument();
    expect(screen.getByText('How does Y work?')).toBeInTheDocument();
  });

  it('shows error message if faqData is not an array', () => {
    jest.resetModules();
    jest.doMock('../../../data/faq.json', () => ({}));
    const FAQError = require('../../../components/faq').default;
    render(<FAQError />);
    expect(screen.getByText(/Sorry, FAQ data could not be loaded/i)).toBeInTheDocument();
    jest.dontMock('../../../data/faq.json');
  });

  it('renders nothing but heading if faqData is empty array', () => {
    jest.resetModules();
    jest.doMock('../../../data/faq.json', () => ([]));
    const FAQEmpty = require('../../../components/faq').default;
    render(<FAQEmpty />);
    expect(screen.getByText('Frequently Asked Questions')).toBeInTheDocument();
    jest.dontMock('../../../data/faq.json');
  });
});
