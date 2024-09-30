import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BookOpen, User, Mail, Lock, Calendar, Upload } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import view from "../../assets/2.jpg";
import { Link } from "react-router-dom";
export default function Register() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    avatar: null as File | null,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    if (type === "file") {
      const fileList = e.target.files;
      if (fileList && fileList.length > 0) {
        setFormData((prev) => ({ ...prev, [name]: fileList[0] }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Burada kayıt işlemleri yapılacak
    console.log("Register attempt with:", formData);
  };

  return (
    <div className="flex min-h-screen">
      {/* Sol taraf - Kayıt formu */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center p-8 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md">
          <div className="flex items-center justify-center mb-8">
            <BookOpen className="h-10 w-10 text-amber-500" />
            <span className="ml-2 text-2xl font-bold">KursHub</span>
          </div>
          <h1 className="text-3xl font-bold mb-6">Yeni Hesap Oluşturun</h1>
          <form onSubmit={handleRegister} className="space-y-4">
            <div className="flex space-x-4">
              <div className="space-y-2 flex-1">
                <Label htmlFor="firstName">Ad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="firstName"
                    name="firstName"
                    placeholder="Adınız"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2 flex-1">
                <Label htmlFor="lastName">Soyad</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <Input
                    id="lastName"
                    name="lastName"
                    placeholder="Soyadınız"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">E-posta</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={formData.email}
                  onChange={handleInputChange}
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
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Şifre Tekrarı</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="dateOfBirth">Doğum Tarihi</Label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <Input
                  id="dateOfBirth"
                  name="dateOfBirth"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="avatar">Profil Resmi</Label>
              <div className="flex items-center space-x-4">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      formData.avatar
                        ? URL.createObjectURL(formData.avatar)
                        : undefined
                    }
                  />
                  <AvatarFallback>
                    {formData.firstName[0]}
                    {formData.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <Label
                  htmlFor="avatar"
                  className="cursor-pointer bg-gray-100 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors"
                >
                  <Upload className="h-4 w-4 inline-block mr-2" />
                  Resim Yükle
                  <Input
                    id="avatar"
                    name="avatar"
                    type="file"
                    accept="image/*"
                    onChange={handleInputChange}
                    className="hidden"
                  />
                </Label>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 rounded-xl"
            >
              Kayıt Ol
            </Button>
          </form>
          <div className="mt-6 text-center">
            <span className="text-sm text-gray-600">
              Zaten bir hesabınız var mı?{" "}
            </span>
            <Link
              to="/auth/login"
              className="text-sm text-amber-600 hover:underline"
            >
              Giriş yapın
            </Link>
          </div>
        </div>
      </div>

      {/* Sağ taraf - Görsel */}
      <div className="hidden lg:block w-1/2 bg-amber-100">
        <img
          src={view}
          alt="Kayıt görsel"
          className="w-full h-full object-cover"
        />
      </div>
    </div>
  );
}
