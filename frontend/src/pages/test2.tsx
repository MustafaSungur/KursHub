import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const categories = [
  {
    id: 1,
    name: "Programlama",
    subcategories: ["Web Geliştirme", "Mobil Uygulama", "Oyun Geliştirme"],
  },
  {
    id: 2,
    name: "Veri Bilimi",
    subcategories: ["Makine Öğrenmesi", "Veri Analizi", "Büyük Veri"],
  },
  {
    id: 3,
    name: "Tasarım",
    subcategories: ["UI/UX", "Grafik Tasarım", "3D Modelleme"],
  },
];

export default function Test2() {
  const [selectedValue, setSelectedValue] = useState("");

  return (
    <div className="mb-4">
      <Select onValueChange={setSelectedValue} value={selectedValue}>
        <SelectTrigger className="w-[280px]">
          <SelectValue placeholder="Kategori veya alt kategori seçin" />
        </SelectTrigger>
        <SelectContent>
          {categories.map((category) => (
            <SelectGroup key={category.id}>
              <SelectLabel>{category.name}</SelectLabel>
              {category.subcategories.map((sub) => (
                <SelectItem
                  key={`${category.id}-${sub}`}
                  value={`${category.name}:${sub}`}
                >
                  {sub}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
