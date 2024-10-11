import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, Search, BookOpen, Eye, Star, Users } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface Course {
  id: number;
  title: string;
  instructor: string;
  category: string;
  subCategory: string;
  comments: number;
  rating: number;
  raters: number;
  views: number;
}

interface CategoryData {
  name: string;
  courses: number;
  views: number;
}

interface CourseGrowthData {
  date: string;
  courses: number;
}

const initialCourses: Course[] = [
  {
    id: 1,
    title: "React Temelleri",
    instructor: "Ahmet Yılmaz",
    category: "Programlama",
    subCategory: "Web Geliştirme",
    comments: 150,
    rating: 4.5,
    raters: 120,
    views: 1500,
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    instructor: "Ayşe Kara",
    category: "Veri Bilimi",
    subCategory: "Veri Analizi",
    comments: 100,
    rating: 4.7,
    raters: 80,
    views: 1200,
  },
  {
    id: 3,
    title: "JavaScript İleri Seviye",
    instructor: "Mehmet Demir",
    category: "Programlama",
    subCategory: "Web Geliştirme",
    comments: 80,
    rating: 4.3,
    raters: 60,
    views: 900,
  },
  {
    id: 4,
    title: "Machine Learning Temelleri",
    instructor: "Fatma Şahin",
    category: "Veri Bilimi",
    subCategory: "Yapay Zeka",
    comments: 120,
    rating: 4.6,
    raters: 100,
    views: 1300,
  },
  {
    id: 5,
    title: "UI/UX Tasarım Prensipleri",
    instructor: "Can Yıldız",
    category: "Tasarım",
    subCategory: "UI/UX",
    comments: 90,
    rating: 4.4,
    raters: 70,
    views: 1000,
  },
];

const categoryData: CategoryData[] = [
  { name: "Programlama", courses: 2, views: 2400 },
  { name: "Veri Bilimi", courses: 2, views: 2500 },
  { name: "Tasarım", courses: 1, views: 1000 },
];

const courseGrowthData: CourseGrowthData[] = [
  { date: "2023-01", courses: 10 },
  { date: "2023-02", courses: 15 },
  { date: "2023-03", courses: 22 },
  { date: "2023-04", courses: 28 },
  { date: "2023-05", courses: 35 },
  { date: "2023-06", courses: 42 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function EducationManagement() {
  const [courses, setCourses] = useState<Course[]>(initialCourses);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [filteredCourses, setFilteredCourses] = useState<Course[]>(courses);

  const categories = Array.from(
    new Set(courses.map((course) => course.category))
  );
  const subCategories = Array.from(
    new Set(
      courses
        .filter(
          (course) =>
            categoryFilter === "all" || course.category === categoryFilter
        )
        .map((course) => course.subCategory)
    )
  );

  useEffect(() => {
    const filtered = courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || course.category === categoryFilter) &&
        (subCategoryFilter === "all" ||
          course.subCategory === subCategoryFilter)
    );
    setFilteredCourses(filtered);
  }, [courses, searchTerm, categoryFilter, subCategoryFilter]);

  useEffect(() => {
    setSubCategoryFilter("all");
  }, [categoryFilter]);

  const handleDeleteCourse = (id: number) => {
    setCourses(courses.filter((course) => course.id !== id));
  };

  const totalCourses = courses.length;
  const totalViews = courses.reduce((sum, course) => sum + course.views, 0);
  const totalRaters = courses.reduce((sum, course) => sum + course.raters, 0);
  const averageRating =
    courses.reduce((sum, course) => sum + course.rating, 0) / courses.length;

  return (
    <div className="lg:h-screen lg:w-10/12 mx-auto overflow-auto pb-10 p-5">
      <h1 className="text-3xl font-bold mb-6">Eğitim Yönetimi</h1>

      <div className="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Toplam Eğitim</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCourses}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Toplam İzlenme
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalViews}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Değerlendiren Sayısı
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalRaters}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Ortalama Değerlendirme
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{averageRating.toFixed(2)}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kategorilere Göre Eğitim Sayısı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="courses" fill="#8884d8" name="Eğitim Sayısı" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kategorilere Göre İzlenme</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="views"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {categoryData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Eğitim Sayısı Artışı</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={courseGrowthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="courses"
                stroke="#8884d8"
                name="Eğitim Sayısı"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Eğitim Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 mb-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Eğitim ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={subCategoryFilter}
              onValueChange={setSubCategoryFilter}
              disabled={categoryFilter === "all"}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Alt kategori seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Alt Kategoriler</SelectItem>
                {subCategories.map((subCategory) => (
                  <SelectItem key={subCategory} value={subCategory}>
                    {subCategory}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Eğitim Adı</TableHead>
                <TableHead>Eğitmen</TableHead>
                <TableHead>Yorum Sayısı</TableHead>
                <TableHead>Değerlendirme</TableHead>
                <TableHead>Değerlendiren Sayısı</TableHead>
                <TableHead>İzlenme Sayısı</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell>{course.title}</TableCell>
                  <TableCell>{course.instructor}</TableCell>
                  <TableCell>{course.comments}</TableCell>
                  <TableCell>{course.rating.toFixed(1)}</TableCell>
                  <TableCell>{course.raters}</TableCell>
                  <TableCell>{course.views}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteCourse(course.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
