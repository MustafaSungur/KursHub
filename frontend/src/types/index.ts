// types/index.ts

export interface Course {
  id: number;
  title: string;
  description: string;
  subcategory: string;
  tags: string[];
  image: File | null | string;
  video: File | null;
}

export const subcategories = [
  "Web Geliştirme",
  "Mobil Uygulama",
  "Veri Bilimi",
  "Tasarım",
  "Pazarlama",
];

export const tags = [
  "JavaScript",
  "React",
  "Node.js",
  "Python",
  "Machine Learning",
  "UI/UX",
  "SEO",
];
