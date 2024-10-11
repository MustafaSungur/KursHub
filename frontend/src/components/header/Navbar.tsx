import { useState } from "react";
import { BookOpen, Menu, X } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header className="px-4 lg:px-24 h-14 flex items-center border-b py-10 bg-transparent ">
      {/* Logo */}
      <Link className="flex items-center justify-center" to="/">
        <BookOpen className="h-10 w-10 text-amber-500 " />
        <span className="ml-2 text-3xl font-bold">KursHub</span>
      </Link>

      {/* Large Screen Navbar */}
      <nav className="hidden lg:flex ml-auto gap-4 sm:gap-6">
        <NavLink
          className="text-lg font-medium hover:underline underline-offset-4"
          to="/"
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          className="text-lg font-medium hover:underline underline-offset-4"
          to="/courses"
        >
          Eğitimler
        </NavLink>
        <NavLink
          className="text-lg font-medium hover:underline underline-offset-4"
          to="/dashboard"
        >
          Profil
        </NavLink>
      </nav>

      {/* Hamburger Menu Button for Mobile */}
      <div className="ml-auto lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-gray-800 hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="lg:hidden absolute top-14 left-0 w-full bg-white shadow-md">
          <div className="flex flex-col items-center gap-4 py-6">
            <NavLink
              onClick={toggleMenu}
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/"
            >
              Ana Sayfa
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/courses"
            >
              Kurslar
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              className="text-lg font-medium hover:underline underline-offset-4"
              to="/dashboard"
            >
              Profil
            </NavLink>

            <Button variant="ghost" className="text-lg">
              <NavLink onClick={toggleMenu} to="auth/login">
                Giriş Yap
              </NavLink>
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-100 text-lg">
              <NavLink onClick={toggleMenu} to="auth/register">
                Kayıt Ol
              </NavLink>
            </Button>
          </div>
        </nav>
      )}

      {/* Call to Action buttons for large screens */}
      <div className="ml-4 hidden lg:flex items-center gap-2">
        <Button variant="ghost" className="text-lg">
          <NavLink to="auth/login">Giriş Yap</NavLink>
        </Button>
        <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg">
          <NavLink to="auth/register">Kayıt Ol</NavLink>
        </Button>
      </div>
    </header>
  );
};

export default Navbar;
