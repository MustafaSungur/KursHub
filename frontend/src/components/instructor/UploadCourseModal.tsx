import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

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

interface NewCourse {
  title: string;
  description: string;
  category: string;
  subcategory: string;
  tags: string[];
  image: File | null;
  video: File | null;
}

interface UploadCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (course: NewCourse) => void;
}

export function UploadCourseModal({
  isOpen,
  onClose,
  onUpload,
}: UploadCourseModalProps) {
  const [newCourse, setNewCourse] = useState<NewCourse>({
    title: "",
    description: "",
    category: "",
    subcategory: "",
    tags: [],
    image: null,
    video: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [tagInput, setTagInput] = useState("");
  const [filteredTags, setFilteredTags] = useState<string[]>([]);

  useEffect(() => {
    if (tagInput) {
      const filtered = allTags.filter(
        (tag) =>
          tag.toLowerCase().includes(tagInput.toLowerCase()) &&
          !newCourse.tags.includes(tag)
      );
      setFilteredTags(filtered);
    } else {
      setFilteredTags([]);
    }
  }, [tagInput, newCourse.tags]);

  const handleUpload = () => {
    onUpload(newCourse);
    setNewCourse({
      title: "",
      description: "",
      category: "",
      subcategory: "",
      tags: [],
      image: null,
      video: null,
    });
    setImagePreview(null);
    setVideoPreview(null);
    setTagInput("");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setNewCourse({ ...newCourse, image: file });
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
      setNewCourse({ ...newCourse, video: file });
      const url = URL.createObjectURL(file);
      setVideoPreview(url);
    }
  };

  const addTag = (tag: string) => {
    if (newCourse.tags.length < 3 && !newCourse.tags.includes(tag)) {
      setNewCourse({ ...newCourse, tags: [...newCourse.tags, tag] });
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setNewCourse({
      ...newCourse,
      tags: newCourse.tags.filter((t) => t !== tag),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle>Yeni Eğitim Yükle</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto">
          <div className="space-y-4 px-1">
            <div>
              <Label htmlFor="title">Eğitim Başlığı</Label>
              <Input
                id="title"
                value={newCourse.title}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, title: e.target.value })
                }
              />
            </div>
            <div>
              <Label htmlFor="description">Açıklama</Label>
              <Textarea
                id="description"
                value={newCourse.description}
                onChange={(e) =>
                  setNewCourse({ ...newCourse, description: e.target.value })
                }
              />
            </div>
            <div>
              {/* Kategori Seçimi */}
              <Label htmlFor="category">Kategori</Label>
              <Select
                onValueChange={(value) => {
                  setNewCourse({
                    ...newCourse,
                    category: value,
                    subcategory: "",
                  });
                }}
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
            {/* Alt Kategori Seçimi */}
            <div>
              <Label htmlFor="subcategory">Alt Kategori</Label>
              <Select
                disabled={!newCourse.category} // Kategori seçilmediyse devre dışı
                onValueChange={(value) =>
                  setNewCourse({ ...newCourse, subcategory: value })
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Alt kategori seçin" />
                </SelectTrigger>
                <SelectContent>
                  {newCourse.category &&
                    categories[newCourse.category].map((subcat) => (
                      <SelectItem key={subcat} value={subcat}>
                        {subcat}
                      </SelectItem>
                    ))}
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="tags">Etiketler (En az 1, en fazla 3)</Label>
              <motion.div layout className="flex flex-wrap gap-2 mb-2">
                <AnimatePresence>
                  {newCourse.tags.map((tag) => (
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
              <Label htmlFor="video">Video Yükle</Label>
              <Input
                id="video"
                type="file"
                accept="video/*"
                onChange={handleVideoChange}
              />
              {videoPreview && (
                <video
                  ref={videoRef}
                  src={videoPreview}
                  controls
                  className="w-auto h-64 mt-2"
                />
              )}
            </div>
            <div>
              <Label htmlFor="image">Küçük Resim Yükle</Label>
              <Input
                id="image"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
              {imagePreview && (
                <img
                  src={imagePreview}
                  alt="Eğitim küçük resmi"
                  className="w-auto h-64 mt-2"
                />
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button
            className="bg-amber-500 hover:bg-amber-600 text-white rounded-xl"
            onClick={handleUpload}
          >
            Eğitimi Yükle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
