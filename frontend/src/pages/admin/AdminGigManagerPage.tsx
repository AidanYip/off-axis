import { FC } from "react";
import Navbar from "../../components/Navbar";
import Border from "../../components/Border";
import "bootstrap/dist/css/bootstrap.css";
import "./AdminPage.css";

import AdminGigManagerForm from "../../components/Admin/AdminGigManagerForm";
import AdminAuth from "../../components/Admin/AdminAuth";

const AdminGigManagerPage: FC = () => {
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
          <AdminGigManagerForm />
        </div>
      </AdminAuth>
    </>
  );
};

export default AdminGigManagerPage;
