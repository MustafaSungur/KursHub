import AdminSidebar from "@/components/admin/AdminSidebar";
import NavbarLogo from "@/components/header/NavbarLogo";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <>
      <div className="flex flex-col">
        <NavbarLogo />
        <div className="flex h-screen bg-gray-100">
          <AdminSidebar />
          <Outlet />;
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
