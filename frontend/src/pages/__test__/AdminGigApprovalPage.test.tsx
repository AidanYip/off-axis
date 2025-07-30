/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import AdminGigApprovalPage from "../admin/AdminGigApprovalPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminGigApproval", () => () => <div data-testid="admingigapproval" />);
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: any }) => (
    <div data-testid="adminauth">{children}</div>
));

describe("Admin Gig Approval Page", () => {
    test("renders all admin gig approval page sections", () => {
        render(<AdminGigApprovalPage />);
        
        expect(screen.getByTestId("adminauth")).toBeInTheDocument();
        expect(screen.getByTestId("border")).toBeInTheDocument();
        expect(screen.getByTestId("navbar")).toBeInTheDocument();
        expect(screen.getByTestId("admingigapproval")).toBeInTheDocument();
        expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
    });

    test("ensures the admin container has correct styling and id", () => {
        render(<AdminGigApprovalPage />);
        const container = document.getElementById("admin-container");
        expect(container).toBeInTheDocument();
        expect(container).toHaveClass("p-3 mb-2 bg-white text-dark");
    });

    test("header is aligned to the left", () => {
        render(<AdminGigApprovalPage />);
        const header = screen.getByRole("heading", { level: 2 });
        expect(header).toHaveStyle("text-align: left");
    });

    test("contains a horizontal rule", () => {
        render(<AdminGigApprovalPage />);
        const hr = screen.getByRole("separator");
        expect(hr).toBeInTheDocument();
    });
});