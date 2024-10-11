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
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

// Bu veriyi gerçek bir API'den alacaksınız. Şimdilik örnek veri kullanıyoruz.
const courseData = {
  id: 1,
  title: "React Temelleri",
  instructor: "Ahmet Yılmaz",
  totalViews: 15000,
  averageRating: 4.7,
  totalReviews: 500,
  uploadDate: "2023-01-01",
  timeSeriesData: [
    {
      date: "2023-01-15",
      views: 1000,
      comments: 50,
      avgRating: 4.5,
      reviewers: 100,
    },
    {
      date: "2023-02-01",
      views: 3000,
      comments: 120,
      avgRating: 4.6,
      reviewers: 200,
    },
    {
      date: "2023-02-15",
      views: 6000,
      comments: 200,
      avgRating: 4.7,
      reviewers: 300,
    },
    {
      date: "2023-03-01",
      views: 10000,
      comments: 300,
      avgRating: 4.7,
      reviewers: 400,
    },
    {
      date: "2023-03-15",
      views: 15000,
      comments: 400,
      avgRating: 4.7,
      reviewers: 500,
    },
  ],
  topComments: [
    {
      id: 1,
      user: "Mehmet K.",
      comment: "Harika bir kurs, çok şey öğrendim!",
      likes: 50,
    },
    {
      id: 2,
      user: "Ayşe S.",
      comment: "Açıklamalar çok net, teşekkürler.",
      likes: 35,
    },
    {
      id: 3,
      user: "Ali R.",
      comment: "Biraz daha derinlemesine konular da olabilirdi.",
      likes: 20,
    },
  ],
};

export default function CourseAnalysisPage() {
  // Gerçek uygulamada, id'ye göre kurs verilerini çekeceksiniz
  // const { data: courseData, isLoading, error } = useCourseData(id)

  // if (isLoading) return <div>Yükleniyor...</div>
  // if (error) return <div>Bir hata oluştu: {error.message}</div>

  return (
    <main className="flex-1  lg:p-0 overflow-auto mb-10">
      <div className="lg:w-11/12 m-auto">
        <h1 className="text-3xl font-bold mb-6">{courseData.title} - Analiz</h1>

        <div className="grid gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam İzlenme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseData.totalViews}</div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Ortalama Puan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courseData.averageRating.toFixed(1)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Toplam Değerlendirme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {courseData.totalReviews}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Eğitmen</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{courseData.instructor}</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Zaman İçinde Kurs Performansı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart data={courseData.timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Legend />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="views"
                  stroke="#8884d8"
                  name="İzlenme Sayısı"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="comments"
                  stroke="#82ca9d"
                  name="Yorum Sayısı"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="avgRating"
                  stroke="#ffc658"
                  name="Ortalama Puan"
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="reviewers"
                  stroke="#ff7300"
                  name="Değerlendiren Kişi Sayısı"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>En Çok Beğenilen Yorumlar</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kullanıcı</TableHead>
                  <TableHead>Yorum</TableHead>
                  <TableHead>Beğeni Sayısı</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courseData.topComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell className="font-medium">
                      {comment.user}
                    </TableCell>
                    <TableCell>{comment.comment}</TableCell>
                    <TableCell>{comment.likes}</TableCell>
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
