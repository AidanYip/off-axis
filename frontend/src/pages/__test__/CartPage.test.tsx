import { render, screen } from '@testing-library/react';
import CartPage from '../CartPage';

jest.mock('../../components/Border', () => () => <div data-testid="border" />);
jest.mock('../../components/Navbar', () => () => <div data-testid="navbar" />);
jest.mock('../../components/Cart/CartForm', () => () => <div data-testid="cartform" />);
jest.mock('../../components/IGEmbed.tsx', () => () => <div data-testid="igembed" />);
jest.mock('../../components/Footer.tsx', () => () => <div data-testid="footer" />);

describe('CartPage', () => {
    test('renders all CartPage components', () => {
        render(<CartPage />);

        expect(screen.getByTestId('border')).toBeInTheDocument();
        expect(screen.getByTestId('navbar')).toBeInTheDocument();
        expect(screen.getByTestId('cartform')).toBeInTheDocument();
        expect(screen.getByTestId('igembed')).toBeInTheDocument();
        expect(screen.getByTestId('footer')).toBeInTheDocument();
    });
});