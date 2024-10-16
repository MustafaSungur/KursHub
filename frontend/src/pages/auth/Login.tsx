import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import { loginUser } from "@/app/features/auth/authActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, Mail, Lock } from "lucide-react";
import view from "../../assets/2-min.jpg";
import { Link, useNavigate } from "react-router-dom";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state: RootState) => state.auth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await dispatch(loginUser({ email, password })).unwrap();
      navigate("/courses"); // Redirect to home page after successful login
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="flex min-h-screen lg:w-10/12 lg:m-auto">
      {/* Sol taraf - Login formu */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24">
        <div className="w-full max-w-md">
          <Link to="/">
            <div className="flex items-center justify-center mb-8">
              <BookOpen className="h-10 w-10 text-amber-500" />
              <span className="ml-2 text-2xl font-bold">KursHub</span>
            </div>
          </Link>
          <h1 className="text-3xl font-bold mb-6">Hesabınıza Giriş Yapın</h1>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Şifre</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 border-none rounded-xl"
            >
              Giriş Yap
            </Button>
          </form>
          {error && <ErrorMessage message={error} />}
          <div className="mt-6 text-center">
            <a href="#" className="text-sm text-amber-600 hover:underline">
              Şifrenizi mi unuttunuz?
            </a>
          </div>
          <div className="mt-4 text-center">
            <span className="text-sm text-gray-600">Hesabınız yok mu? </span>
            <Link
              to="/auth/register"
              className="text-sm text-amber-600 hover:underline"
            >
              Kaydolun
            </Link>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Görsel */}
      <div className="hidden lg:block w-1/2 bg-amber-100">
        <img
          src={view}
          alt="Login görsel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
