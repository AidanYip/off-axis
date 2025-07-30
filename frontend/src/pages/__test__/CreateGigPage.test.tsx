import { render, screen } from "@testing-library/react";
import CreateGigPage from "../CreateGigPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/CreateGig/CreateGigForm", () => () => <div data-testid="creategigform" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("CreateGigPage", () => {
    test("renders all components", () => {
        render(<CreateGigPage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("creategigform")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<CreateGigPage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const createGigFormIndex = html.indexOf('data-testid="creategigform"');
        const igEmbedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');
        
        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(createGigFormIndex);
        expect(createGigFormIndex).toBeLessThan(igEmbedIndex);
        expect(igEmbedIndex).toBeLessThan(footerIndex);
    });
});