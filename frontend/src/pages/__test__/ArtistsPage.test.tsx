import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ArtistsPage from '../ArtistsPage';

jest.mock('../../components/Border.tsx', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar.tsx', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Artists/Artists.tsx', () => () => <div data-testid="artists" />);
jest.mock('../../components/IGEmbed.tsx', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer.tsx', () => () => <div data-testid="footer" />);

describe('Artists Page', () => {
    test('renders all ArtistsPage components', () => {
        render(<ArtistsPage />);

        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('artists')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in the correct order', () => {
        const { container } = render(<ArtistsPage />);
        const renderedComponents = container.querySelectorAll('div[data-testid]');
        expect(renderedComponents[0]).toHaveAttribute('data-testid', 'border');
        expect(renderedComponents[1]).toHaveAttribute('data-testid', 'navbar');
        expect(renderedComponents[2]).toHaveAttribute('data-testid', 'artists');
        expect(renderedComponents[3]).toHaveAttribute('data-testid', 'igembed');
        expect(renderedComponents[4]).toHaveAttribute('data-testid', 'footer');
    });
});