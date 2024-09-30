import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Star, ThumbsUp } from "lucide-react";

const course = {
  title: "React ile Modern Web Uygulamaları Geliştirme",
  description:
    "Bu kapsamlı kursta, React'in temellerinden ileri seviye konularına kadar her şeyi öğreneceksiniz. Hooks, state yönetimi, routing ve daha fazlasını pratik projelerle pekiştireceksiniz.",
  rating: 4.8,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Örnek video URL'si
  instructor: "Ayşe Yılmaz",
};

const comments = [
  {
    id: 1,
    user: {
      name: "Mehmet Kaya",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    comment:
      "Harika bir kurs! Çok şey öğrendim ve projelerimde hemen uygulamaya başladım.",
    likes: 15,
  },
  {
    id: 2,
    user: {
      name: "Zeynep Demir",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    comment: "Anlatım çok akıcı ve konular detaylı işlenmiş. Teşekkürler!",
    likes: 8,
  },
  {
    id: 3,
    user: {
      name: "Ali Yıldız",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    comment: "React'i sıfırdan öğrenmek isteyenler için mükemmel bir kaynak.",
    likes: 12,
  },
];

export default function CourseDetail() {
  const [userRating, setUserRating] = useState(0);
  const [isRatingHovered, setIsRatingHovered] = useState(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    // Burada, gerçek bir uygulamada, derecelendirmeyi sunucuya gönderme işlemi yapılabilir
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video mb-6">
            <iframe
              className="w-full h-full"
              src={course.videoUrl}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          <div className="flex items-center mb-4">
            <Dialog>
              <DialogTrigger asChild>
                <div className="flex items-center cursor-pointer">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(course.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {course.rating.toFixed(1)}
                  </span>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Kursu Değerlendir</DialogTitle>
                </DialogHeader>
                <div className="flex items-center justify-center space-x-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-8 w-8 cursor-pointer ${
                        star <= (isRatingHovered ? userRating : 0)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                      onClick={() => handleRatingChange(star)}
                      onMouseEnter={() => {
                        setUserRating(star);
                        setIsRatingHovered(true);
                      }}
                      onMouseLeave={() => setIsRatingHovered(false)}
                    />
                  ))}
                </div>
                <Button
                  className="bg-amber-500 hover:bg-amber-600 border-none"
                  onClick={() => {
                    /* Derecelendirmeyi kaydet */
                  }}
                >
                  Değerlendir
                </Button>
              </DialogContent>
            </Dialog>
            <span className="ml-4 text-sm text-gray-600">
              Eğitmen: {course.instructor}
            </span>
          </div>

          <p className="text-gray-700 mb-8">{course.description}</p>

          <Separator className="my-8" />

          <section>
            <h2 className="text-2xl font-semibold mb-6">Yorumlar</h2>
            <div className="space-y-6">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <h3 className="font-semibold">{comment.user.name}</h3>
                    <p className="text-gray-700 mt-1">{comment.comment}</p>
                    <div className="flex items-center mt-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <ThumbsUp className="h-4 w-4 mr-1" />
                        {comment.likes}
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
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
