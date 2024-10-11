import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
import { Trash2, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";

const categories: { [key: string]: string[] } = {
  "Web Geliştirme": ["Frontend", "Backend"],
  "Mobil Uygulama": ["Cross", "Native"],
  "Veri Bilimi": ["Yapay Sinir Ağları", "Makine Öğrenimi"],
};

const allTags = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX",
  "SEO",
  "HTML",
  "CSS",
  "TypeScript",
  "Vue.js",
  "Angular",
  "Django",
  "Flask",
  "TensorFlow",
  "Figma",
  "Adobe XD",
  "Content Marketing",
  "Social Media Marketing",
  "Email Marketing",
];

interface Course {
  id: number;
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  image: string;
  video: string;
}

interface UpdateCourseModalProps {
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
}: UpdateCourseModalProps) {
  const [editedCourse, setEditedCourse] = useState<Course | null>(course);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [newVideo, setNewVideo] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [tagInput, setTagInput] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (course) {
      setEditedCourse(course);
      setImagePreview(course.image);
      setVideoPreview(course.video);
    }
  }, [course]);

  useEffect(() => {
    if (tagInput && editedCourse) {
      const filtered = allTags.filter(
        (tag) =>
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !editedCourse.tags.includes(tag)
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  }, [tagInput, editedCourse]);

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

  const addTag = (tag: string) => {
    if (
      editedCourse &&
      editedCourse.tags.length < 3 &&
      !editedCourse.tags.includes(tag)
    ) {
      setEditedCourse({ ...editedCourse, tags: [...editedCourse.tags, tag] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    if (editedCourse) {
      setEditedCourse({
        ...editedCourse,
        tags: editedCourse.tags.filter((t) => t !== tag),
      });
    }
  };

  if (!course || !editedCourse) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col mx-auto overflow-hidden">
        <DialogHeader>
          <DialogTitle>Eğitimi Düzenle</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto">
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
              {/* Kategori Seçimi (Update Modu) */}
              <Label htmlFor="edit-category">Kategori</Label>
              <Select
                onValueChange={(value) => {
                  // Kategori değiştirildiğinde alt kategoriyi sıfırlıyoruz
                  setEditedCourse({
                    ...editedCourse,
                    category: value,
                    subcategory: "",
                  });
                }}
                defaultValue={editedCourse.category} // Mevcut kategori seçili hale gelir
              >
                <SelectTrigger>
                  <SelectValue placeholder="Kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(categories).map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="edit-subcategory">Alt Kategori</Label>
              <Select
                onValueChange={(value) =>
                  setEditedCourse({ ...editedCourse, subcategory: value })
                }
                defaultValue={editedCourse.subcategory} // Mevcut alt kategori seçili hale gelir
                disabled={!editedCourse.category} // Kategori seçilmeden alt kategori seçilemez
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alt kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {editedCourse.category &&
                    categories[editedCourse.category].map((sub) => (
                      <SelectItem key={sub} value={sub}>
                        {sub}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="tags">Etiketler (En az 1, en fazla 3)</Label>
              <motion.div layout className="flex flex-wrap gap-2 mb-2">
                <AnimatePresence>
                  {editedCourse.tags.map((tag) => (
                    <motion.div
                      key={tag}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Badge variant="secondary">
                        {tag}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="ml-1 p-0 h-auto rounded-xl"
                          onClick={() => removeTag(tag)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </Badge>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
              <div className="relative">
                <Input
                  id="tags"
                  placeholder="Etiket ekleyin"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  maxLength={500}
                />
                <span className="absolute right-2 bottom-2 text-xs text-gray-400">
                  {tagInput.length}/500
                </span>
              </div>
              <AnimatePresence>
                {filteredTags.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                    className="mt-2 p-2 bg-gray-100 rounded-md overflow-hidden"
                  >
                    {filteredTags.map((tag) => (
                      <Button
                        key={tag}
                        variant="ghost"
                        size="sm"
                        onClick={() => addTag(tag)}
                        className="mr-2 mb-2 hover:bg-gray-300 bg-gray-200 rounded-xl"
                      >
                        {tag}
                      </Button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
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
                <motion.video
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  ref={videoRef}
                  src={videoPreview}
                  controls
                  className="w-auto h-64 mt-2"
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
                <motion.img
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                  src={imagePreview}
                  alt="Eğitim küçük resmi"
                  className="w-auto h-64 mt-2"
                />
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <div className="flex justify-between w-full">
            <Button
              onClick={handleEdit}
              className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
            >
              Değişiklikleri Kaydet
            </Button>
            <Button
              variant="destructive"
              onClick={() => onEdit({ ...editedCourse, id: -1 })}
              className="rounded-xl"
            >
              <Trash2 className="mr-2 h-4 w-4" /> Eğitimi Sil
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
