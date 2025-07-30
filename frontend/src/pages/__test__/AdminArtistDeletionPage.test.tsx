import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import AdminArtistDeletionPage from "../admin/AdminArtistDeletionPage";

jest.mock("../../components/Navbar", () => () => <div data-testid="navbar" />);
jest.mock("../../components/Admin/AdminArtistDeletion", () => () => <div data-testid="admin-artist-deletion" />);
jest.mock("../../components/Admin/AdminAuth", () => ({ children }: { children: unknown }) => <>{children}</>);

describe("AdminArtistDeletionPage", () => {
  test("renders admin deletion components", async () => {
    render(
      <MemoryRouter>
        <AdminArtistDeletionPage />
      </MemoryRouter>
    );
    await waitFor(() => {
      expect(screen.getByTestId("navbar")).toBeInTheDocument();
      expect(screen.getByTestId("admin-artist-deletion")).toBeInTheDocument();
    });
  });
});