import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Users, Star, Clock, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";
import bgVideo from "../../assets/bgvideo.webm";
export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="relative w-full py-12 md:py-24 lg:py-60   lg:h-max">
          {/* Siyah Katman */}
          <div className="absolute inset-0 bg-black opacity-60 z-10 h-full"></div>

          {/* Video Arka Planı */}
          <video
            className="absolute inset-0 w-full h-full object-cover z-0"
            autoPlay
            muted
            loop
            playsInline
          >
            <source src={bgVideo} type="video/webm" />
            Tarayıcınız video etiketini desteklemiyor.
          </video>

          {/* İçerik */}
          <div className="relative container px-4 md:px-6 mx-auto z-20">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
                Öğrenmeye Başla, Kendini Geliştir
              </h1>
              <p className="max-w-[700px] text-gray-300 md:text-xl">
                KursHub ile binlerce online eğitime erişin ve kariyerinizi bir
                üst seviyeye taşıyın. Uzman eğitmenlerle, kendi hızınızda
                öğrenin.
              </p>
              <Link to="courses">
                <Button className="bg-amber-500 hover:bg-amber-600 text-slate-100 text-lg px-8 py-3 ">
                  Hemen Başla
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 ">
          <div className="container px-4 md:px-6 mx-auto  ">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Öne Çıkan Eğitimler
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3].map((course) => (
                <Card key={course} className="flex flex-col">
                  <img
                    src={`/placeholder.svg?height=200&width=400&text=Kurs+${course}`}
                    alt={`Kurs ${course}`}
                    className="w-full h-48 object-cover"
                  />
                  <CardHeader>
                    <CardTitle>Eğitim Başlığı {course}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>1000+ öğrenci</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>4.8</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>20 saat</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-100">
                      Eğitime Git
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Neden KursHub?
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[
                {
                  title: "Geniş Eğitim Yelpazesi",
                  description:
                    "Teknolojiden sanata, işletmeden dillere kadar her alanda eğitimler",
                },
                {
                  title: "Uzman Eğitmenler",
                  description: "Alanında uzman eğitmenlerle kaliteli eğitim",
                },
                {
                  title: "Esnek Öğrenme",
                  description:
                    "Kendi hızınızda, istediğiniz zaman ve yerde öğrenin",
                },
                {
                  title: "İnteraktif İçerik",
                  description:
                    "Videolar, quizler ve projelerle etkileşimli öğrenme",
                },
                {
                  title: "Sertifikalar",
                  description:
                    "Tamamladığınız eğtimlerler için sertifikalar kazanın",
                },
                {
                  title: "Topluluk Desteği",
                  description:
                    "Diğer öğrencilerle etkileşime geçin ve birlikte öğrenin",
                },
              ].map((feature, index) => (
                <Card key={index} className="flex flex-col">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <CheckCircle className="h-6 w-6 text-amber-500 mr-2" />
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-amber-500 text-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Öğrenmeye Bugün Başlayın
              </h2>
              <p className="max-w-[700px] md:text-xl">
                Kariyerinizi ilerletmek, yeni beceriler kazanmak veya sadece
                merakınızı gidermek için KursHub'ın sunduğu fırsatları
                kaçırmayın.
              </p>
              <Link to="/auth/register">
                <Button className="bg-white text-amber-500 hover:bg-gray-100 text-lg px-8 py-3">
                  Ücretsiz Kaydol
                </Button>
              </Link>
            </div>
          </div>
        </section>
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
            Gizlilik Politikası
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            İletişim
          </a>
        </nav>
      </footer>
    </div>
  );
}
