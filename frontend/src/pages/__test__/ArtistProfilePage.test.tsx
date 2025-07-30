import { render, screen } from '@testing-library/react';
import ArtistProfilePage from '../ArtistProfilePage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Artists/ArtistProfile', () => () => <div data-testid="artistprofile" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('ArtistProfilePage', () => {
    test('renders all components', () => {
        render(<ArtistProfilePage />);
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('artistprofile')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
    
    test('renders components in the correct order', () => {
        const { container } = render(<ArtistProfilePage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const artistprofileIndex = html.indexOf('data-testid="artistprofile"');
        const igembedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');
        
        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(artistprofileIndex);
        expect(artistprofileIndex).toBeLessThan(igembedIndex);
        expect(igembedIndex).toBeLessThan(footerIndex);
    });
});