import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2, Pencil } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: number;
  title: string;
  image: string;
  category: string;
  subcategory: string;
  tags: string[];
}

interface CourseListProps {
  courses: Course[];
  onEditClick: (course: Course) => void;
  onDeleteClick: (id: number) => void;
}

export function InstructorCourseList({
  courses,
  onEditClick,
}: CourseListProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:w-11/12 mx-auto">
      {courses.map((course) => (
        <Card key={course.id} className="flex flex-col">
          <img
            src={course.image}
            alt={course.title}
            className="w-full h-56 object-cover"
          />
          <CardHeader>
            <CardTitle className="text-lg">{course.title}</CardTitle>
            <CardDescription>{course.subcategory}</CardDescription>
          </CardHeader>
          <CardContent className="flex-grow">
            <div className="flex flex-wrap gap-2">
              {course.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-gray-200 px-2 py-1 rounded-full text-xs"
                >
                  {tag}
                </span>
              ))}
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link to="/instructor/analisis/5" className="mr-2 w-1/2">
              <Button variant="outline" className="w-full ">
                <BarChart2 className="mr-2 h-4 w-4" /> Analiz
              </Button>
            </Link>
            <Button
              variant="outline"
              className="w-1/2"
              onClick={() => onEditClick(course)}
            >
              <Pencil className="mr-2 h-4 w-4" /> Düzenle
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
