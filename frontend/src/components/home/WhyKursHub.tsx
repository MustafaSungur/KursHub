import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { CheckCircle } from "lucide-react";

const features = [
  {
    title: "Geniş Eğitim Yelpazesi",
    description:
      "Teknolojiden sanata, işletmeden dillere kadar her alanda eğitimler",
  },
  {
    title: "Uzman Eğitmenler",
    description: "Alanında uzman eğitmenlerle kaliteli eğitim",
  },
  {
    title: "Esnek Öğrenme",
    description: "Kendi hızınızda, istediğiniz zaman ve yerde öğrenin",
  },
  {
    title: "İnteraktif İçerik",
    description: "Videolar, quizler ve projelerle etkileşimli öğrenme",
  },
  {
    title: "Sertifikalar",
    description: "Tamamladığınız eğtimlerler için sertifikalar kazanın",
  },
  {
    title: "Topluluk Desteği",
    description: "Diğer öğrencilerle etkileşime geçin ve birlikte öğrenin",
  },
];

export default function WhyKursHub() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 bg-gray-100">
      <div className="container px-4 md:px-6 mx-auto">
        <h2 className="text-3xl text-zinc-600 font-bold tracking-tighter sm:text-4xl md:text-5xl text-center mb-8">
          Neden KursHub?
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <CheckCircle className="h-6 w-6 text-amber-500 mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
