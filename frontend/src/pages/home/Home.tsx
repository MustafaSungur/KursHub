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
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { Badge } from "@/components/ui/badge";

const courses = [
  {
    id: 1,
    title: "React'e Giriş",
    description:
      "React'in temellerini öğrenin ve modern web uygulamaları oluşturun.",
    instructor: "Ayşe Yılmaz",
    students: 1234,
    rating: 4.8,
    duration: "10 saat",
    category: "Web Geliştirme",
    topics: ["JavaScript", "React", "Frontend"],
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "İleri Seviye JavaScript Teknikleri",
    description: "JavaScript programlamada ileri düzey kavramları öğrenin.",
    instructor: "Mehmet Kaya",
    students: 987,
    rating: 4.9,
    duration: "15 saat",
    category: "Programlama",
    topics: ["JavaScript", "ES6+", "Algoritmalar"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "UI/UX Tasarım Temelleri",
    description: "Güzel ve işlevsel kullanıcı arayüzleri oluşturun.",
    instructor: "Zeynep Demir",
    students: 2345,
    rating: 4.7,
    duration: "12 saat",
    category: "Tasarım",
    topics: ["UI", "UX", "Figma"],
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Python ile Veri Bilimi",
    description: "Python kullanarak veri analizi ve makine öğrenimi keşfedin.",
    instructor: "Ali Öztürk",
    students: 1876,
    rating: 4.6,
    duration: "20 saat",
    category: "Veri Bilimi",
    topics: ["Python", "Makine Öğrenimi", "İstatistik"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 5,
    title: "Flutter ile Mobil Uygulama Geliştirme",
    description:
      "Flutter framework ile çapraz platform mobil uygulamalar oluşturun.",
    instructor: "Elif Yıldız",
    students: 1543,
    rating: 4.8,
    duration: "18 saat",
    category: "Mobil Geliştirme",
    topics: ["Flutter", "Dart", "Mobil"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "DevOps Temelleri",
    description: "DevOps uygulamalarının prensiplerini ve araçlarını öğrenin.",
    instructor: "Mustafa Şahin",
    students: 987,
    rating: 4.7,
    duration: "14 saat",
    category: "DevOps",
    topics: ["CI/CD", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=400&width=600",
  },
];

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
            <h2 className="text-3xl text-zinc-600 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
              Öne Çıkan Eğitimler
            </h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {courses.map((course) => (
                <Card key={course.id} className="flex flex-col">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={course.instructor}
                        />
                        <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                      </Avatar>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {course.topics.map((topic: string) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} Değerlendirme</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="/courses/5" className="w-full">
                      <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-100 text-base rounded-xl">
                        Şimdi İzle
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
          <div className="container px-4 md:px-6 mx-auto">
            <h2 className="text-3xl text-zinc-600 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
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
