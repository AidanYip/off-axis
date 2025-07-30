import { render, screen } from '@testing-library/react';
import LoginPage from '../LoginPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Login/LoginForm', () => () => <div data-testid="loginform" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('Login Page', () => {
    test('renders all login page sections', () => {
        render(<LoginPage />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('loginform')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('each component appears only once', () => {
        render(<LoginPage />);
        
        expect(screen.getAllByTestId('border')).toHaveLength(1);
        expect(screen.getAllByTestId('navbar')).toHaveLength(1);
        expect(screen.getAllByTestId('loginform')).toHaveLength(1);
        expect(screen.getAllByTestId('igembed')).toHaveLength(1);
        expect(screen.getAllByTestId('footer')).toHaveLength(1);
    });
});