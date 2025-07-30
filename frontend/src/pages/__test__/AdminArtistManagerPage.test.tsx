/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import AdminArtistManagerPage from "../admin/AdminArtistManagerPage";

jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: any }) => (
  <div data-testid="adminauth">{children}</div>
));
jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminArtistManagerForm", () => () => (
  <div data-testid="adminartistmanagerform" />
));

describe("Admin Artist Manager Page", () => {
  test("renders all admin page sections", () => {
    render(<AdminArtistManagerPage />);
    expect(screen.getByTestId("adminauth")).toBeInTheDocument();
    expect(screen.getByTestId("border")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("adminartistmanagerform")).toBeInTheDocument();
    expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
  });
});