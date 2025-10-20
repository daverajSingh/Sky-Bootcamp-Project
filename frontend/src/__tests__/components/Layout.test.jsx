import React from 'react';
import { render, screen } from '@testing-library/react';
import Layout from '../../components/Layout';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { Outlet } from 'react-router';

jest.mock('../../components/Header', () => jest.fn(() => <div>Header</div>));
jest.mock('../../components/Footer', () => jest.fn(() => <div>Footer</div>));
jest.mock('react-router', () => ({
  Outlet: jest.fn(() => <div>Mocked Outlet</div>),
}));

describe('Layout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders Header, Footer, and Outlet', () => {
    render(<Layout />);

    expect(screen.getByText('Header')).toBeInTheDocument();
    expect(screen.getByText('Mocked Outlet')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();

    expect(Header).toHaveBeenCalledTimes(1);
    expect(Footer).toHaveBeenCalledTimes(1);
    expect(Outlet).toHaveBeenCalledTimes(1);
  });

});
