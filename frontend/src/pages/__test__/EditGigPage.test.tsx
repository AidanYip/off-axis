import { render, screen } from "@testing-library/react";
import EditGigPage from "../EditGigPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/EditGig/EditGigForm", () => () => <div data-testid="editgigform" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("EditGigPage", () => {
    test("renders all components", () => {
        render(<EditGigPage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("editgigform")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<EditGigPage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const editGigFormIndex = html.indexOf('data-testid="editgigform"');
        const igEmbedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');

        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(editGigFormIndex);
        expect(editGigFormIndex).toBeLessThan(igEmbedIndex);
        expect(igEmbedIndex).toBeLessThan(footerIndex);
    });

    test("renders only the expected components", () => {
        render(<EditGigPage />);
        const allowedTestIds = [
            "border",
            "navbar",
            "editgigform",
            "igembed",
            "footer"
        ];
        allowedTestIds.forEach((testId) => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
    });
});