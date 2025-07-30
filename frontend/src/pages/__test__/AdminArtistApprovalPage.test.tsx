import { render, screen } from "@testing-library/react";
import type { ReactNode } from "react";
import AdminArtistApprovalPage from "../admin/AdminArtistApprovalPage";

jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminArtistApproval", () => () => <div data-testid="admin-artist-approval" />);
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: ReactNode }) => (
  <div data-testid="admin-auth">{children}</div>
));

describe("AdminArtistApprovalPage", () => {
  test("renders admin page components", () => {
    render(<AdminArtistApprovalPage />);
    expect(screen.getByTestId("admin-auth")).toBeInTheDocument();
    expect(screen.getByTestId("border")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("admin-artist-approval")).toBeInTheDocument();
    expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
  });
});