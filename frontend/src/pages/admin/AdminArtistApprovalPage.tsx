import { FC } from "react";
import Navbar from "../../components/Navbar.tsx";
import Border from "../../components/Border.tsx";
import "bootstrap/dist/css/bootstrap.css";
import "./AdminPage.css";
import AdminArtistApproval from "../../components/Admin/AdminArtistApproval.tsx";
import AdminAuth from "../../components/Admin/AdminAuth.tsx";

const AdminArtistApprovalPage: FC = () => {
  return (
    <>
      <AdminAuth>
        <Border />
        <Navbar />
        <div className="p-3 mb-2 bg-white text-dark" id="admin-container">
          <h2 className="p-3 mb-2" style={{ textAlign: "left" }}>
            Off Axis Admin Page
          </h2>
          <hr />
            <AdminArtistApproval />
        </div>
      </AdminAuth>
    </>
  );
};

export default AdminArtistApprovalPage;