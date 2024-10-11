import { useState, useEffect } from "react";
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Trash, UserX, MessageSquareX, Search } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  courses: number;
  comments: number;
}

interface Comment {
  id: number;
  userId: number;
  courseId: number;
  courseName: string;
  content: string;
}

interface UserGrowthData {
  date: string;
  students: number;
  instructors: number;
}

const initialUsers: User[] = [
  {
    id: 1,
    name: "Ali Yılmaz",
    email: "ali@example.com",
    role: "Öğrenci",
    courses: 3,
    comments: 10,
  },
  {
    id: 2,
    name: "Ayşe Kara",
    email: "ayse@example.com",
    role: "Eğitmen",
    courses: 2,
    comments: 5,
  },
  {
    id: 3,
    name: "Mehmet Demir",
    email: "mehmet@example.com",
    role: "Öğrenci",
    courses: 5,
    comments: 15,
  },
  {
    id: 4,
    name: "Fatma Şahin",
    email: "fatma@example.com",
    role: "Öğrenci",
    courses: 4,
    comments: 8,
  },
  {
    id: 5,
    name: "Ahmet Yıldız",
    email: "ahmet@example.com",
    role: "Eğitmen",
    courses: 3,
    comments: 12,
  },
];

const initialComments: Comment[] = [
  {
    id: 1,
    userId: 1,
    courseId: 1,
    courseName: "React Temelleri",
    content: "Harika bir kurs!",
  },
  {
    id: 2,
    userId: 3,
    courseId: 1,
    courseName: "React Temelleri",
    content: "Çok faydalı bilgiler var.",
  },
  {
    id: 3,
    userId: 4,
    courseId: 2,
    courseName: "Python ile Veri Analizi",
    content: "Biraz daha detay olabilirdi.",
  },
  {
    id: 4,
    userId: 1,
    courseId: 2,
    courseName: "Python ile Veri Analizi",
    content: "Eğitmen çok iyi anlatıyor.",
  },
  {
    id: 5,
    userId: 2,
    courseId: 3,
    courseName: "JavaScript İleri Seviye",
    content: "Teknik konular biraz karmaşık.",
  },
];

const userGrowthData: UserGrowthData[] = [
  { date: "2023-01", students: 100, instructors: 10 },
  { date: "2023-02", students: 150, instructors: 15 },
  { date: "2023-03", students: 200, instructors: 18 },
  { date: "2023-04", students: 280, instructors: 22 },
  { date: "2023-05", students: 350, instructors: 25 },
  { date: "2023-06", students: 400, instructors: 30 },
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8"];

export default function UserAnalyticsPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [comments, setComments] = useState<Comment[]>(initialComments);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isUserCommentsOpen, setIsUserCommentsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [filteredUsers, setFilteredUsers] = useState<User[]>(users);
  const [commentSearchTerm, setCommentSearchTerm] = useState("");

  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (roleFilter === "all" || user.role === roleFilter)
    );
    setFilteredUsers(filtered);
  }, [users, searchTerm, roleFilter]);

  const handleDeleteUser = (id: number) => {
    setUsers(users.filter((user) => user.id !== id));
    setComments(comments.filter((comment) => comment.userId !== id));
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
    if (selectedUser) {
      setSelectedUser({
        ...selectedUser,
        comments: selectedUser.comments - 1,
      });
      setUsers(
        users.map((user) =>
          user.id === selectedUser.id
            ? { ...user, comments: user.comments - 1 }
            : user
        )
      );
    }
  };

  const userRoleData = users.reduce((acc, user) => {
    acc[user.role] = (acc[user.role] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const pieChartData = Object.entries(userRoleData).map(([name, value]) => ({
    name,
    value,
  }));

  const filteredComments = comments
    .filter((comment) => comment.userId === selectedUser?.id)
    .filter(
      (comment) =>
        comment.content
          .toLowerCase()
          .includes(commentSearchTerm.toLowerCase()) ||
        comment.courseName
          .toLowerCase()
          .includes(commentSearchTerm.toLowerCase())
    );

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">
        Kullanıcı Analizleri ve Kontrol
      </h1>

      <div className="grid gap-6 mb-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Rolleri Dağılımı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieChartData.map((entry, index) => (
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

        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Sayısı Artışı</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="students"
                  stroke="#8884d8"
                  name="Öğrenciler"
                />
                <Line
                  type="monotone"
                  dataKey="instructors"
                  stroke="#82ca9d"
                  name="Eğitmenler"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Kullanıcı Listesi</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4 mb-4">
            <div className="flex-1 relative">
              <Input
                type="text"
                placeholder="Kullanıcı ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Rol seçin" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tümü</SelectItem>
                <SelectItem value="Öğrenci">Öğrenci</SelectItem>
                <SelectItem value="Eğitmen">Eğitmen</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>İsim</TableHead>
                <TableHead>E-posta</TableHead>
                <TableHead>Rol</TableHead>
                <TableHead>Kurs Sayısı</TableHead>
                <TableHead>Yorum Sayısı</TableHead>
                <TableHead>İşlemler</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.courses}</TableCell>
                  <TableCell>{user.comments}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-2"
                      onClick={() => {
                        setSelectedUser(user);
                        setIsUserCommentsOpen(true);
                      }}
                    >
                      <MessageSquareX className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteUser(user.id)}
                    >
                      <UserX className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Dialog open={isUserCommentsOpen} onOpenChange={setIsUserCommentsOpen}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>
              {selectedUser?.name} Kullanıcısının Yorumları
            </DialogTitle>
            <DialogDescription>
              Bu kullanıcının yaptığı yorumları görüntüleyin ve silin.
            </DialogDescription>
          </DialogHeader>
          <div className="mb-4 relative">
            <Input
              type="text"
              placeholder="Yorum veya kurs ara..."
              value={commentSearchTerm}
              onChange={(e) => setCommentSearchTerm(e.target.value)}
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          </div>
          <div className="max-h-[400px] overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Kurs</TableHead>
                  <TableHead>Yorum</TableHead>
                  <TableHead>İşlem</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredComments.map((comment) => (
                  <TableRow key={comment.id}>
                    <TableCell>{comment.courseName}</TableCell>
                    <TableCell>{comment.content}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteComment(comment.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <DialogFooter>
            <Button onClick={() => setIsUserCommentsOpen(false)}>Kapat</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
