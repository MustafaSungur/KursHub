import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface CourseAnalytics {
  id: number;
  title: string;
  views: number;
  rating: number;
  ratingCount: number;
  commentCount: number;
}

const courseAnalytics: CourseAnalytics[] = [
  {
    id: 1,
    title: "React Temelleri",
    views: 1500,
    rating: 4.7,
    ratingCount: 120,
    commentCount: 45,
  },
  {
    id: 2,
    title: "Python ile Veri Analizi",
    views: 2200,
    rating: 4.9,
    ratingCount: 180,
    commentCount: 72,
  },
  {
    id: 3,
    title: "UI/UX Tasarım Prensipleri",
    views: 1800,
    rating: 4.5,
    ratingCount: 95,
    commentCount: 38,
  },
  {
    id: 4,
    title: "JavaScript İleri Seviye",
    views: 1200,
    rating: 4.6,
    ratingCount: 85,
    commentCount: 30,
  },
  {
    id: 5,
    title: "Machine Learning Giriş",
    views: 2500,
    rating: 4.8,
    ratingCount: 200,
    commentCount: 90,
  },
];

const timeSeriesData = [
  {
    month: "Ocak",
    totalViews: 2000,
    avgRating: 4.5,
    totalRatings: 150,
    totalComments: 60,
  },
  {
    month: "Şubat",
    totalViews: 3500,
    avgRating: 4.6,
    totalRatings: 280,
    totalComments: 110,
  },
  {
    month: "Mart",
    totalViews: 5000,
    avgRating: 4.7,
    totalRatings: 420,
    totalComments: 170,
  },
  {
    month: "Nisan",
    totalViews: 7200,
    avgRating: 4.8,
    totalRatings: 580,
    totalComments: 240,
  },
  {
    month: "Mayıs",
    totalViews: 9200,
    avgRating: 4.8,
    totalRatings: 680,
    totalComments: 275,
  },
];

export default function AnalysisPage() {
  const totalViews = courseAnalytics.reduce(
    (sum, course) => sum + course.views,
    0
  );
  const averageRating = (
    courseAnalytics.reduce((sum, course) => sum + course.rating, 0) /
    courseAnalytics.length
  ).toFixed(1);
  const totalComments = courseAnalytics.reduce(
    (sum, course) => sum + course.commentCount,
    0
  );
  const totalRatings = courseAnalytics.reduce(
    (sum, course) => sum + course.ratingCount,
    0
  );

  return (
    <main className="flex-1 p-4 lg:p-5 overflow-auto">
      <div className="lg:w-11/12 mx-auto mb-10">
        <h1 className="text-2xl lg:text-3xl font-bold mb-6">
          Eğitim Analizleri
        </h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam İzlenme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ortalama Puan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageRating}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Yorum
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalComments}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Değerlendirme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalRatings}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Eğitim Metrikleri Karşılaştırması</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={courseAnalytics}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="title" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Bar
                  yAxisId="left"
                  dataKey="views"
                  fill="#8884d8"
                  name="İzlenme Sayısı"
                />
                <Bar
                  yAxisId="right"
                  dataKey="rating"
                  fill="#82ca9d"
                  name="Ortalama Puan"
                />
                <Bar
                  yAxisId="left"
                  dataKey="commentCount"
                  fill="#ffc658"
                  name="Yorum Sayısı"
                />
                <Bar
                  yAxisId="left"
                  dataKey="ratingCount"
                  fill="#ff8042"
                  name="Değerlendirme Sayısı"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zaman İçinde Toplam Metrikler</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalViews"
                  stroke="#8884d8"
                  name="Toplam İzlenme"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#82ca9d"
                  name="Ortalama Puan"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalRatings"
                  stroke="#ffc658"
                  name="Toplam Değerlendirme"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="totalComments"
                  stroke="#ff8042"
                  name="Toplam Yorum"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Eğitim Detayları</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Eğitim Adı</TableHead>
                  <TableHead>İzlenme</TableHead>
                  <TableHead>Puan</TableHead>
                  <TableHead>Değerlendirme Sayısı</TableHead>
                  <TableHead>Yorum Sayısı</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseAnalytics.map((course) => (
                  <TableRow key={course.id}>
                    <TableCell className="font-medium">
                      {course.title}
                    </TableCell>
                    <TableCell>{course.views}</TableCell>
                    <TableCell>{course.rating.toFixed(1)}</TableCell>
                    <TableCell>{course.ratingCount}</TableCell>
                    <TableCell>{course.commentCount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
