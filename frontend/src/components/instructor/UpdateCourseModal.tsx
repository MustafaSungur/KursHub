import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Trash2 } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "../ui/textarea";

const subcategories = [
  "Web Geliştirme",
  "Mobil Uygulama",
  "Veri Bilimi",
  "Tasarım",
  "Pazarlama",
];
const tags = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX",
  "SEO",
];

interface Course {
  description: string | number | readonly string[] | undefined;
  id: number;
  title: string;
  subcategory: string;
  tags: string[];
  image: string;
  video: string;
}

interface EditCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onEdit: (course: Course) => void;
  course: Course | null;
}

export function UpdateCourseModal({
  isOpen,
  onClose,
  onEdit,
  course,
}: EditCourseModalProps) {
  const [editedCourse, setEditedCourse] = useState<Course | null>(course);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (course) {
      setEditedCourse(course);
      setImagePreview(course.image);
      setVideoPreview(course.video);
    }
  }, [course]);

  const handleEdit = () => {
    if (editedCourse) {
      onEdit(editedCourse);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleVideoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewVideo(file);
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  if (!course || !editedCourse) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col mx-auto">
        <DialogHeader>
          <DialogTitle>Eğitimi Düzenle</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto  ">
          <div className="space-y-4 px-1">
            <div>
              <Label htmlFor="edit-title">Eğitim Başlığı</Label>
              <Input
                id="edit-title"
                value={editedCourse.title}
                onChange={(e) =>
                  setEditedCourse({ ...editedCourse, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={editedCourse.description}
                onChange={(e) =>
                  setEditedCourse({
                    ...editedCourse,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="edit-subcategory">Alt Kategori</Label>
              <Select
                onValueChange={(value) =>
                  setEditedCourse({ ...editedCourse, subcategory: value })
                }
                defaultValue={editedCourse.subcategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alt kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {subcategories.map((sub) => (
                    <SelectItem key={sub} value={sub}>
                      {sub}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Etiketler (En az 1, en fazla 3)</Label>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <div key={tag} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-${tag}`}
                      checked={editedCourse.tags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked && editedCourse.tags.length < 3) {
                          setEditedCourse({
                            ...editedCourse,
                            tags: [...editedCourse.tags, tag],
                          });
                        } else if (!checked) {
                          setEditedCourse({
                            ...editedCourse,
                            tags: editedCourse.tags.filter((t) => t !== tag),
                          });
                        }
                      }}
                    />
                    <label htmlFor={`edit-${tag}`}>{tag}</label>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <Label htmlFor="edit-video">Yeni Video Yükle (Opsiyonel)</Label>
              <Input
                id="edit-video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {videoPreview && (
                <video
                  ref={videoRef}
                  src={videoPreview}
                  controls
                  className="w-full h-auto mt-2"
                />
              )}
            </div>
            <div>
              <Label htmlFor="edit-image">
                Yeni Küçük Resim Yükle (Opsiyonel)
              </Label>
              <Input
                id="edit-image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Eğitim küçük resmi"
                  className="w-full h-auto mt-2"
                />
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <div className="flex justify-between w-full">
            <Button
              onClick={handleEdit}
              className=" bg-amber-500 hover:bg-amber-600 text-white"
            >
              Değişiklikleri Kaydet
            </Button>
            <Button
              variant="destructive"
              onClick={() => onEdit({ ...editedCourse, id: -1 })}
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eğitimi Sil
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
