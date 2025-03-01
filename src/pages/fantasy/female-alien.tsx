import { useState, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { loadNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

// Custom interface for Female Alien name data
interface AlienNameEntry {
  name: string;
  description: string;
}

interface FemaleAlienNameData {
  female: AlienNameEntry[];
  lastNames?: AlienNameEntry[]; // Optional in case the JSON has last names
}

const FemaleAlienNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<FemaleAlienNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "femalealien");
      setNameData(data as FemaleAlienNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.female) return;
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.female].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.female) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.female.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Female Alien Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your female alien character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="female alien, alien names, sci-fi names, fantasy names, name generator, character names, RPG names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/fantasy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Fantasy
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Female Alien Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your female alien character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Female Alien Names</CardTitle>
            <CardDescription>Create unique names for your female alien characters</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate female alien names"
              >
                {loading ? "Loading..." : "Generate Names"}
              </Button>
              
              {loading && <p>Loading name data...</p>}
              
              {!loading && generatedNames.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mt-3 sm:mt-4">
                  {generatedNames.map((name, index) => (
                    <Dialog key={index}>
                      <DialogTrigger asChild>
                        <div 
                          className="p-3 sm:p-4 rounded-md bg-secondary/20 border border-border hover:border-primary cursor-pointer flex justify-between items-center"
                          onClick={() => handleNameClick(name)}
                        >
                          <span>{name}</span>
                          <Info className="h-4 w-4 text-muted-foreground" />
                        </div>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>{selectedName}</DialogTitle>
                          <DialogDescription>
                            {nameDescription || "No description available."}
                          </DialogDescription>
                        </DialogHeader>
                      </DialogContent>
                    </Dialog>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Content Table */}
        <div className="mb-6 sm:mb-8">
          <h2 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4">Contents</h2>
          <nav aria-label="Page contents">
            <ul className="space-y-2">
              <li>
                <a href="#introduction" className="text-primary hover:underline">Introduction</a>
              </li>
              <li>
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Female Alien Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Alien Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Female Alien Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Female alien characters have become increasingly prominent in science fiction and fantasy, 
              from powerful warriors to wise leaders, mysterious visitors to complex antagonists. These 
              characters often require names that sound distinctly non-human while still being pronounceable 
              and memorable.
            </p>
            <p className="mb-4">
              Creating the perfect female alien name can be challenging - it needs to sound exotic and otherworldly 
              while still being accessible to readers or players. The name should reflect the character's species, 
              culture, and individual traits while avoiding human naming conventions.
            </p>
            <p>
              This generator creates unique female alien names with diverse sounds and structures, 
              perfect for your science fiction novels, role-playing games, or creative projects.
            </p>
          </div>
          
          {/* Featured Female Alien Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/femalealien/femalealien-main.jpg"
            alt="Female Alien Character"
            caption="A mysterious female alien with distinctive features that mark her as clearly non-human, yet with an intelligence and presence that transcends species."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Female Alien Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good female alien name should sound distinctly non-human while still being accessible to human audiences. 
              Here are some characteristics that make for effective alien names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unusual Phonetics:</span> 
                <span>Combinations of sounds that are rare or non-existent in human languages.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Distinctive Structure:</span> 
                <span>Syllable patterns that differ from common human naming conventions.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Special Characters:</span> 
                <span>Apostrophes, hyphens, or unusual letter combinations that suggest alien pronunciation.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Reflection:</span> 
                <span>Elements that hint at the alien's species, homeworld, or cultural background.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Pronounceability:</span> 
                <span>Despite being exotic, the name should still be pronounceable by human readers or players.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Female Alien Name Generator is simple:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li>Click the "Generate Names" button to create a list of 10 random female alien names.</li>
              <li>Browse through the generated names and click on any that interest you to see their description.</li>
              <li>Generate as many sets of names as you like until you find the perfect one for your character.</li>
              <li>Use the description as inspiration for your character's personality or background.</li>
            </ol>
            <p>
              Each name comes with a unique description that can help you develop your character's backstory, 
              personality traits, or role within their alien society.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Alien Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Alien naming traditions can vary widely depending on the species, culture, and world-building context. 
              Here are some common approaches to alien naming conventions:
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Phonetic Patterns</h3>
            <p className="mb-4">
              Different alien species might have distinctive sound patterns in their names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Liquid Consonants:</span> 
                <span>Names with many L, R sounds for species with fluid movement or aquatic origins.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Hard Consonants:</span> 
                <span>Names with K, T, G sounds for species with more rigid or militaristic cultures.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sibilants:</span> 
                <span>Names with many S, Z, Sh sounds for reptilian or insectoid species.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Vowel Harmony:</span> 
                <span>Names where all vowels are from the same family, suggesting a highly structured language.</span>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Naming Components</h3>
            <p className="mb-4">
              Alien names might include various components that reflect different aspects of identity:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Caste/Role Markers:</span> 
                <span>Prefixes or suffixes that indicate social role, profession, or caste.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Lineage Indicators:</span> 
                <span>Elements that show family line, genetic heritage, or ancestral connection.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Geographic Markers:</span> 
                <span>Components that indicate homeworld, region, or territory of origin.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Achievement Titles:</span> 
                <span>Parts of the name earned through accomplishments or life events.</span>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Gender Differentiation</h3>
            <p>
              Some alien species might have distinct naming patterns for different genders, while others might 
              have completely gender-neutral naming conventions or naming patterns for more than two genders.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Female Alien Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              While our generator creates unique names, here are some iconic female alien characters from 
              popular science fiction and fantasy:
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Species/Origin</TableHead>
                  <TableHead>Notable Characteristics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Neytiri</TableCell>
                  <TableCell>Na'vi (Avatar)</TableCell>
                  <TableCell>Fierce warrior, spiritual connection to nature</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ahsoka Tano</TableCell>
                  <TableCell>Togruta (Star Wars)</TableCell>
                  <TableCell>Former Jedi, independent warrior</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Liara T'Soni</TableCell>
                  <TableCell>Asari (Mass Effect)</TableCell>
                  <TableCell>Archaeologist, information broker, biotic powers</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gamora</TableCell>
                  <TableCell>Zen-Whoberi (Marvel)</TableCell>
                  <TableCell>Assassin, Guardian of the Galaxy</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Leela</TableCell>
                  <TableCell>Mutant (Futurama)</TableCell>
                  <TableCell>Starship captain, skilled martial artist</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Seven of Nine</TableCell>
                  <TableCell>Human/Borg (Star Trek)</TableCell>
                  <TableCell>Former Borg drone, analytical, adapting to humanity</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tali'Zorah</TableCell>
                  <TableCell>Quarian (Mass Effect)</TableCell>
                  <TableCell>Engineer, tech specialist, immune-compromised</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Zhaan</TableCell>
                  <TableCell>Delvian (Farscape)</TableCell>
                  <TableCell>Priestess, healer, plant-based humanoid</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Chiana</TableCell>
                  <TableCell>Nebari (Farscape)</TableCell>
                  <TableCell>Rebellious, street-smart, enhanced vision</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Zoe Washburne</TableCell>
                  <TableCell>Human (Firefly)</TableCell>
                  <TableCell>Soldier, second-in-command, loyal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Aeryn Sun</TableCell>
                  <TableCell>Sebacean (Farscape)</TableCell>
                  <TableCell>Former Peacekeeper, pilot, tactical expert</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nyota Uhura</TableCell>
                  <TableCell>Human (Star Trek)</TableCell>
                  <TableCell>Communications officer, linguist, pioneering character</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Aayla Secura</TableCell>
                  <TableCell>Twi'lek (Star Wars)</TableCell>
                  <TableCell>Jedi Master, skilled with lightsaber, force-sensitive</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Neeku</TableCell>
                  <TableCell>Kaminoan (Star Wars)</TableCell>
                  <TableCell>Scientist, cloner, tall and elegant</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Mantis</TableCell>
                  <TableCell>Empath (Guardians of the Galaxy)</TableCell>
                  <TableCell>Empathic abilities, innocent, antenna</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nebula</TableCell>
                  <TableCell>Luphomoid (Marvel)</TableCell>
                  <TableCell>Assassin, cybernetically enhanced, complex</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">T'Pol</TableCell>
                  <TableCell>Vulcan (Star Trek)</TableCell>
                  <TableCell>Science officer, logical, struggles with emotions</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kira Nerys</TableCell>
                  <TableCell>Bajoran (Star Trek)</TableCell>
                  <TableCell>Former resistance fighter, spiritual, determined</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jadzia Dax</TableCell>
                  <TableCell>Trill (Star Trek)</TableCell>
                  <TableCell>Joined with symbiont, science officer, old soul</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Shaak Ti</TableCell>
                  <TableCell>Togruta (Star Wars)</TableCell>
                  <TableCell>Jedi Master, wise, powerful force user</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Neytiri Te Tskaha Mo'at'ite</TableCell>
                  <TableCell>Na'vi (Avatar)</TableCell>
                  <TableCell>Princess, skilled hunter, spiritual connection to Eywa</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Zhaan</TableCell>
                  <TableCell>Delvian (Farscape)</TableCell>
                  <TableCell>Pa'u priest, healer, former anarchist, plant-based physiology</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Delenn</TableCell>
                  <TableCell>Minbari (Babylon 5)</TableCell>
                  <TableCell>Ambassador, spiritual leader, transformed to half-human</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Trillian</TableCell>
                  <TableCell>Human/Alien (Hitchhiker's Guide)</TableCell>
                  <TableCell>Mathematician, adventurer, quick-witted</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Quorra</TableCell>
                  <TableCell>ISO (Tron: Legacy)</TableCell>
                  <TableCell>Last of the ISOs, curious, adaptive, digital being</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Starfire</TableCell>
                  <TableCell>Tamaranean (DC Comics)</TableCell>
                  <TableCell>Princess, energy projection, flight, emotional power source</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Guinan</TableCell>
                  <TableCell>El-Aurian (Star Trek)</TableCell>
                  <TableCell>Listener, centuries old, mysterious perception abilities</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Sil</TableCell>
                  <TableCell>Alien Hybrid (Species)</TableCell>
                  <TableCell>Genetically engineered, predatory, rapid metamorphosis</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dejah Thoris</TableCell>
                  <TableCell>Martian (John Carter)</TableCell>
                  <TableCell>Princess of Mars, scientist, warrior</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Aura</TableCell>
                  <TableCell>Mongo (Flash Gordon)</TableCell>
                  <TableCell>Princess, seductive, cunning, survivor</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hoshi Sato</TableCell>
                  <TableCell>Human/Alien (Star Trek)</TableCell>
                  <TableCell>Linguist, communications officer, first universal translator</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cheetara</TableCell>
                  <TableCell>Thunderian (ThunderCats)</TableCell>
                  <TableCell>Super speed, sixth sense, staff fighter</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Maz Kanata</TableCell>
                  <TableCell>Unknown (Star Wars)</TableCell>
                  <TableCell>Force-sensitive, ancient, wise, collector</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lwaxana Troi</TableCell>
                  <TableCell>Betazoid (Star Trek)</TableCell>
                  <TableCell>Ambassador, telepathic, flamboyant, strong-willed</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Pris</TableCell>
                  <TableCell>Replicant (Blade Runner)</TableCell>
                  <TableCell>"Basic pleasure model," acrobatic, dangerous</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Serleena</TableCell>
                  <TableCell>Kylothian (Men in Black)</TableCell>
                  <TableCell>Shapeshifter, predatory plant-like being, ruthless</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Motoko Kusanagi</TableCell>
                  <TableCell>Cyborg (Ghost in the Shell)</TableCell>
                  <TableCell>Full-body prosthesis, tactical genius, hacker</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Leeloo</TableCell>
                  <TableCell>Divine Being (Fifth Element)</TableCell>
                  <TableCell>Perfect being, supreme warrior, innocent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nyssa</TableCell>
                  <TableCell>Traken (Doctor Who)</TableCell>
                  <TableCell>Last survivor of Traken, scientist, compassionate</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Latest Generators */}
        <section className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Fantasy Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/fantasy/ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate classic names for wilderness scouts and hunters</p>
            </Link>
            <Link to="/fantasy/dark-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dark Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for rangers who have embraced shadow magic</p>
            </Link>
            <Link to="/fantasy/acotar" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">ACOTAR Names</h3>
              <p className="text-sm text-muted-foreground">Create names inspired by the Court of Thorns and Roses series</p>
            </Link>
            <Link to="/fantasy/elven-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Elven Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical and nature-attuned names for elven rangers</p>
            </Link>
          </div>
        </section>

        {/* Footer */}
        <footer className="mt-16 sm:mt-24 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          <p>Copyright 2025 – FantasyNamesGen</p>
        </footer>
      </div>
    </div>
  );
};

export default FemaleAlienNameGenerator; 