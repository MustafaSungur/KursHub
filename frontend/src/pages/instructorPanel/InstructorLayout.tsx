import NavbarLogo from "@/components/header/NavbarLogo";
import InstructorSidebar from "@/components/instructor/InstructorSidebar";
import { Outlet } from "react-router-dom";

const InstructorLayout = () => {
  return (
    <div className="flex flex-col">
      <NavbarLogo />
      <div className="flex h-screen bg-gray-100">
        <InstructorSidebar />
        <Outlet />;
      </div>
    </div>
  );
};

export default InstructorLayout;
