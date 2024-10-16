import { BookOpen } from "lucide-react";
import CourseCard from "../CourseCard";

interface CourseListProps {
  courses: any[];
}

export default function CourseList({ courses }: CourseListProps) {
  if (courses.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
        <h2 className="mt-2 text-lg font-medium text-gray-900">
          Kurs bulunamadı
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          Farklı bir arama terimi veya kategori deneyin.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {courses.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}
