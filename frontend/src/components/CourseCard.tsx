import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Users, Star, Clock } from "lucide-react";
import { Link } from "react-router-dom";
import defaultContentImage from "./../assets/contetDefault.png";
import defaultProfileImage from "./../assets/defaultProfile.png";
interface CourseCardProps {
  course: any;
}

export default function CourseCard({ course }: CourseCardProps) {
  console.log("card: ", course);
  return (
    <Card className="flex flex-col lg:w-10/12">
      <img
        src={defaultContentImage}
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
              src={defaultProfileImage}
              alt={`${course.createdUser.firstName} ${course.createdUser.lastName}`}
            />
            <AvatarFallback>{course.createdUser.firstName[0]}</AvatarFallback>
          </Avatar>
          <span>{`${course.createdUser.firstName} ${course.createdUser.lastName}`}</span>
        </div>
        <div className="flex flex-wrap gap-2 my-4">
          {course.contentTags.$values.map((tag: any) => (
            <Badge key={tag.tagId} variant="secondary">
              {tag.tagName}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <div className="flex items-center">
            <Users className="h-4 w-4 mr-1" />
            <span>{course.viewCount} İzlenme</span>
          </div>
          <div className="flex items-center">
            <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
            <span>
              {course.rating.toFixed(1)} ({course.ratingCount})
            </span>
          </div>
          <div className="flex items-center">
            <Clock className="h-4 w-4 mr-1" />
            <span>{course.duration || 0} dk</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Link to={`/courses/${course.id}`} className="w-full">
          <Button className="w-full bg-amber-500 hover:bg-amber-600 text-slate-100 text-base rounded-xl">
            Şimdi İzle
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
}
