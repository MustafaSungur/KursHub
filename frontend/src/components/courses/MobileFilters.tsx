import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronUp, ChevronDown } from "lucide-react";

interface MobileFiltersProps {
  categories: any[];
  tags: any[];
  onFilterChange: (filters: any) => void;
  onResetFilters: () => void;
  initialFilters: any;
}

export default function MobileFilters({
  categories,
  tags,
  onFilterChange,
  onResetFilters,
  initialFilters,
}: MobileFiltersProps) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
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
    <div className="lg:hidden mb-4">
      <Collapsible open={isFiltersOpen} onOpenChange={setIsFiltersOpen}>
        <CollapsibleTrigger asChild>
          <Button
            variant="outline"
            className="w-full flex justify-between items-center"
          >
            Filtreler
            {isFiltersOpen ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </CollapsibleTrigger>
        <CollapsibleContent className="mt-2 space-y-2">
          <Input
            placeholder="Eğitim ara"
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
            <div className="max-h-60 overflow-y-auto">
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
                        id={`mobile-${tag.id}`}
                        checked={TagIds.includes(tag.id)}
                        onCheckedChange={() =>
                          handleTagToggle(tag.id.toString())
                        }
                      />
                      <label
                        htmlFor={`mobile-${tag.id}`}
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
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
