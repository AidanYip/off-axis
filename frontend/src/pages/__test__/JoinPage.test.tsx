import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import JoinPage from '../JoinPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Join/JoinForm', () => () => <div data-testid="joinform" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('Join Page', () => {
    test('renders all JoinPage components', () => {
        render(<JoinPage />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('joinform')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in correct order', () => {
        const { container } = render(<JoinPage />);
        const renderedComponents = container.querySelectorAll('div[data-testid]');
        
        expect(renderedComponents[0]).toHaveAttribute('data-testid', 'border');
        expect(renderedComponents[1]).toHaveAttribute('data-testid', 'navbar');
        expect(renderedComponents[2]).toHaveAttribute('data-testid', 'joinform');
        expect(renderedComponents[3]).toHaveAttribute('data-testid', 'igembed');
        expect(renderedComponents[4]).toHaveAttribute('data-testid', 'footer');
    });
});