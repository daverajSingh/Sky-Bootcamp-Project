import React from 'react';
import { render, fireEvent, screen, cleanup } from '@testing-library/react';
import FAQItem from '../../components/FAQItem.jsx';


describe('FAQItem', () => {
    afterEach(cleanup)

    it('renders question and does not show answer initially', () => {
        render(<FAQItem question="Mock question" answer="Mock answer" />);
        expect(screen.getByText('Mock question')).toBeInTheDocument();
        expect(screen.queryByText('Mock answer')).not.toBeInTheDocument();
        expect(screen.getByTestId('faqExpand')).toBeInTheDocument();
    });

    it('shows answer when clicked', () => {
        render(<FAQItem question="Mock question" answer="Mock answer" />);
        fireEvent.click(screen.getByText('Mock question'));
        expect(screen.getByText('Mock answer')).toBeInTheDocument();
        expect(screen.getByTestId('faqCollapse')).toBeInTheDocument();
    });
});
