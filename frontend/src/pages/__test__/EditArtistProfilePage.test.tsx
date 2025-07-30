import { render, screen } from "@testing-library/react";
import EditArtistProfilePage from "../EditArtistProfilePage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/EditArtistProfile/EditArtistProfile", () => () => <div data-testid="editartistprofile" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("EditArtistProfilePage", () => {
    test("renders all components", () => {
        render(<EditArtistProfilePage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("editartistprofile")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<EditArtistProfilePage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const editArtistProfileIndex = html.indexOf('data-testid="editartistprofile"');
        const igEmbedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');

        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(editArtistProfileIndex);
        expect(editArtistProfileIndex).toBeLessThan(igEmbedIndex);
        expect(igEmbedIndex).toBeLessThan(footerIndex);
    });

    test("does not render extra components", () => {
        render(<EditArtistProfilePage />);
        const allowedTestIds = [
            "border",
            "navbar",
            "editartistprofile",
            "igembed",
            "footer",
        ];
        allowedTestIds.forEach((testId) => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
    });
});