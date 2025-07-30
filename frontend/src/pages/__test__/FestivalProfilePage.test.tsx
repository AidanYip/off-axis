import { render, screen } from "@testing-library/react";
import FestivalProfilePage from "../FestivalProfilePage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Festivals/FestivalProfile", () => () => <div data-testid="festivalprofile" />);
jest.mock("../../components/IGEmbed", () => () => <div data-testid="igembed" />);
jest.mock("../../components/Footer", () => () => <div data-testid="footer" />);

describe("FestivalProfilePage", () => {
    test("renders all components", () => {
        render(<FestivalProfilePage />);
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("festivalprofile")).toBeInTheDocument();
        expect(screen.getByTestId("igembed")).toBeInTheDocument();
        expect(screen.getByTestId("footer")).toBeInTheDocument();
    });

    test("renders components in the correct order", () => {
        const { container } = render(<FestivalProfilePage />);
        const html = container.innerHTML;
        const borderIndex = html.indexOf('data-testid="border"');
        const navbarIndex = html.indexOf('data-testid="navbar"');
        const festivalProfileIndex = html.indexOf('data-testid="festivalprofile"');
        const igembedIndex = html.indexOf('data-testid="igembed"');
        const footerIndex = html.indexOf('data-testid="footer"');
        
        expect(borderIndex).toBeLessThan(navbarIndex);
        expect(navbarIndex).toBeLessThan(festivalProfileIndex);
        expect(festivalProfileIndex).toBeLessThan(igembedIndex);
        expect(igembedIndex).toBeLessThan(footerIndex);
    });

    test("renders only the expected components", () => {
        render(<FestivalProfilePage />);
        const allowedTestIds = ["border", "navbar", "festivalprofile", "igembed", "footer"];
        allowedTestIds.forEach((testId) => {
            expect(screen.getByTestId(testId)).toBeInTheDocument();
        });
    });
});