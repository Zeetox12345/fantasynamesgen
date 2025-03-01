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

// Custom interface for ACOTAR name data
interface ACOTARNameEntry {
  name: string;
  description: string;
}

interface ACOTARNameData {
  acotarNames: ACOTARNameEntry[];
}

const ACOTARNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<ACOTARNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "acotar");
      setNameData(data as ACOTARNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.acotarNames) return;
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.acotarNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.acotarNames) return;
    
    setSelectedName(name);
    
    // Find description for the name
    const nameEntry = nameData.acotarNames.find(e => e.name === name);
    setNameDescription(nameEntry?.description || null);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>ACOTAR Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your ACOTAR-inspired character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="ACOTAR, A Court of Thorns and Roses, fantasy names, name generator, fae names, Sarah J Maas, character names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">ACOTAR Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your ACOTAR-inspired character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate ACOTAR Names</CardTitle>
            <CardDescription>Create unique names inspired by A Court of Thorns and Roses</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate ACOTAR names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good ACOTAR Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">ACOTAR Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular ACOTAR Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A Court of Thorns and Roses (ACOTAR) is a popular fantasy series by Sarah J. Maas that features a rich world 
              of High Fae, magical courts, and complex characters. The series has captivated readers with its intricate 
              world-building, compelling relationships, and distinctive naming conventions.
            </p>
            <p className="mb-4">
              The names in ACOTAR often reflect the magical and otherworldly nature of the Fae, with melodic sounds, 
              unique combinations of syllables, and names that evoke power, beauty, and ancient magic.
            </p>
            <p>
              This generator creates names inspired by the ACOTAR series, perfect for fan fiction, role-playing games, 
              or creating your own characters set in a similar fantasy world.
            </p>
          </div>
          
          {/* Featured ACOTAR Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/acotar/acotar-main.jpg"
            alt="ACOTAR-inspired character"
            caption="A High Fae character with ethereal beauty and ancient power, reminiscent of the magical beings from the Court of Dreams."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good ACOTAR Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good ACOTAR-inspired name should capture the essence of the Fae world created by Sarah J. Maas. 
              Here are some characteristics that make for effective ACOTAR names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Melodic Quality:</span> 
                <span>Names with a flowing, musical quality that roll off the tongue.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Unique Combinations:</span> 
                <span>Distinctive combinations of syllables that sound both ancient and magical.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Court Associations:</span> 
                <span>Names that might reflect the character's court affiliation (Night, Spring, Autumn, etc.).</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Power Elements:</span> 
                <span>Names that convey power, magic, or ancient heritage.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ethereal Quality:</span> 
                <span>Names with an otherworldly, ethereal quality befitting the immortal Fae.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our ACOTAR Name Generator is simple:</p>
            <ol className="list-decimal pl-5 space-y-2 mb-6">
              <li>Click the "Generate Names" button to create a list of 10 random ACOTAR-inspired names.</li>
              <li>Browse through the generated names and click on any that interest you to see their description.</li>
              <li>Generate as many sets of names as you like until you find the perfect one for your character.</li>
              <li>Use the description as inspiration for your character's personality or background.</li>
            </ol>
            <p>
              Each name comes with a unique description that can help you develop your character's backstory, 
              personality traits, or role within the Fae courts.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">ACOTAR Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In the world of ACOTAR, names often reflect the character's nature, power, or court affiliation. 
              Here are some naming traditions observed in the series:
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Court-Based Names</h3>
            <p className="mb-4">
              Characters from different courts often have names that reflect the nature of their court:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Night Court:</span> 
                <span>Names often have darker, mysterious elements or celestial references.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Spring Court:</span> 
                <span>Names with bright, flourishing, or growth-related connotations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Autumn Court:</span> 
                <span>Names with warm, fiery, or harvest-related elements.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Summer Court:</span> 
                <span>Names with bright, warm, or ocean-related themes.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Winter Court:</span> 
                <span>Names with cold, crisp, or ice-related connotations.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Dawn Court:</span> 
                <span>Names with light, beginning, or renewal themes.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Day Court:</span> 
                <span>Names with bright, illuminating, or truth-related elements.</span>
              </li>
            </ul>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">High Fae vs. Lesser Fae</h3>
            <p className="mb-4">
              High Fae often have more elaborate, multi-syllabic names that convey power and ancient lineage, 
              while Lesser Fae might have simpler, more functional names.
            </p>
            
            <h3 className="text-xl font-semibold mb-2 mt-6">Titles and Epithets</h3>
            <p>
              Many characters in ACOTAR have titles or epithets that accompany their names, reflecting their 
              role, power, or significant deeds. These can become an integral part of how they are known.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular ACOTAR Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              While our generator creates unique names inspired by the ACOTAR series, here are some of the most 
              iconic character names from the books:
            </p>
            
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Court/Affiliation</TableHead>
                  <TableHead>Notable Characteristics</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell className="font-medium">Rhysand</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>High Lord of the Night Court, powerful, complex</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Feyre</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Human-turned-High Fae, artistic, resilient</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tamlin</TableCell>
                  <TableCell>Spring Court</TableCell>
                  <TableCell>High Lord of the Spring Court, shapeshifter</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amarantha</TableCell>
                  <TableCell>Under the Mountain</TableCell>
                  <TableCell>Cruel, powerful, manipulative</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Morrigan</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Truth-speaker, loyal, fierce</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Azriel</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Shadowsinger, spymaster, quiet</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cassian</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>General, warrior, passionate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nesta</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Fierce, protective, complex</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Elain</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Gentle, seer, nurturing</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Lucien</TableCell>
                  <TableCell>Spring/Autumn Court</TableCell>
                  <TableCell>Emissary, clever, loyal</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Amren</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Ancient being, powerful, intimidating</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Tarquin</TableCell>
                  <TableCell>Summer Court</TableCell>
                  <TableCell>High Lord of the Summer Court, fair, progressive</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Helion</TableCell>
                  <TableCell>Day Court</TableCell>
                  <TableCell>High Lord of the Day Court, knowledgeable, charismatic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Kallias</TableCell>
                  <TableCell>Winter Court</TableCell>
                  <TableCell>High Lord of the Winter Court, reserved, protective</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Thesan</TableCell>
                  <TableCell>Dawn Court</TableCell>
                  <TableCell>High Lord of the Dawn Court, healer, compassionate</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Beron</TableCell>
                  <TableCell>Autumn Court</TableCell>
                  <TableCell>High Lord of the Autumn Court, cruel, traditional</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Eris</TableCell>
                  <TableCell>Autumn Court</TableCell>
                  <TableCell>Heir to the Autumn Court, cunning, complex</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Viviane</TableCell>
                  <TableCell>Winter Court</TableCell>
                  <TableCell>Lady of the Winter Court, spirited, kind</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cresseida</TableCell>
                  <TableCell>Summer Court</TableCell>
                  <TableCell>Tarquin's cousin, diplomatic, intelligent</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Jurian</TableCell>
                  <TableCell>Human Lands</TableCell>
                  <TableCell>Ancient human warrior, complex, determined</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Bryaxis</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Ancient fear monster, sentient darkness, evolving</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Suriel</TableCell>
                  <TableCell>Various</TableCell>
                  <TableCell>Truth-telling creature, ancient, knowledgeable</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ianthe</TableCell>
                  <TableCell>Spring Court</TableCell>
                  <TableCell>High Priestess, manipulative, ambitious</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Hybern</TableCell>
                  <TableCell>Kingdom of Hybern</TableCell>
                  <TableCell>King, ancient, power-hungry, cruel</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Miryam</TableCell>
                  <TableCell>Continent</TableCell>
                  <TableCell>Half-human, brave, loyal to Drakon</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Drakon</TableCell>
                  <TableCell>Continent</TableCell>
                  <TableCell>Seraphim prince, honorable, devoted to Miryam</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Varian</TableCell>
                  <TableCell>Summer Court</TableCell>
                  <TableCell>Captain of the Summer Court guard, protective</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Gwyn</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Priestess, survivor, determined warrior</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Emerie</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Illyrian shopkeeper, resilient, determined</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Koschei</TableCell>
                  <TableCell>Unknown</TableCell>
                  <TableCell>Ancient death-lord, immortal, manipulative</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Briallyn</TableCell>
                  <TableCell>Human Lands</TableCell>
                  <TableCell>Human queen, power-hungry, vengeful</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nephelle</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Historic female Illyrian warrior, groundbreaking</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Athelwood</TableCell>
                  <TableCell>Spring Court</TableCell>
                  <TableCell>Sentinel, loyal to Tamlin, stoic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Dagdan</TableCell>
                  <TableCell>Hybern</TableCell>
                  <TableCell>Prince of Hybern, cruel, calculating</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Brannagh</TableCell>
                  <TableCell>Hybern</TableCell>
                  <TableCell>Princess of Hybern, twin to Dagdan, sadistic</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Balthazar</TableCell>
                  <TableCell>Spring Court</TableCell>
                  <TableCell>Guard, loyal, observant</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Ressina</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Artist, mentor to Feyre, community-minded</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Clotho</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Head priestess of the library, survivor, wise</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Nuala</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Half-wraith, spy, twin to Cerridwen</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell className="font-medium">Cerridwen</TableCell>
                  <TableCell>Night Court</TableCell>
                  <TableCell>Half-wraith, spy, twin to Nuala</TableCell>
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
            <Link to="/fantasy/female-alien" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Female Alien Names</h3>
              <p className="text-sm text-muted-foreground">Generate unique and exotic names for female alien characters</p>
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

export default ACOTARNameGenerator; 