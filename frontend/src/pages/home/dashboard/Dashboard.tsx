import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/app/store";
import {
  updateUserAction,
  deleteUserAction,
  fetchUserById,
} from "@/app/features/user/userAction";
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
  CheckCircle,
  XCircle,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import Footer from "@/components/Footer";

interface UserInfo {
  userID: string;
  firstName?: string | "";
  lastName?: string | "";
  email?: string | "";
  image?: string | "";
  role?: string | "";
}

export default function Dashboard() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state: RootState) => state.auth) as {
    userInfo: UserInfo | null;
  };
  const { userLoading, userData } = useSelector(
    (state: RootState) => state.user
  );

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<UserInfo | null>(null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [updateStatus, setUpdateStatus] = useState<"success" | "error" | null>(
    null
  );

  useEffect(() => {
    if (userInfo?.userID) {
      dispatch(fetchUserById(userInfo.userID));
    }
  }, [userInfo, dispatch]);

  useEffect(() => {
    if (userData) {
      setUpdatedUser({
        userID: userData.userID,
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        image: userData.image,
        role: userData.role,
      });
    }
  }, [userData]);

  const handleUpdateUser = async () => {
    if (!updatedUser) return;

    try {
      const userData = {
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
      };

      await dispatch(
        updateUserAction({
          id: userInfo?.userID,
          updatedUser: userData,
          imageFile: newImage,
        })
      ).unwrap();

      setUpdateStatus("success");
      setTimeout(() => {
        setIsUpdateModalOpen(false);
        setUpdateStatus(null);
      }, 2000);
    } catch (error) {
      console.error("Failed to update user:", error);
      setUpdateStatus("error");
    }
  };

  const handleDeleteUser = async () => {
    if (!updatedUser) return;
    if (
      window.confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      try {
        await dispatch(deleteUserAction(updatedUser.userID)).unwrap();
        dispatch(logout());
        navigate("/");
      } catch (error) {
        console.error("Failed to delete user:", error);
      }
    }
  };

  const openInstructorPanel = () => {
    const url = `${window.location.origin}/instructor/edit`;
    window.open(url, "_blank");
  };

  if (!updatedUser) return null;

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
                  src={
                    updatedUser.image || "/placeholder.svg?height=128&width=128"
                  }
                  alt={`${updatedUser.firstName || ""} ${
                    updatedUser.lastName || ""
                  }`}
                />
                <AvatarFallback>
                  {updatedUser.firstName?.[0] || ""}
                  {updatedUser.lastName?.[0] || ""}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="text-xl font-semibold">
                  {updatedUser.firstName} {updatedUser.lastName}
                </h3>
                <p className="text-sm text-gray-500">{updatedUser.email}</p>
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
                        src={
                          updatedUser.image ||
                          "/placeholder.svg?height=128&width=128"
                        }
                        alt={`${updatedUser.firstName || ""} ${
                          updatedUser.lastName || ""
                        }`}
                      />
                      <AvatarFallback>
                        {updatedUser.firstName?.[0] || ""}
                        {updatedUser.lastName?.[0] || ""}
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
                            setNewImage(file);
                            const reader = new FileReader();
                            reader.onload = (e) => {
                              setUpdatedUser((prev) => ({
                                ...prev!,
                                image: e.target?.result as string,
                              }));
                            };
                            reader.readAsDataURL(file);
                          }
                        }}
                      />
                    </Label>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="firstName">İsim</Label>
                    <Input
                      id="firstName"
                      value={updatedUser.firstName || ""}
                      onChange={(e) =>
                        setUpdatedUser((prev) => ({
                          ...prev!,
                          firstName: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Soyisim</Label>
                    <Input
                      id="lastName"
                      value={updatedUser.lastName || ""}
                      onChange={(e) =>
                        setUpdatedUser((prev) => ({
                          ...prev!,
                          lastName: e.target.value,
                        }))
                      }
                    />
                  </div>
                </div>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 border-none"
                  onClick={handleUpdateUser}
                  disabled={userLoading}
                >
                  {userLoading ? "Güncelleniyor..." : "Güncelle"}
                </Button>
                {updateStatus && (
                  <div
                    className={`mt-4 p-2 rounded-md ${
                      updateStatus === "success"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {updateStatus === "success" ? (
                      <div className="flex items-center">
                        <CheckCircle className="mr-2 h-5 w-5" />
                        Profil başarıyla güncellendi.
                      </div>
                    ) : (
                      <div className="flex items-center">
                        <XCircle className="mr-2 h-5 w-5" />
                        Profil güncellenirken bir hata oluştu.
                      </div>
                    )}
                  </div>
                )}
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
              {updatedUser.role === "Instructor" && (
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={openInstructorPanel}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" /> Eğitmen Kontrol
                  Paneli
                </Button>
              )}
              <Button
                className="w-full"
                variant="destructive"
                onClick={handleDeleteUser}
                disabled={userLoading}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                {userLoading ? "Hesap Siliniyor..." : "Hesabı Sil"}
              </Button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

function logout(): any {
  throw new Error("Function not implemented.");
}
