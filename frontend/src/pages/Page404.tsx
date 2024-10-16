import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { FileQuestion } from "lucide-react";

export default function Page404() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <FileQuestion className="w-24 h-24 text-amber-500 mb-8" />
      <h1 className="text-4xl font-bold text-gray-900 mb-2 text-center">
        Sayfa Bulunamadı
      </h1>
      <p className="text-xl text-gray-600 mb-8 text-center">
        Üzgünüz, aradığınız sayfayı bulamadık.
      </p>
      <Button
        onClick={() => navigate("/")}
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105"
      >
        Ana Sayfaya Dön
      </Button>
    </div>
  );
}
