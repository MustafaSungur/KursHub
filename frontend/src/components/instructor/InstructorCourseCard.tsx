// components/CourseCard.tsx

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BarChart2 } from "lucide-react";
import { Course } from "@/types";
import { useState } from "react";
import { UpdateCourseModal } from "./UpdateCourseModal";
import { Link } from "react-router-dom";

interface CourseCardProps {
  course: Course;
  onEdit: (updatedCourse: Course) => void; // Allow the onEdit function to receive an updated course
}

export default function InstructorCourseCard({
  course,
  onEdit,
}: CourseCardProps) {
  const [isEditOpen, setIsEditOpen] = useState(false);

  return (
    <Card className="flex items-center justify-center">
      <img
        src={typeof course.image === "string" ? course.image : ""}
        alt={course.title}
        className=" h-48 object-cover"
      />
      <CardHeader className="flex-1">
        <CardTitle>{course.title}</CardTitle>
        <CardDescription>{course.subcategory}</CardDescription>
      </CardHeader>
      <CardFooter className="flex p-0 px-6">
        <Link to="/instructor/analisis/5">
          <Button variant="outline" className="mr-2">
            <BarChart2 className="mr-2 h-4 w-4" /> Analiz
          </Button>
        </Link>
        <UpdateCourseModal
          course={course}
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          onSave={onEdit} // Call onEdit with the updated course
        />
      </CardFooter>
    </Card>
  );
}
