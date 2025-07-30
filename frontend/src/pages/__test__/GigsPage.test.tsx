import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import GigsPage from '../GigsPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Gigs/Gigs', () => () => <div data-testid="gigs" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('Gigs Page', () => {
    test('renders all GigsPage components', () => {
        render(<GigsPage />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('gigs')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in the correct order', () => {
        const { container } = render(<GigsPage />);
        const renderedComponents = container.querySelectorAll('div[data-testid]');
        
        expect(renderedComponents[0]).toHaveAttribute('data-testid', 'border');
        expect(renderedComponents[1]).toHaveAttribute('data-testid', 'navbar');
        expect(renderedComponents[2]).toHaveAttribute('data-testid', 'gigs');
        expect(renderedComponents[3]).toHaveAttribute('data-testid', 'igembed');
        expect(renderedComponents[4]).toHaveAttribute('data-testid', 'footer');
    });
});