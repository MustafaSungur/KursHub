import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Users,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  BookOpen,
} from "lucide-react";
import { Link } from "react-router-dom";

const courses = [
  {
    id: 1,
    title: "React'e Giriş",
    description:
      "React'in temellerini öğrenin ve modern web uygulamaları oluşturun.",
    instructor: "Ayşe Yılmaz",
    students: 1234,
    rating: 4.8,
    duration: "10 saat",
    category: "Web Geliştirme",
    subCategory: "Frontend",
    topics: ["JavaScript", "React", "Frontend"],
    image:
      "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 2,
    title: "İleri Seviye JavaScript Teknikleri",
    description: "JavaScript programlamada ileri düzey kavramları öğrenin.",
    instructor: "Mehmet Kaya",
    students: 987,
    rating: 4.9,
    duration: "15 saat",
    category: "Programlama",
    subCategory: "JavaScript",
    topics: ["JavaScript", "ES6+", "Algoritmalar"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 3,
    title: "UI/UX Tasarım Temelleri",
    description: "Güzel ve işlevsel kullanıcı arayüzleri oluşturun.",
    instructor: "Zeynep Demir",
    students: 2345,
    rating: 4.7,
    duration: "12 saat",
    category: "Tasarım",
    subCategory: "UI/UX",
    topics: ["UI", "UX", "Figma"],
    image:
      "https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  },
  {
    id: 4,
    title: "Python ile Veri Bilimi",
    description: "Python kullanarak veri analizi ve makine öğrenimi keşfedin.",
    instructor: "Ali Öztürk",
    students: 1876,
    rating: 4.6,
    duration: "20 saat",
    category: "Veri Bilimi",
    subCategory: "Makine Öğrenimi",
    topics: ["Python", "Makine Öğrenimi", "İstatistik"],
    image: "/placeholder.svg?height=400&width=600",
  },

  {
    id: 5,
    title: "Flutter ile Mobil Uygulama Geliştirme",
    description:
      "Flutter framework ile çapraz platform mobil uygulamalar oluşturun.",
    instructor: "Elif Yıldız",
    students: 1543,
    rating: 4.8,
    duration: "18 saat",
    category: "Mobil Geliştirme",
    topics: ["Flutter", "Dart", "Mobil"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 6,
    title: "DevOps Temelleri",
    description: "DevOps uygulamalarının prensiplerini ve araçlarını öğrenin.",
    instructor: "Mustafa Şahin",
    students: 987,
    rating: 4.7,
    duration: "14 saat",
    category: "DevOps",
    topics: ["CI/CD", "Docker", "Kubernetes"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 7,
    title: "Veri Yapıları ve Algoritmalar",
    description: "Temel veri yapılarını ve algoritmaları öğrenin.",
    instructor: "Ahmet Yılmaz",
    students: 2100,
    rating: 4.9,
    duration: "25 saat",
    category: "Programlama",
    topics: ["Veri Yapıları", "Algoritmalar", "Problem Çözme"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 8,
    title: "Makine Öğrenimi Temelleri",
    description:
      "Makine öğreniminin temel kavramlarını ve uygulamalarını keşfedin.",
    instructor: "Selin Kaya",
    students: 1890,
    rating: 4.7,
    duration: "30 saat",
    category: "Veri Bilimi",
    topics: ["Makine Öğrenimi", "Python", "Veri Analizi"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 9,
    title: "Web Güvenliği",
    description:
      "Web uygulamalarında güvenlik açıklarını tespit etmeyi ve önlemeyi öğrenin.",
    instructor: "Emre Demir",
    students: 1560,
    rating: 4.8,
    duration: "20 saat",
    category: "Siber Güvenlik",
    topics: ["Web Güvenliği", "Etik Hacking", "Güvenlik Testleri"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 10,
    title: "Blokzincir ve Kripto Para",
    description:
      "Blokzincir teknolojisini ve kripto para sistemlerini anlayın.",
    instructor: "Canan Yıldırım",
    students: 1320,
    rating: 4.6,
    duration: "22 saat",
    category: "Blokzincir",
    topics: ["Blokzincir", "Kripto Para", "Akıllı Kontratlar"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 11,
    title: "Oyun Geliştirme ile Unity",
    description: "Unity oyun motoru ile 2D ve 3D oyunlar geliştirin.",
    instructor: "Burak Özdemir",
    students: 2200,
    rating: 4.9,
    duration: "35 saat",
    category: "Oyun Geliştirme",
    topics: ["Unity", "C#", "Oyun Tasarımı"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 12,
    title: "Doğal Dil İşleme",
    description:
      "Metin verilerini analiz etmek ve anlamak için NLP tekniklerini öğrenin.",
    instructor: "Deniz Yılmaz",
    students: 1100,
    rating: 4.7,
    duration: "28 saat",
    category: "Yapay Zeka",
    topics: ["NLP", "Python", "Metin Madenciliği"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 13,
    title: "Bulut Bilişim ve AWS",
    description:
      "AWS hizmetlerini kullanarak bulut tabanlı uygulamalar geliştirin.",
    instructor: "Cem Karaca",
    students: 1750,
    rating: 4.8,
    duration: "25 saat",
    category: "Bulut Bilişim",
    topics: ["AWS", "Bulut Mimarisi", "Sunucusuz Bilişim"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 14,
    title: "Büyük Veri Analizi",
    description:
      "Büyük veri setlerini işlemek ve analiz etmek için araçları ve teknikleri öğrenin.",
    instructor: "Aylin Çelik",
    students: 980,
    rating: 4.6,
    duration: "32 saat",
    category: "Veri Bilimi",
    topics: ["Hadoop", "Spark", "Büyük Veri"],
    image: "/placeholder.svg?height=400&width=600",
  },
  {
    id: 15,
    title: "İleri Seviye React ve Redux",
    description:
      "Karmaşık React uygulamaları geliştirmek için ileri düzey teknikleri öğrenin.",
    instructor: "Kemal Yıldız",
    students: 1630,
    rating: 4.9,
    duration: "28 saat",
    category: "Web Geliştirme",
    topics: ["React", "Redux", "Hooks"],
    image: "/placeholder.svg?height=400&width=600",
  },
];

// Tüm alt kategorileri ayarlayın
const subCategories = Array.from(
  new Set(courses.map((course) => course.subCategory).filter(Boolean))
);

// Tüm konular (topics) ve kategoriler
const allTopics = Array.from(
  new Set(courses.flatMap((course) => course.topics))
);
const categories = Array.from(
  new Set(courses.map((course) => course.category))
);

export default function Courses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [subCategoryFilter, setSubCategoryFilter] = useState("all");
  const [tagFilters, setTagFilters] = useState<string[]>([]);
  const [topicFilter, setTopicFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [tagSearchTerm, setTagSearchTerm] = useState("");
  const coursesPerPage = 12;

  const availableTopics = useMemo(() => {
    return Array.from(new Set(courses.map((course) => course.category)));
  }, []);

  const filteredCourses = useMemo(() => {
    return courses.filter(
      (course) =>
        course.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (categoryFilter === "all" || course.category === categoryFilter) &&
        (subCategoryFilter === "all" ||
          course.subCategory === subCategoryFilter) &&
        (topicFilter === "all" || course.category === topicFilter) &&
        (tagFilters.length === 0 ||
          tagFilters.some((tag) => course.topics.includes(tag)))
    );
  }, [searchTerm, categoryFilter, subCategoryFilter, topicFilter, tagFilters]);

  const indexOfLastCourse = currentPage * coursesPerPage;
  const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
  const currentCourses = filteredCourses.slice(
    indexOfFirstCourse,
    indexOfLastCourse
  );
  const totalPages = Math.ceil(filteredCourses.length / coursesPerPage);

  const handleTagToggle = (tag: string) => {
    setTagFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
    setCurrentPage(1);
  };

  useEffect(() => {
    setSubCategoryFilter("all");
    setTopicFilter("all");
    setCurrentPage(1);
  }, [categoryFilter]);

  useEffect(() => {
    setTopicFilter("all");
    setCurrentPage(1);
  }, [subCategoryFilter]);

  return (
    <div className="flex flex-col min-h-screen lg:w-11/12 mx-auto w-11/12">
      <main className="flex-1 flex">
        <aside className="w-72 bg-gray-100 p-4 hidden lg:block sticky top-14 h-screen overflow-y-auto mt-12">
          <div className="space-y-4">
            <Input
              placeholder="Kurs ara"
              type="search"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
            <Select
              value={categoryFilter}
              onValueChange={(value) => {
                setCategoryFilter(value);
                setSubCategoryFilter("all");
                setTopicFilter("all");
                setCurrentPage(1);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Kategoriler</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select
              value={subCategoryFilter}
              onValueChange={(value) => {
                setSubCategoryFilter(value);
                setTopicFilter("all");
                setCurrentPage(1);
              }}
              disabled={categoryFilter === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Alt Kategori" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Alt Kategoriler</SelectItem>
                {subCategories
                  .filter(
                    (subCategory) =>
                      categoryFilter === "all" ||
                      courses.some(
                        (course) =>
                          course.category === categoryFilter &&
                          course.subCategory === subCategory
                      )
                  )
                  .map((subCategory) => (
                    <SelectItem key={subCategory} value={subCategory}>
                      {subCategory}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
            <Select
              value={topicFilter}
              onValueChange={(value) => {
                setTopicFilter(value);
                setCurrentPage(1);
              }}
              disabled={subCategoryFilter === "all"}
            >
              <SelectTrigger>
                <SelectValue placeholder="Konu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tüm Konular</SelectItem>
                {availableTopics.map((topic) => (
                  <SelectItem key={topic} value={topic}>
                    {topic}
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
                {allTopics
                  .filter((tag) =>
                    tag.toLowerCase().includes(tagSearchTerm.toLowerCase())
                  )
                  .map((tag) => (
                    <div key={tag} className="flex items-center space-x-2 py-1">
                      <Checkbox
                        id={tag}
                        checked={tagFilters.includes(tag)}
                        onCheckedChange={() => handleTagToggle(tag)}
                      />
                      <label
                        htmlFor={tag}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {tag}
                      </label>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </aside>
        <section className="flex-1 py-12 px-4 md:px-6">
          <div className="container mx-auto lg:w-11/12">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl mb-8 text-zinc-600">
              Eğitimleri Keşfet
            </h1>
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
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                  />
                  <Select
                    value={categoryFilter}
                    onValueChange={(value) => {
                      setCategoryFilter(value);
                      setSubCategoryFilter("all");
                      setTopicFilter("all");
                      setCurrentPage(1);
                    }}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Kategoriler</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={subCategoryFilter}
                    onValueChange={(value) => {
                      setSubCategoryFilter(value);
                      setTopicFilter("all");
                      setCurrentPage(1);
                    }}
                    disabled={categoryFilter === "all"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Alt Kategori" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Alt Kategoriler</SelectItem>
                      {subCategories
                        .filter(
                          (subCategory) =>
                            categoryFilter === "all" ||
                            courses.some(
                              (course) =>
                                course.category === categoryFilter &&
                                course.subCategory === subCategory
                            )
                        )
                        .map((subCategory) => (
                          <SelectItem key={subCategory} value={subCategory}>
                            {subCategory}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={topicFilter}
                    onValueChange={(value) => {
                      setTopicFilter(value);
                      setCurrentPage(1);
                    }}
                    disabled={subCategoryFilter === "all"}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Konu" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Tüm Konular</SelectItem>
                      {availableTopics.map((topic) => (
                        <SelectItem key={topic} value={topic}>
                          {topic}
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
                      {allTopics
                        .filter((tag) =>
                          tag
                            .toLowerCase()
                            .includes(tagSearchTerm.toLowerCase())
                        )
                        .map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2 py-1"
                          >
                            <Checkbox
                              id={`mobile-${tag}`}
                              checked={tagFilters.includes(tag)}
                              onCheckedChange={() => handleTagToggle(tag)}
                            />
                            <label
                              htmlFor={`mobile-${tag}`}
                              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                              {tag}
                            </label>
                          </div>
                        ))}
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {currentCourses.map((course) => (
                <Card key={course.id} className="flex flex-col">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover rounded-t-md"
                  />
                  <CardHeader>
                    <CardTitle>{course.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={`/placeholder.svg?height=32&width=32`}
                          alt={course.instructor}
                        />
                        <AvatarFallback>{course.instructor[0]}</AvatarFallback>
                      </Avatar>
                      <span>{course.instructor}</span>
                    </div>
                    <div className="flex flex-wrap gap-2 mb-2">
                      {course.topics.map((topic) => (
                        <Badge key={topic} variant="secondary">
                          {topic}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-1" />
                        <span>{course.students} Değerlendirme</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                        <span>{course.rating}</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{course.duration}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Link to="5" className="w-full">
                      <Button className="w-full bg-amber-500  hover:bg-amber-600 text-slate-100 text-base rounded-xl">
                        Şimdi İzle
                      </Button>
                    </Link>
                  </CardFooter>
                </Card>
              ))}
            </div>
            {totalPages > 1 && (
              <div className="flex justify-center items-center space-x-2 mt-8">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <span>
                  {currentPage} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>
          {filteredCourses.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-gray-400" />
              <h2 className="mt-2 text-lg font-medium text-gray-900">
                Kurs bulunamadı
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Farklı bir arama terimi veya kategori deneyin.
              </p>
            </div>
          )}
        </section>
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
