import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Home from '../Home';

jest.mock('../../components/Border.tsx', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar.tsx', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Homepage/NewGigs.tsx', () => () => <div data-testid="newgigs" />);
jest.mock('../../components/YTEmbed.tsx', () => (props: { link: string }) => (
    <div data-testid="ytembed">{props.link}</div>
));
jest.mock('../../components/Homepage/ArtistOfTheWeek.tsx', () => () => <div data-testid="artistoftheweek" />);
jest.mock('../../components/IGEmbed.tsx', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer.tsx', () => () => <div data-testid="footer" />);
jest.mock('../../components/Homepage/Showlist.tsx', () => () => <div data-testid="showlist" />);
jest.mock('../../components/GradientButton.tsx', () => (props: { text: string; link: string }) => (
    <button data-testid="gradientbutton">{props.text}</button>
));

describe('Home Page', () => {
    test('renders all home page sections', () => {
        render(<Home />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('newgigs')).toBeInTheDocument();
        expect(screen.getByTestId('ytembed')).toHaveTextContent(
            'https://www.youtube.com/embed/videoseries?si=r57KpiHZ_NY0l7xL&list=PLxglfvhvUgPXDP1KipCboDxnPL4Lr1bqE'
        );
        expect(screen.getByTestId('showlist')).toBeInTheDocument();
        expect(screen.getByTestId('gradientbutton')).toHaveTextContent('VIEW ALL GIGS');
        expect(screen.getByTestId('artistoftheweek')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders the mid_section container with YTEmbed and Showlist', () => {
        const { container } = render(<Home />);
        const midSection = container.querySelector('#mid_section');
        expect(midSection).toBeInTheDocument();
        expect(midSection?.querySelector('[data-testid="ytembed"]')).toBeInTheDocument();
        expect(midSection?.querySelector('[data-testid="showlist"]')).toBeInTheDocument();
    });

    test('renders the gig_button container with GradientButton', () => {
        const { container } = render(<Home />);
        const gigButton = container.querySelector('#gig_button');
        expect(gigButton).toBeInTheDocument();
        expect(gigButton?.querySelector('[data-testid="gradientbutton"]')).toHaveTextContent('VIEW ALL GIGS');
    });

    test('passes the correct youtube link to YTEmbed', () => {
        render(<Home />);
        const ytEmbed = screen.getByTestId('ytembed');
        expect(ytEmbed).toHaveTextContent(
            'https://www.youtube.com/embed/videoseries?si=r57KpiHZ_NY0l7xL&list=PLxglfvhvUgPXDP1KipCboDxnPL4Lr1bqE'
        );
    });
});