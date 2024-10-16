import { useState } from "react";
import { Star } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { fetchContentById } from "@/app/features/content/contentActions";
import { AppDispatch } from "@/app/store";
import { createRatingAction } from "@/app/features/rating/ratingAction";

interface CourseInfoProps {
  title: string;
  description: string;
  rating: number;
  ratingCount: number;
  tags: [];
  contentId: number;
}

export default function CourseInfo({
  title,
  description,
  rating,
  ratingCount,
  tags,
  contentId,
}: CourseInfoProps) {
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: any) => state.auth);
  const [userRating, setUserRating] = useState(0); // Selected rating
  const [hoveredRating, setHoveredRating] = useState(0); // Hovered rating

  const handleRatingChange = (ratingValue: number) => {
    setUserRating(ratingValue);
    setHoveredRating(0); // Reset hover when clicked
  };

  const handleSubmitRating = () => {
    if (userRating > 0 && userInfo?.userID) {
      dispatch(
        createRatingAction({
          contentId,
          userId: userInfo.userID,
          rating: userRating,
        })
      ).then(() => {
        dispatch(fetchContentById(contentId)); // Refetch course data to update rating
      });
    }
  };

  return (
    <>
      <div className="flex items-center gap-7">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center cursor-pointer">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < Math.floor(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
              <span className="ml-2 text-sm text-gray-600 mr-2">{rating}</span>
              <span className="text-bold">({ratingCount})</span>
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
                    star <= (hoveredRating || userRating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  }`}
                  onClick={() => handleRatingChange(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                />
              ))}
            </div>
            <Button
              className="bg-amber-500 hover:bg-amber-600 mt-4"
              onClick={handleSubmitRating}
            >
              Değerlendir
            </Button>
          </DialogContent>
        </Dialog>
        <div className="flex gap-3">
          {tags.map((tag: any, index) => (
            <span
              key={index}
              className="bg-amber-500 px-3 rounded-xl text-white"
            >
              {tag.tagName}
            </span>
          ))}
        </div>
      </div>
      <h1 className="text-3xl font-bold my-4">{title}</h1>
      <p className="text-gray-700 mb-8">{description}</p>
    </>
  );
}
