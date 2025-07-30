import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import FestivalsPage from '../FestivalsPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Festivals/Festivals', () => () => <div data-testid="festivals" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('Festivals Page', () => {
    test('renders all FestivalsPage components', () => {
        render(<FestivalsPage />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('festivals')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in the correct order', () => {
        const { container } = render(<FestivalsPage />);
        const renderedComponents = container.querySelectorAll('div[data-testid]');
        
        expect(renderedComponents[0]).toHaveAttribute('data-testid', 'border');
        expect(renderedComponents[1]).toHaveAttribute('data-testid', 'navbar');
        expect(renderedComponents[2]).toHaveAttribute('data-testid', 'festivals');
        expect(renderedComponents[3]).toHaveAttribute('data-testid', 'igembed');
        expect(renderedComponents[4]).toHaveAttribute('data-testid', 'footer');
    });

    test('renders without errors', () => {
        expect(() => render(<FestivalsPage />)).not.toThrow();
    });
});