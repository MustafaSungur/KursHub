import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Star, ThumbsUp, Edit, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const course = {
  title: "React ile Modern Web Uygulamaları Geliştirme",
  description:
    "Bu kapsamlı kursta, React'in temellerinden ileri seviye konularına kadar her şeyi öğreneceksiniz. Hooks, state yönetimi, routing ve daha fazlasını pratik projelerle pekiştireceksiniz.",
  rating: 4.8,
  videoUrl: "https://www.youtube.com/embed/dQw4w9WgXcQ", // Örnek video URL'si
  instructor: {
    name: "Ayşe Yılmaz",
    avatar: "/placeholder.svg?height=50&width=50",
  },
};

const initialComments = [
  {
    id: 1,
    user: {
      name: "Mehmet Kaya",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    comment:
      "Harika bir kurs! Çok şey öğrendim ve projelerimde hemen uygulamaya başladım.",
    likes: 15,
    createdAt: "2023-06-15T10:30:00Z",
  },
  {
    id: 2,
    user: {
      name: "Zeynep Demir",
      avatar: "/placeholder.svg?height=40&width=40",
    },
    comment: "Anlatım çok akıcı ve konular detaylı işlenmiş. Teşekkürler!",
    likes: 8,
    createdAt: "2023-06-16T14:45:00Z",
    updateAt: "2023-06-16T14:45:00Z",
  },
];

export default function CourseDetail() {
  const [comments, setComments] = useState(initialComments);
  const [newComment, setNewComment] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentText, setEditedCommentText] = useState("");
  const [userRating, setUserRating] = useState(0);
  const [isRatingHovered, setIsRatingHovered] = useState(false);

  const handleRatingChange = (rating: number) => {
    setUserRating(rating);
    // Burada, gerçek bir uygulamada, derecelendirmeyi sunucuya gönderme işlemi yapılabilir
  };
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentObj = {
        id: comments.length + 1,
        user: {
          name: "Mevcut Kullanıcı", // Gerçek uygulamada oturum açmış kullanıcının bilgileri kullanılır
          avatar: "/placeholder.svg?height=40&width=40",
        },
        comment: newComment,
        likes: 0,
        createdAt: new Date().toISOString(),
      };
      setComments([...comments, newCommentObj]);
      setNewComment("");
    }
  };

  const handleEditComment = (id: number) => {
    const commentToEdit = comments.find((comment) => comment.id === id);
    if (commentToEdit) {
      setEditingCommentId(id);
      setEditedCommentText(commentToEdit.comment);
    }
  };

  const handleSaveEdit = () => {
    setComments(
      comments.map((comment) =>
        comment.id === editingCommentId
          ? { ...comment, comment: editedCommentText }
          : comment
      )
    );
    setEditingCommentId(null);
    setEditedCommentText("");
  };

  const handleDeleteComment = (id: number) => {
    setComments(comments.filter((comment) => comment.id !== id));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1 py-12 px-4 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="aspect-video mb-6">
            <iframe
              className="w-full h-full"
              src={course.videoUrl}
              title={course.title}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>

          <div className="flex items-center justify-between gap-10 mb-6">
            <div className="flex items-center">
              <Avatar className="h-12 w-12 mr-4">
                <AvatarImage
                  src={course.instructor.avatar}
                  alt={course.instructor.name}
                />
                <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-xl font-semibold">
                  {course.instructor.name}
                </h2>
                <p className="text-sm text-gray-500">Eğitmen</p>
              </div>

              <div className="flex items-center ml-10">
                <Dialog>
                  <DialogTrigger asChild>
                    <div className="flex items-center cursor-pointer">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-5 w-5 ${
                            i < Math.floor(course.rating)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        {course.rating.toFixed(1)}
                      </span>
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
                            star <= (isRatingHovered ? userRating : 0)
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                          onClick={() => handleRatingChange(star)}
                          onMouseEnter={() => {
                            setUserRating(star);
                            setIsRatingHovered(true);
                          }}
                          onMouseLeave={() => setIsRatingHovered(false)}
                        />
                      ))}
                    </div>
                    <Button
                      className=" bg-amber-500 hover:bg-amber-600"
                      onClick={() => {
                        /* Derecelendirmeyi kaydet */
                      }}
                    >
                      Değerlendir
                    </Button>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            <span className="text-sm text-gray-500">
              10.12.2021 Tarihinde Yüklendi
            </span>
          </div>

          <h1 className="text-3xl font-bold mb-4">{course.title}</h1>

          <p className="text-gray-700 mb-8">{course.description}</p>

          <Separator className="my-8" />

          <section>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">Yorum Ekle</h3>
              <Textarea
                maxLength={300}
                placeholder="Yorumunuzu buraya yazın..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <Button
                onClick={handleAddComment}
                className="bg-amber-500 hover:bg-amber-600 text-slate-100 rounded-xl"
              >
                Gönder
              </Button>
            </div>
            <h2 className="text-2xl font-semibold mb-6 mt-8">Yorumlar</h2>

            <div className="space-y-6 mb-8 ">
              {comments.map((comment) => (
                <div key={comment.id} className="flex space-x-4 pt-3">
                  <Avatar>
                    <AvatarImage
                      src={comment.user.avatar}
                      alt={comment.user.name}
                    />
                    <AvatarFallback>{comment.user.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span>
                        <h3 className="font-semibold inline-block">
                          {comment.user.name}
                        </h3>
                        <span className="text-sm text-gray-500 ml-2">
                          {comment.updateAt && "(Edited)"}
                        </span>
                      </span>
                      <span className="text-sm text-gray-500">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="mt-2">
                        <Textarea
                          maxLength={300}
                          value={editedCommentText}
                          onChange={(e) => setEditedCommentText(e.target.value)}
                          className="mb-2"
                        />
                        <Button
                          onClick={handleSaveEdit}
                          size="sm"
                          className="mr-2 bg-amber-500 hover:bg-amber-600 text-slate-100"
                        >
                          Kaydet
                        </Button>
                        <Button
                          onClick={() => setEditingCommentId(null)}
                          size="sm"
                          variant="outline"
                        >
                          İptal
                        </Button>
                      </div>
                    ) : (
                      <>
                        <div className=" p-2 mb-2 rounded-md">
                          <p className="text-gray-700 mt-1 w-full max-w-full max-h-20 overflow-hidden overflow-ellipsis whitespace-normal">
                            {comment.comment}
                          </p>
                        </div>

                        <div className="flex items-center mt-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700"
                          >
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            {comment.likes}
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-gray-700 ml-2"
                            onClick={() => handleEditComment(comment.id)}
                          >
                            <Edit className="h-4 w-4 mr-1" />
                            Düzenle
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-gray-500 hover:text-red-700 ml-2"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Sil
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
        <p className="text-xs text-gray-500">
          © 2024 KursHub. Tüm hakları saklıdır.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Kullanım Şartları
          </a>
          <a className="text-xs hover:underline underline-offset-4" href="#">
            Gizlilik
          </a>
        </nav>
      </footer>
    </div>
  );
}
