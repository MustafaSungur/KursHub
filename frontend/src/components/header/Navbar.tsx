import { useState } from "react";
import { BookOpen, Menu, X, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { resetToken } from "@/app/features/auth/authSlice";

const Navbar = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [isOpen, setIsOpen] = useState(false);
  const { userToken } = useSelector((state: RootState) => state.auth);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const logout = () => {
    dispatch(resetToken());
    navigate("/");
  };

  return (
    <header className="px-4 lg:px-44 h-14 flex items-center justify-between border-b py-10 bg-transparent relative">
      {/* Logo */}
      <Link className="flex items-center" to="/">
        <BookOpen className="h-10 w-10 text-amber-500" />
        <span className="ml-2 text-3xl font-bold">KursHub</span>
      </Link>

      {/* Large Screen Navbar */}
      <nav className="hidden lg:flex items-center gap-8 ml-auto">
        <NavLink
          className="text-lg font-medium hover:text-amber-700 underline-offset-4"
          to="/"
        >
          Ana Sayfa
        </NavLink>
        <NavLink
          className="text-lg font-medium hover:text-amber-700 underline-offset-4"
          to="/courses"
        >
          Eğitimler
        </NavLink>
        {userToken ? (
          <>
            <NavLink
              className="text-lg font-medium hover:text-amber-700 underline-offset-4"
              to="/dashboard"
            >
              Profil
            </NavLink>
            <span
              onClick={logout}
              className="flex text-lg font-medium gap-1 cursor-pointer text-gray-700 hover:text-red-500 justify-center items-center"
            >
              Çıkış Yap
              <LogOut size={24} />
            </span>
          </>
        ) : (
          <>
            <Button variant="ghost" className="text-lg">
              <NavLink to="auth/login">Giriş Yap</NavLink>
            </Button>
            <Button className="bg-amber-500 hover:bg-amber-600 text-white text-lg">
              <NavLink to="auth/register">Kayıt Ol</NavLink>
            </Button>
          </>
        )}
      </nav>

      {/* Hamburger Menu Button for Mobile */}
      <div className="lg:hidden ml-auto">
        <button
          onClick={toggleMenu}
          className="text-gray-800 hover:text-gray-900 focus:outline-none"
        >
          {isOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="lg:hidden absolute top-14 left-0 w-full bg-white shadow-md z-50">
          <div className="flex flex-col items-center gap-4 py-6">
            <NavLink
              onClick={toggleMenu}
              className="text-lg font-medium hover:text-amber-700 underline-offset-4"
              to="/"
            >
              Ana Sayfa
            </NavLink>
            <NavLink
              onClick={toggleMenu}
              className="text-lg font-medium hover:text-amber-700 underline-offset-4"
              to="/courses"
            >
              Eğitimler
            </NavLink>
            {userToken ? (
              <>
                <NavLink
                  onClick={toggleMenu}
                  className="text-lg font-medium hover:text-amber-700 underline-offset-4"
                  to="/dashboard"
                >
                  Profil
                </NavLink>
                <button
                  onClick={() => {
                    logout();
                    toggleMenu();
                  }}
                  className="text-lg font-medium text-red-500 hover:text-red-700"
                >
                  Çıkış Yap
                </button>
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Navbar;
