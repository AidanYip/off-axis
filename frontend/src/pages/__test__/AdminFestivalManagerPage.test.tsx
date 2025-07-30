/* eslint-disable @typescript-eslint/no-explicit-any */

import { render, screen } from "@testing-library/react";
import AdminFestivalManagerPage from "../admin/AdminFestivalManagerPage";

jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Border", () => () => <div data-testid="border" />);
jest.mock("../../components/Admin/AdminFestivalManagerForm", () => () => (
  <div data-testid="adminfestivalmanagerform" />
));
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: any }) => (
  <div data-testid="adminauth">{children}</div>
));

describe("Admin Festival Manager Page", () => {
  test("renders all admin festival manager page sections", () => {
    render(<AdminFestivalManagerPage />);
    expect(screen.getByTestId("adminauth")).toBeInTheDocument();
    expect(screen.getByTestId("border")).toBeInTheDocument();
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("adminfestivalmanagerform")).toBeInTheDocument();
    expect(screen.getByText("Off Axis Admin Page")).toBeInTheDocument();
  });

  test("container has correct styling", () => {
    render(<AdminFestivalManagerPage />);
    const container = screen.getByText("Off Axis Admin Page").closest("div");
    expect(container).toHaveClass("p-3 mb-2 bg-white text-dark");
  });
});