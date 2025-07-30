/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import AdminGigManagerPage from "../admin/AdminGigManagerPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminGigManagerForm", () => () => (
    <div data-testid="admingigmanagerform" />
));
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: any }) => (
    <div data-testid="adminauth">{children}</div>
));

describe("Admin Gig Manager Page", () => {
    test("renders all admin page sections", () => {
        render(<AdminGigManagerPage />);
        
        expect(screen.getByTestId("adminauth")).toBeInTheDocument();
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("admingigmanagerform")).toBeInTheDocument();
        expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
    });

    test("container has correct styling and id", () => {
        render(<AdminGigManagerPage />);
        const container = screen.getByText("Off Axis Admin Page").closest("div");
        expect(container).toHaveAttribute("id", "admin-container");
        expect(container).toHaveClass("p-3 mb-2 bg-white text-dark");
    });

    test("header is left aligned", () => {
        render(<AdminGigManagerPage />);
        const header = screen.getByRole("heading", { level: 2 });
        expect(header).toHaveStyle("text-align: left");
    });

    test("renders a horizontal rule", () => {
        render(<AdminGigManagerPage />);
        const hr = screen.getByRole("separator");
        expect(hr).toBeInTheDocument();
    });
});