import { Skull } from "lucide-react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Lovecraftian = () => {
  const generators = [
    {
      title: "Female Names",
      description: "Generate mysterious and otherworldly female names inspired by H.P. Lovecraft's cosmic horror universe.",
      href: "/lovecraftian/female",
      image: "/images/categories/lovecraftian/lovecraftian-female/lovecraftian-female-main.jpg",
    },
    {
      title: "Town Names",
      description: "Generate names for eerie, mysterious towns and settlements in the style of H.P. Lovecraft's cosmic horror.",
      href: "/lovecraftian/town",
      image: "/images/categories/lovecraftian/lovecraftian-town/lovecraftian-town-main.jpg",
    },
    {
      title: "Cult Names",
      description: "Generate names for mysterious cults and secret societies inspired by H.P. Lovecraft's cosmic horror universe.",
      href: "/lovecraftian/cult",
      image: "/images/categories/lovecraftian/lovecraftian-cult/lovecraftian-cult-main.jpg",
    },
    {
      title: "Monster Names",
      description: "Generate names for cosmic horrors, eldritch abominations, and otherworldly entities inspired by H.P. Lovecraft's universe.",
      href: "/lovecraftian/monster",
      image: "/images/categories/lovecraftian/lovecraftian-monster/lovecraftian-monster-main.jpg",
    },
    {
      title: "Deity Names",
      description: "Generate names for cosmic deities, elder gods, and ancient entities inspired by H.P. Lovecraft's cosmic horror universe.",
      href: "/lovecraftian/deity",
      image: "/images/categories/lovecraftian/lovecraftian-deity/lovecraftian-deity-main.jpg",
    },
  ];

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Lovecraftian Name Generators | FantasyNamesGen</title>
        <meta name="description" content="Generate names for cosmic horror entities, cults, towns, and more inspired by H.P. Lovecraft's universe." />
        <meta name="keywords" content="lovecraftian names, cosmic horror, cthulhu mythos, name generator, fantasy names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Home
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Skull className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Lovecraftian Name Generators</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate names for cosmic horror entities, cults, towns, and more inspired by H.P. Lovecraft's universe.</p>
        </div>

        {/* Introduction */}
        <div className="mb-8 sm:mb-12">
          <Card className="glass-card">
            <CardContent className="pt-6">
              <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
                <p className="mb-4">
                  H.P. Lovecraft created a unique cosmic horror universe filled with ancient entities, forbidden knowledge, and unspeakable horrors. 
                  His distinctive naming style evokes a sense of the alien and unknowable, with unusual consonant combinations, apostrophes, and 
                  syllables that suggest something fundamentally outside human experience.
                </p>
                <p>
                  Our Lovecraftian name generators help you create authentic-sounding names for various elements of cosmic horror storytelling, 
                  from the names of cultists and investigators to the ancient deities and the cursed towns where cosmic horror unfolds. 
                  Perfect for writers, game masters, and fans of cosmic horror looking to create their own stories in the style of Lovecraft.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Generators Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {generators.map((generator, index) => (
            <Card key={index} className="glass-card overflow-hidden flex flex-col">
              <div className="aspect-[16/9] overflow-hidden">
                <img 
                  src={generator.image} 
                  alt={generator.title} 
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <CardHeader className="pb-2">
                <CardTitle className="text-xl">{generator.title}</CardTitle>
                <CardDescription>{generator.description}</CardDescription>
              </CardHeader>
              <CardFooter className="pt-2 mt-auto">
                <Button asChild className="w-full">
                  <Link to={generator.href}>Generate {generator.title}</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-12 sm:mt-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8">About Lovecraftian Names</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Characteristics of Lovecraftian Names</CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li>Unusual consonant combinations that are difficult to pronounce</li>
                  <li>Liberal use of apostrophes and hyphens</li>
                  <li>Syllables that evoke ancient or forgotten languages</li>
                  <li>Names that suggest concepts beyond human comprehension</li>
                  <li>Sounds that create a sense of unease or wrongness</li>
                  <li>Elements that hint at cosmic vastness or primordial origins</li>
                </ul>
              </CardContent>
            </Card>
            
            <Card className="glass-card">
              <CardHeader>
                <CardTitle className="text-lg sm:text-xl">Using Lovecraftian Names</CardTitle>
              </CardHeader>
              <CardContent className="text-sm sm:text-base">
                <ul className="list-disc pl-5 space-y-2">
                  <li>For tabletop RPGs like Call of Cthulhu or Delta Green</li>
                  <li>In cosmic horror fiction or short stories</li>
                  <li>For video games with Lovecraftian themes</li>
                  <li>In art projects exploring cosmic horror concepts</li>
                  <li>For creating immersive horror experiences</li>
                  <li>As inspiration for original cosmic horror worldbuilding</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Lovecraftian; 