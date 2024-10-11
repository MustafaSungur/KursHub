// components/Sidebar.tsx

import { BarChart2, Pencil } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function AdminSidebar() {
  return (
    <aside className="w-72 bg-white shadow-md h-full">
      <div className="flex flex-col">
        <h2 className="text-2xl font-bold mb-4 p-5 pb-2 text-center">
          Admin Paneli
        </h2>
        <nav className="flex flex-col gap-3">
          <NavLink
            to="/admin/users"
            className="flex items-center hover:bg-gray-100 p-4 rounded"
          >
            <Pencil className="mr-2 h-4 w-4" />
            Kullanıcıları Yönet
          </NavLink>
          <NavLink
            to="/admin/courses"
            className="flex items-center p-4 mt-2 hover:bg-gray-100 rounded"
          >
            <BarChart2 className="mr-2" />
            Eğitimleri Yönet
          </NavLink>
        </nav>
      </div>
    </aside>
  );
}
