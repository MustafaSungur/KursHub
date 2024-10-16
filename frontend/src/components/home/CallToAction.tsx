import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function CallToAction() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-500 text-white">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Öğrenmeye Bugün Başlayın
          </h2>
          <p className="max-w-[700px] md:text-xl">
            Kariyerinizi ilerletmek, yeni beceriler kazanmak veya sadece
            merakınızı gidermek için KursHub'ın sunduğu fırsatları kaçırmayın.
          </p>
          <Link to="/auth/register">
            <Button className="bg-white text-amber-500 hover:bg-gray-100 text-lg px-8 py-3">
              Ücretsiz Kaydol
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
