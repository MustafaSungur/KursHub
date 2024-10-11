import { BookOpen } from "lucide-react";
import { Link } from "react-router-dom";

const NavbarLogo = () => {
  return (
    <header className="px-4 lg:px-6 h-14 flex items-center border-b py-10 bg-transparent ">
      {/* Logo */}
      <Link className="flex items-center justify-center lg:pl-7" to="/">
        <BookOpen className="h-10 w-10 text-amber-500 " />
        <span className="ml-2 text-3xl font-bold">KursHub</span>
      </Link>
    </header>
  );
};

export default NavbarLogo;
