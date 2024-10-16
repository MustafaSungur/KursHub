import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface InstructorInfoProps {
  instructor: {
    firstName: string;
    lastName: string;
    image: string;
  };
}

export default function InstructorInfo({ instructor }: InstructorInfoProps) {
  return (
    <div className="flex items-center">
      {instructor && (
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={instructor.image} alt={instructor.firstName} />
          <AvatarFallback>
            {instructor.firstName[0]} {instructor.lastName[0]}
          </AvatarFallback>
        </Avatar>
      )}

      <div>
        {instructor && (
          <h2 className="text-xl font-semibold">
            {instructor.firstName} {instructor.lastName}
          </h2>
        )}
        <p className="text-sm text-gray-500">Eğitmen</p>
      </div>
    </div>
  );
}
