/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import AdminGigDeletionPage from "../admin/AdminGigDeletionPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminGigDeletion", () => () => <div data-testid="admingigdeletion" />);
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: any }) => (
    <div data-testid="adminauth">{children}</div>
));

describe("Admin Gig Deletion Page", () => {
    test("renders all admin gig deletion page sections", () => {
        render(<AdminGigDeletionPage />);
        
        expect(screen.getByTestId("adminauth")).toBeInTheDocument();
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("admingigdeletion")).toBeInTheDocument();
        expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
    });

    test("ensures the admin container has correct styling and id", () => {
        render(<AdminGigDeletionPage />);
        const container = screen.getByText("Off Axis Admin Page").closest("div");
        expect(container).toHaveAttribute("id", "admin-container");
        expect(container).toHaveClass("p-3 mb-2 bg-white text-dark");
    });

    test("header has left aligned text", () => {
        render(<AdminGigDeletionPage />);
        const header = screen.getByRole("heading", { level: 2 });
        expect(header).toHaveStyle("text-align: left");
    });

    test("renders a horizontal rule", () => {
        render(<AdminGigDeletionPage />);
        const hr = screen.getByRole("separator");
        expect(hr).toBeInTheDocument();
    });
});