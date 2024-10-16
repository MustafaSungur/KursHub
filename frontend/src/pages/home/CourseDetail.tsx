import { useEffect, useState } from "react";
import { Separator } from "@/components/ui/separator";

import Footer from "@/components/Footer";
import VideoPlayer from "@/components/courseDetails/VideoPlayer";
import InstructorInfo from "@/components/courseDetails/InstructorInfo";
import CourseInfo from "@/components/courseDetails/CourseInfo";
import CommentSection from "@/components/courseDetails/CommentSection";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/app/store";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import { fetchContentById } from "@/app/features/content/contentActions";
import { useParams } from "react-router-dom";

export default function CourseDetail() {
  const { id } = useParams();
  const contentId = Number(id);
  const dispatch = useDispatch<AppDispatch>();
  const { userInfo } = useSelector((state: any) => state.auth);
  const { contentData, contentLoading, contentError } = useSelector(
    (state: any) => state.content
  );

  useEffect(() => {
    dispatch(fetchContentById(contentId));
  }, []);

  console.log(contentData);
  if (contentLoading) {
    return <LoadingSpinner />;
  }
  if (contentError) {
    return <ErrorMessage message={contentError} />;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <VideoPlayer videoUrl={contentData.videoUrl} />
          <div className="flex items-center justify-between gap-10 mb-6 mt-4">
            <InstructorInfo instructor={contentData.createdUser} />
            <span className="text-sm text-gray-500">
              {new Date(contentData.createdDate).toLocaleDateString("tr-TR", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
              })}{" "}
              Tarihinde Yüklendi
            </span>
          </div>
          <CourseInfo
            title={contentData.title}
            description={contentData.description}
            rating={contentData.rating}
            ratingCount={contentData.ratingCount}
            contentId={contentId}
            tags={
              (contentData.contentTags && contentData.contentTags.$values) || []
            }
          />

          <Separator className="my-8" />
          <CommentSection contentId={contentId} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
