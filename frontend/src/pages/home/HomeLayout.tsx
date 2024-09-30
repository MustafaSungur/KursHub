import Navbar from "@/components/header/Navbar";
import { Outlet } from "react-router-dom";

const HomeLayout = () => {
  return (
    <>
      <Navbar />

      <Outlet />
    </>
  );
};

export default HomeLayout;
