import { FC } from "react";
import Navbar from "../../components/Navbar";
import Border from "../../components/Border";
import "bootstrap/dist/css/bootstrap.css";
import "./AdminPage.css";
import AdminGigApproval from "../../components/Admin/AdminGigApproval";
import AdminAuth from "../../components/Admin/AdminAuth";

const AdminGigApprovalPage: FC = () => {
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
            <AdminGigApproval />
        </div>
      </AdminAuth>
    </>
  );
};

export default AdminGigApprovalPage;