import React, { useState, useRef } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";

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

interface NewCourse {
  title: string;
  description: string;
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
    subcategory: "",
    tags: [],
    image: null,
    video: null,
  });
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleUpload = () => {
    onUpload(newCourse);
    setNewCourse({
      title: "",
      description: "",
      subcategory: "",
      tags: [],
      image: null,
      video: null,
    });
    setImagePreview(null);
    setVideoPreview(null);
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

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[800px] max-h-[80vh] flex flex-col ">
        <DialogHeader>
          <DialogTitle>Yeni Eğitim Yükle</DialogTitle>
        </DialogHeader>
        <ScrollArea className="flex-grow overflow-y-auto ">
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
              <Label htmlFor="subcategory">Alt Kategori</Label>
              <Select
                onValueChange={(value) =>
                  setNewCourse({ ...newCourse, subcategory: value })
                }
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
                      id={tag}
                      checked={newCourse.tags.includes(tag)}
                      onCheckedChange={(checked) => {
                        if (checked && newCourse.tags.length < 3) {
                          setNewCourse({
                            ...newCourse,
                            tags: [...newCourse.tags, tag],
                          });
                        } else if (!checked) {
                          setNewCourse({
                            ...newCourse,
                            tags: newCourse.tags.filter((t) => t !== tag),
                          });
                        }
                      }}
                    />
                    <label htmlFor={tag}>{tag}</label>
                  </div>
                ))}
              </div>
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
                  className="w-full h-auto mt-2"
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
                  className="w-full h-auto mt-2"
                />
              )}
            </div>
          </div>
        </ScrollArea>
        <DialogFooter className="mt-4">
          <Button
            className=" bg-amber-500 hover:bg-amber-600 text-white"
            onClick={handleUpload}
          >
            Eğitimi Yükle
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
