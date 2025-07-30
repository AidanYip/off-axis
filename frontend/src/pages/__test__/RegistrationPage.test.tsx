import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RegistrationPage from '../RegistrationPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Registration/RegistrationForm', () => () => <div data-testid="registrationform" />);
jest.mock('../../components/IGEmbed', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer', () => () => <div data-testid="footer" />);

describe('Registration Page', () => {
    test('renders all RegistrationPage components', () => {
        render(<RegistrationPage />);
        
        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('registrationform')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });

    test('renders components in the correct order', () => {
        const { container } = render(<RegistrationPage />);
        const renderedComponents = container.querySelectorAll('div[data-testid]');
        
        expect(renderedComponents[0]).toHaveAttribute('data-testid', 'border');
        expect(renderedComponents[1]).toHaveAttribute('data-testid', 'navbar');
        expect(renderedComponents[2]).toHaveAttribute('data-testid', 'registrationform');
        expect(renderedComponents[3]).toHaveAttribute('data-testid', 'igembed');
        expect(renderedComponents[4]).toHaveAttribute('data-testid', 'footer');
    });
});