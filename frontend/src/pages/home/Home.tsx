import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CallToAction from "@/components/home/CallToAction";
import WhyKursHub from "@/components/home/WhyKursHub";
import FeaturedCourses from "@/components/home/FeaturedCourses";
import HeroSection from "@/components/home/HeroSection";
import Footer from "@/components/Footer";
import { AppDispatch, RootState } from "@/app/store";
import { fetchTopContents } from "@/app/features/content/contentActions";

export default function Home() {
  const dispatch = useDispatch<AppDispatch>();
  const { contentLoading, contentError, contentData } = useSelector(
    (state: RootState) => state.content
  );

  useEffect(() => {
    dispatch(fetchTopContents({ pageNumber: 1, pageSize: 6 }));
  }, [dispatch]);

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <HeroSection />
        <FeaturedCourses
          courses={contentData}
          loading={contentLoading}
          error={contentError}
        />
        <WhyKursHub />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}
