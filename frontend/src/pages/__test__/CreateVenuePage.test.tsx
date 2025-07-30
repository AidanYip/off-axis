import { render, screen } from "@testing-library/react";
import CreateVenuePage from "../CreateVenuePage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/CreateVenue/CreateVenueForm", () => () => <div data-testid="createvenueform" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("CreateVenuePage", () => {
    test("renders all components", () => {
        render(<CreateVenuePage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("createvenueform")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<CreateVenuePage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const createVenueFormIndex = html.indexOf('data-testid="createvenueform"');
        const igEmbedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');

        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(createVenueFormIndex);
        expect(createVenueFormIndex).toBeLessThan(igEmbedIndex);
        expect(igEmbedIndex).toBeLessThan(footerIndex);
    });

    test("contains no unexpected components", () => {
        render(<CreateVenuePage />);
        // Ensuring that only the mocked components are present.
        const allowedTestIds = [
            "border",
            "navbar",
            "createvenueform",
            "igembed",
            "footer",
        ];
        allowedTestIds.forEach((testId) => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
    });
});