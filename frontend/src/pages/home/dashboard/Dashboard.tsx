import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import {
  Edit,
  PlayCircle,
  LayoutDashboard,
  Trash2,
  Upload,
} from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [user, setUser] = useState({
    name: "Ahmet",
    surname: "Yılmaz",
    email: "ahmet.yilmaz@example.com",
    avatar: "/placeholder.svg?height=128&width=128",
  });

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({ ...user });

  const handleUpdateUser = () => {
    setUser(updatedUser);
    setIsUpdateModalOpen(false);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tighter text-center sm:text-4xl mb-8 text-zinc-600">
            Hesabım
          </h1>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold mb-4">Profil Bilgileri</h2>
            <div className="flex items-center space-x-4 mb-4">
              <Avatar className="h-20 w-20">
                <AvatarImage
                  src={user.avatar}
                  alt={`${user.name} ${user.surname}`}
                />
                <AvatarFallback>
                  {user.name[0]}
                  {user.surname[0]}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {user.name} {user.surname}
                </h3>
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
            </div>
            <Dialog
              open={isUpdateModalOpen}
              onOpenChange={setIsUpdateModalOpen}
            >
              <DialogTrigger asChild>
                <Button className="w-full sm:w-auto" variant="outline">
                  <Edit className="mr-2 h-4 w-4" /> Profili Güncelle
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Profili Güncelle</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-20 w-20">
                      <AvatarImage
                        src={updatedUser.avatar}
                        alt={`${updatedUser.name} ${updatedUser.surname}`}
                      />
                      <AvatarFallback>
                        {updatedUser.name[0]}
                        {updatedUser.surname[0]}
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
                        type="file"
                        className="hidden"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setUpdatedUser((prev) => ({
                                ...prev,
                                avatar: e.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="name">İsim</Label>
                    <Input
                      id="name"
                      value={updatedUser.name}
                      onChange={(e) =>
                        setUpdatedUser((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="surname">Soyisim</Label>
                    <Input
                      id="surname"
                      value={updatedUser.surname}
                      onChange={(e) =>
                        setUpdatedUser((prev) => ({
                          ...prev,
                          surname: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 border-none"
                  onClick={handleUpdateUser}
                >
                  Güncelle
                </Button>
              </DialogContent>
            </Dialog>
          </section>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-4">Hesap İşlemleri</h2>
            <div className="space-y-4">
              <Link to="history">
                <Button className="w-full bg-amber-500 hover:bg-amber-600 text-white">
                  <PlayCircle className="mr-2 h-4 w-4" /> İzlediğim Eğitimler
                </Button>
              </Link>
              <Button className="w-full" variant="outline">
                <LayoutDashboard className="mr-2 h-4 w-4" /> Eğitmen Kontrol
                Paneli
              </Button>
              <Button className="w-full" variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" /> Hesabı Sil
              </Button>
            </div>
          </section>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 KursHub. Tüm hakları saklıdır.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Kullanım Şartları
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Gizlilik
          </a>
        </nav>
      </footer>
    </div>
  );
}
