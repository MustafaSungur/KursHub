import CourseCard from "../CourseCard";
import LoadingSpinner from "../LoadingSpinner";
import ErrorMessage from "../ErrorMessage";

interface FeaturedCoursesProps {
  courses: any;
  loading: boolean;
  error: string | null;
}

export default function FeaturedCourses({
  courses,
  loading,
  error,
}: FeaturedCoursesProps) {
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  // Courses veya courses.$values mevcut değilse durum kontrolü
  if (!courses || !courses.$values || courses.$values.length === 0) {
    return <ErrorMessage message="No courses found" />;
  }

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl text-zinc-600 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Öne Çıkan Eğitimler
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.$values.map((course: any) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  );
}
