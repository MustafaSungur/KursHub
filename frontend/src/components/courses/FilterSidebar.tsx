import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

interface FilterSidebarProps {
  categories: any[];
  tags: any[];
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
  initialFilters: any;
}

export default function FilterSidebar({
  categories,
  tags,
  onFilterChange,
  onResetFilters,
  initialFilters,
}: FilterSidebarProps) {
  const [searchTerm, setSearchTerm] = useState(initialFilters.searchTerm || "");
  const [CategoryId, setCategoryId] = useState<number | null>(
    initialFilters.CategoryId || null
  );
  const [SubCategoryId, setSubCategoryId] = useState<number | null>(
    initialFilters.SubCategoryId || null
  );
  const [TopicId, setTopicId] = useState<number | null>(
    initialFilters.TopicId || null
  );
  const [TagIds, setTagIds] = useState<number[]>(initialFilters.TagIds || []);
  const [tagSearchTerm, setTagSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm(initialFilters.searchTerm || "");
    setCategoryId(initialFilters.CategoryId || null);
    setSubCategoryId(initialFilters.SubCategoryId || null);
    setTopicId(initialFilters.TopicId || null);
    setTagIds(initialFilters.TagIds || []);
  }, [initialFilters]);

  const handleApplyFilters = () => {
    console.log("Applying filters with TagIds:", TagIds); // Log TagIds for debugging
    onFilterChange({
      searchTerm,
      CategoryId,
      SubCategoryId,
      TopicId,
      TagIds,
    });
  };

  const handleTagToggle = (tag: string) => {
    const tagId = parseInt(tag, 10);
    setTagIds((prev) =>
      prev.includes(tagId) ? prev.filter((t) => t !== tagId) : [...prev, tagId]
    );
  };

  const handleResetFilters = () => {
    setSearchTerm("");
    setCategoryId(null);
    setSubCategoryId(null);
    setTopicId(null);
    setTagIds([]);
    setTagSearchTerm("");
    onResetFilters();
  };

  return (
    <aside className="w-72 bg-gray-100 p-4 hidden lg:block sticky top-14 h-screen overflow-y-auto mt-12">
      <div className="space-y-4">
        <Input
          placeholder="Kurs ara"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={CategoryId?.toString() || "all"}
          onValueChange={(value) =>
            setCategoryId(value === "all" ? null : parseInt(value, 10))
          }
        >
          <SelectTrigger>
            <SelectValue placeholder="Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Kategoriler</SelectItem>
            {categories &&
              categories.map((category) => (
                <SelectItem key={category.id} value={category.id.toString()}>
                  {category.name}
                </SelectItem>
              ))}
          </SelectContent>
        </Select>
        <Select
          value={SubCategoryId?.toString() || "all"}
          onValueChange={(value) =>
            setSubCategoryId(value === "all" ? null : parseInt(value, 10))
          }
          disabled={CategoryId === null}
        >
          <SelectTrigger>
            <SelectValue placeholder="Alt Kategori" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Alt Kategoriler</SelectItem>
            {categories &&
              categories
                .find((cat) => cat.id === CategoryId)
                ?.subCategories.$values.map((subCategory: any) => (
                  <SelectItem
                    key={subCategory.id}
                    value={subCategory.id.toString()}
                  >
                    {subCategory.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        <Select
          value={TopicId?.toString() || "all"}
          onValueChange={(value) =>
            setTopicId(value === "all" ? null : parseInt(value, 10))
          }
          disabled={SubCategoryId === null}
        >
          <SelectTrigger>
            <SelectValue placeholder="Konu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tüm Konular</SelectItem>
            {categories &&
              categories
                .find((cat) => cat.id === CategoryId)
                ?.subCategories.$values.find(
                  (subCat: any) => subCat.id === SubCategoryId
                )
                ?.topics.$values.map((topic: any) => (
                  <SelectItem key={topic.id} value={topic.id.toString()}>
                    {topic.name}
                  </SelectItem>
                ))}
          </SelectContent>
        </Select>
        <div className="space-y-2">
          <h3 className="font-semibold">Etiketler</h3>
          <Input
            placeholder="Etiket ara"
            type="search"
            value={tagSearchTerm}
            onChange={(e) => setTagSearchTerm(e.target.value)}
          />
          <div className="max-h-96 overflow-y-auto">
            {tags &&
              tags
                .filter((tag) =>
                  tag.name.toLowerCase().includes(tagSearchTerm.toLowerCase())
                )
                .map((tag) => (
                  <div
                    key={tag.id}
                    className="flex items-center space-x-2 py-1"
                  >
                    <Checkbox
                      id={tag.id.toString()}
                      checked={TagIds.includes(tag.id)}
                      onCheckedChange={() => handleTagToggle(tag.id.toString())}
                    />
                    <label
                      htmlFor={tag.id.toString()}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {tag.name}
                    </label>
                  </div>
                ))}
          </div>
        </div>
        <Button
          onClick={handleApplyFilters}
          className="w-full bg-amber-500 hover:bg-amber-600 rounded-xl"
        >
          Filtreleri Uygula
        </Button>
        <Button
          onClick={handleResetFilters}
          variant="outline"
          className="w-full rounded-xl"
        >
          Filtreleri Sıfırla
        </Button>
      </div>
    </aside>
  );
}
