import { render, screen } from "@testing-library/react";
import GigProfilePage from "../GigProfilePage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Gigs/GigProfile", () => () => <div data-testid="gigprofile" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("GigProfilePage", () => {
    test("renders all components", () => {
        render(<GigProfilePage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("gigprofile")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<GigProfilePage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const gigprofileIndex = html.indexOf('data-testid="gigprofile"');
        const igembedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');

        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(gigprofileIndex);
        expect(gigprofileIndex).toBeLessThan(igembedIndex);
        expect(igembedIndex).toBeLessThan(footerIndex);
    });

    test("renders only the expected components", () => {
        render(<GigProfilePage />);
        const allowedTestIds = ["border", "navbar", "gigprofile", "igembed", "footer"];
        allowedTestIds.forEach((testId) => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
    });
});