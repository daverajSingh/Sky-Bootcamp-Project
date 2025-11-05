import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Simulator from '../../pages/Simulator';
import { useNavigate } from 'react-router';
import '@testing-library/jest-dom';

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useNavigate: jest.fn(),
}));

describe('Simulator Component', () => {
  it('navigates to correct path when an event is clicked', async () => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<Simulator />);

    const eventTitle = await screen.findByText('Agile Methodology Deep Dive');

    fireEvent.click(eventTitle);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/simulator/2');
    });
  });

  it('renders custom home button and triggers navigation to home page on click', async() => {
    const mockNavigate = jest.fn();
    useNavigate.mockReturnValue(mockNavigate);

    render(<Simulator />);

    const homeButton = screen.getByRole('button', { name: /Home/i });
    expect(homeButton).toBeInTheDocument();

    fireEvent.click(homeButton);

    await waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith('/');
    });
  });
});