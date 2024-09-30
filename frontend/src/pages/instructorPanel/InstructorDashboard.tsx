import { InstructorCourseList } from "@/components/instructor/InstructorCourseList";
import { UpdateCourseModal } from "@/components/instructor/UpdateCourseModal";
import { UploadCourseModal } from "@/components/instructor/UploadCourseModal";
import { Button } from "@/components/ui/button";
import { Upload } from "lucide-react";
import { useState } from "react";

interface Course {
  id: number;
  title: string;
  image: string;
  subcategory: string;
  tags: string[];
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: "React Temelleri",
    image:
      "https://images.pexels.com/photos/14207926/pexels-photo-14207926.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    subcategory: "Web Geliştirme",
    tags: ["JavaScript", "React"],
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Veri Bilimi",
    tags: ["Python", "Machine Learning"],
  },
  {
    id: 3,
    title: "UI/UX Tasarım Prensipleri",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Tasarım",
    tags: ["UI/UX"],
  },
  {
    id: 1,
    title: "React Temelleri",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Web Geliştirme",
    tags: ["JavaScript", "React"],
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Veri Bilimi",
    tags: ["Python", "Machine Learning"],
  },
  {
    id: 3,
    title: "UI/UX Tasarım Prensipleri",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Tasarım",
    tags: ["UI/UX"],
  },
  {
    id: 1,
    title: "React Temelleri",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Web Geliştirme",
    tags: ["JavaScript", "React"],
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Veri Bilimi",
    tags: ["Python", "Machine Learning"],
  },
  {
    id: 3,
    title: "UI/UX Tasarım Prensipleri",
    image: "/placeholder.svg?height=100&width=200",
    subcategory: "Tasarım",
    tags: ["UI/UX"],
  },
];

export default function InstructorDashboard() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Course | null>(null);

  const handleUploadCourse = (newCourse: Omit<Course, "id">) => {
    setCourses([...courses, { ...newCourse, id: courses.length + 1 }]);
    setIsUploadModalOpen(false);
  };

  const handleEditCourse = (updatedCourse: Course) => {
    setCourses(
      courses.map((course) =>
        course.id === updatedCourse.id ? updatedCourse : course
      )
    );
    setIsEditModalOpen(false);
    setCurrentCourse(null);
  };

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  return (
    <>
      <main className="flex-1 lg:p-8 overflow-auto ">
        <div className="flex justify-between items-center lg:mx-auto lg:w-11/12 mb-10">
          <h1 className="text-2xl lg:text-3xl font-bold">Eğitimlerimi Yönet</h1>
          <Button
            className="bg-amber-500 hover:bg-amber-600"
            onClick={() => setIsUploadModalOpen(true)}
          >
            <Upload className="mr-2 h-4 w-4" /> Eğitim Yükle
          </Button>
        </div>
        <InstructorCourseList
          courses={courses}
          onEditClick={(course: Course) => {
            setCurrentCourse(course);
            setIsEditModalOpen(true);
          }}
          onDeleteClick={handleDeleteCourse}
        />
      </main>
      <UploadCourseModal
        isOpen={isUploadModalOpen}
        onClose={() => setIsUploadModalOpen(false)}
        onUpload={() => handleUploadCourse}
      />
      <UpdateCourseModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEdit={handleEditCourse}
        course={currentCourse}
      />
    </>
  );
}
