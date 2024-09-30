import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Users, Star, Clock, ChevronLeft, ChevronRight } from "lucide-react";

const watchedCourses = [
  {
    id: 1,
    title: "React'e Giriş",
    description:
      "React'in temellerini öğrenin ve modern web uygulamaları oluşturun.",
    instructor: "Ayşe Yılmaz",
    students: 1234,
    rating: 4.8,
    duration: "10 saat",
    progress: 80,
    lastWatched: "2 gün önce",
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 2,
    title: "İleri Seviye JavaScript Teknikleri",
    description: "JavaScript programlamada ileri düzey kavramları öğrenin.",
    instructor: "Mehmet Kaya",
    students: 987,
    rating: 4.9,
    duration: "15 saat",
    progress: 60,
    lastWatched: "1 hafta önce",
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
    progress: 40,
    lastWatched: "3 gün önce",
    image: "/placeholder.svg?height=400&width=600",
  },
  // Diğer izlenen kurslar buraya eklenebilir...
];

// Toplam 12 kurs olacak şekilde dolduruyoruz
const allWatchedCourses = [
  ...watchedCourses,
  ...watchedCourses,
  ...watchedCourses,
  ...watchedCourses,
].slice(0, 12);

export default function WatchHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const coursesPerPage = 12;
  const totalPages = Math.ceil(allWatchedCourses.length / coursesPerPage);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = allWatchedCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-zinc-600">
            İzleme Geçmişi
          </h1>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {currentCourses.map((course) => (
              <Card key={course.id} className="flex flex-col">
                <img
                  src={course.image}
                  alt={course.title}
                  className="w-full h-48 object-cover"
                />
                <CardHeader>
                  <CardTitle>{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
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
                  <div className="flex justify-between text-sm text-gray-600 mb-2">
                    <div className="flex items-center">
                      <Users className="h-4 w-4 mr-1" />
                      <span>{course.students} öğrenci</span>
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
                  <div className="mt-4">
                    <div className="text-sm font-medium mb-1">
                      İlerleme: {course.progress}%
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-600 h-2.5 rounded-full"
                        style={{ width: `${course.progress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    Son izleme: {course.lastWatched}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-amber-500 hover:bg-amber-600">
                    Devam Et
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="flex justify-center items-center space-x-2 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
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
