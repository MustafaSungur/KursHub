import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import {
  fetchTopContents,
  filterContentsAction,
} from "@/app/features/content/contentActions";
import LoadingSpinner from "@/components/LoadingSpinner";
import ErrorMessage from "@/components/ErrorMessage";
import FilterSidebar from "@/components/courses/FilterSidebar";
import MobileFilters from "@/components/courses/MobileFilters";
import CourseList from "@/components/courses/CourseList";
import Pagination from "@/components/courses/Pagination";
import Footer from "@/components/Footer";
import { fetchAllCategories } from "@/app/features/category/categoryAction";
import { fetchAllTags } from "@/app/features/tag/tagAction";

export default function Courses() {
  const dispatch = useDispatch<AppDispatch>();
  const { contentLoading, contentError, contentData } = useSelector(
    (state: RootState) => state.content
  );

  const { categoryLoading, categoryError, categoryData } = useSelector(
    (state: RootState) => state.category
  );

  const { tagData } = useSelector((state: RootState) => state.tag);

  const [filters, setFilters] = useState(() => {
    const savedFilters = localStorage.getItem("courseFilters");
    return savedFilters ? JSON.parse(savedFilters) : {};
  });
  const [currentPage, setCurrentPage] = useState(() => {
    const savedPage = localStorage.getItem("coursePage");
    return savedPage ? parseInt(savedPage, 10) : 1;
  });
  const pageSize = 12;

  useEffect(() => {
    dispatch(fetchAllCategories());
    dispatch(fetchAllTags());
  }, []);

  useEffect(() => {
    // Fetch contents based on filters and page
    if (Object.keys(filters).length > 0) {
      dispatch(
        filterContentsAction({ ...filters, pageNumber: currentPage, pageSize })
      );
    } else {
      dispatch(fetchTopContents({ pageNumber: currentPage, pageSize }));
    }
  }, [filters, currentPage, dispatch, pageSize]);

  const handleFilterChange = (newFilters: any) => {
    console.log("handleFilterChange çalıştı");

    setFilters(newFilters);
    setCurrentPage(1);
    localStorage.setItem("courseFilters", JSON.stringify(newFilters));
    localStorage.setItem("coursePage", "1");
    console.log(newFilters);
    dispatch(filterContentsAction({ ...newFilters, pageNumber: 1, pageSize }));
  };

  const handlePageChange = (page: number) => {
    console.log("handlePageChange çalıştı");

    setCurrentPage(page);
    localStorage.setItem("coursePage", page.toString());
    if (Object.keys(filters).length > 0) {
      dispatch(
        filterContentsAction({ ...filters, pageNumber: page, pageSize })
      );
    } else {
      dispatch(fetchTopContents({ pageNumber: page, pageSize }));
    }
  };

  const handleResetFilters = () => {
    setFilters({});
    setCurrentPage(1);
    localStorage.removeItem("courseFilters");
    localStorage.setItem("coursePage", "1");
    dispatch(fetchTopContents({ pageNumber: 1, pageSize }));
  };

  if (contentLoading || categoryLoading) return <LoadingSpinner />;
  if (contentError) return <ErrorMessage message={contentError} />;
  if (categoryError) return <ErrorMessage message={categoryError} />;

  return (
    <div className="flex flex-col min-h-screen lg:w-11/12 mx-auto w-11/12">
      <main className="flex-1 flex">
        <FilterSidebar
          categories={categoryData?.$values || []}
          tags={tagData?.$values || []}
          onFilterChange={handleFilterChange}
          onResetFilters={handleResetFilters}
          initialFilters={filters}
        />
        <section className="flex-1 py-12 px-4 md:px-10">
          <div className="container mx-auto ">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-zinc-600">
              Eğitimleri Keşfet
            </h1>
            <MobileFilters
              categories={categoryData?.$values || []}
              tags={tagData?.$values || []}
              onFilterChange={handleFilterChange}
              onResetFilters={handleResetFilters}
              initialFilters={filters}
            />
            <CourseList courses={contentData?.$values || []} />
            {contentData?.$values?.length ? (
              <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(contentData?.$values.length / pageSize)}
                onPageChange={handlePageChange}
              />
            ) : (
              ""
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
