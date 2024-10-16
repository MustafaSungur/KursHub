import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import bgVideo from "../../assets/bgvideo.webm";

export default function HeroSection() {
  return (
    <section className="relative w-full py-12 md:py-24 lg:py-60 lg:h-max z-0">
      <div className="absolute inset-0 bg-black opacity-60 z-10 h-full"></div>
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        muted
        loop
        playsInline
      >
        <source src={bgVideo} type="video/webm" />
        Tarayıcınız video etiketini desteklemiyor.
      </video>
      <div className="relative container px-4 md:px-6 mx-auto z-20">
        <div className="flex flex-col items-center space-y-4 text-center">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl md:text-6xl text-white">
            Öğrenmeye Başla, Kendini Geliştir
          </h1>
          <p className="max-w-[700px] text-gray-300 md:text-xl">
            KursHub ile binlerce online eğitime erişin ve kariyerinizi bir üst
            seviyeye taşıyın. Uzman eğitmenlerle, kendi hızınızda öğrenin.
          </p>
          <Link to="courses">
            <Button className="bg-amber-500 hover:bg-amber-600 text-slate-100 text-lg px-8 py-3">
              Hemen Başla
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
