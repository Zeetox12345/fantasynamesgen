import { useState, useEffect } from "react";
import { Wand2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Toggle } from "@/components/ui/toggle";
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
import { loadNameData, generateNames, CharacterNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const DwarfRangerNameGenerator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<CharacterNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "dwarf-ranger");
      setNameData(data as CharacterNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    const newNames = generateNames(nameData, { gender }, 10);
    setGeneratedNames(newNames);
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    
    // Find description for each part of the name
    const [firstName, lastName] = name.split(' ');
    const firstNameEntry = nameData[gender].find(e => e.name === firstName);
    const lastNameEntry = nameData.lastNames.find(e => e.name === lastName);
    
    let description = '';
    if (firstNameEntry) {
      description += firstNameEntry.description;
    }
    if (firstNameEntry && lastNameEntry) {
      description += '. ';
    }
    if (lastNameEntry) {
      description += lastNameEntry.description;
    }
    
    setNameDescription(description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Dwarf Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your dwarf ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="dwarf ranger, fantasy names, name generator, dwarf, ranger, character names, RPG names" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/fantasy" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Fantasy
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Wand2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Dwarf Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your dwarf ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Dwarf Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique dwarf ranger names</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <div className="flex flex-wrap items-center gap-3 sm:gap-4">
                <span className="text-sm font-medium">Gender:</span>
                <div className="flex gap-2">
                  <Toggle 
                    pressed={gender === "male"} 
                    onPressedChange={() => setGender("male")}
                    variant="outline"
                    aria-label="Select male gender"
                  >
                    Male
                  </Toggle>
                  <Toggle 
                    pressed={gender === "female"} 
                    onPressedChange={() => setGender("female")}
                    variant="outline"
                    aria-label="Select female gender"
                  >
                    Female
                  </Toggle>
                </div>
              </div>
              
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate dwarf ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Dwarf Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Dwarf Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Dwarf Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Dwarf Rangers are hardy wilderness experts who combine traditional dwarven resilience and craftsmanship with 
              exceptional survival skills. These stout scouts serve as the eyes and ears of dwarven kingdoms, patrolling 
              mountain passes, underground routes, and the dangerous borderlands between civilized territories and the wild.
            </p>
            <p className="mb-4">
              Unlike many of their kin who prefer the comfort of underground halls, Dwarf Rangers embrace the challenge of 
              the open wilderness, developing keen tracking abilities, practical survival knowledge, and combat techniques 
              suited for a variety of terrains and opponents.
            </p>
            <p>
              This generator creates names for these stalwart wilderness protectors, providing you with authentic-sounding 
              dwarven names that reflect both their heritage and their ranger calling.
            </p>
          </div>
          
          {/* Featured Dwarf Ranger Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/dwarf-ranger/dwarf-ranger-main.jpg"
            alt="Dwarf Ranger"
            caption="A Dwarf Ranger stands vigilant on a rocky outcrop, surveying the wilderness with experienced eyes and ready for any danger."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Dwarf Ranger Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good Dwarf Ranger name should reflect both their dwarven heritage and their connection to the wilderness. 
              Here are some characteristics that make for effective Dwarf Ranger names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Strong Sounds:</span> 
                <span>Names with hard consonants and guttural sounds that reflect the hardy nature of dwarves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>References to mountains, stones, animals, or natural features that symbolize their connection to the wilderness.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Epithets:</span> 
                <span>Titles or nicknames that highlight their skills as trackers, scouts, or wilderness survivors.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Clan References:</span> 
                <span>Inclusion of clan names or ancestral connections that ground them in dwarven tradition.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Practical Quality:</span> 
                <span>Names that sound practical and functional, reflecting the no-nonsense approach of dwarves.</span>
              </li>
            </ul>
            <p>
              The best Dwarf Ranger names often combine a traditional dwarven first name with a surname or epithet that hints at 
              their wilderness expertise, creating a name that feels both authentically dwarven and fitting for a ranger.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Dwarf Ranger Name Generator is straightforward:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Select Gender:</span> Choose whether you want male, female, or gender-neutral names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique Dwarf Ranger names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your character.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Mix and Match:</span> Feel free to combine different first names and surnames from the generated results to create your perfect Dwarf Ranger name.
              </li>
            </ol>
            <p>
              Each generated name comes with a brief description that suggests the character's personality or notable skills, 
              helping to inspire your character creation.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Dwarf Ranger Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Dwarf Rangers follow distinct naming patterns that reflect both their cultural heritage and their wilderness profession:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Clan Names</h3>
                <p>
                  Most Dwarf Rangers proudly maintain their clan names, which connect them to their lineage and heritage. 
                  These names often end in suffixes like "-son," "-dottir," or "-hammer," and may reference ancestral 
                  professions, achievements, or locations.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Deed Names</h3>
                <p>
                  Many Dwarf Rangers earn "deed names" based on notable achievements in the wilderness. These names often 
                  describe a significant feat, such as "Trollslayer," "Wolfbane," or "Stormwalker," and may eventually 
                  replace their birth names in common usage.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Geographic Titles</h3>
                <p>
                  Some Dwarf Rangers take names that reference the specific territories they patrol or protect. Names like 
                  "Ridgewalker," "Deepvale Guardian," or "Warden of the Eastern Peaks" indicate their area of expertise 
                  and responsibility.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Craft-Inspired Names</h3>
                <p>
                  Even as wilderness experts, many Dwarf Rangers maintain connections to traditional dwarven crafts. Some 
                  incorporate these skills into their names, such as "Irontracker," "Stonefinder," or "Gemspotter," 
                  reflecting how they apply dwarven crafting knowledge to their ranger duties.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Dwarf Ranger Names</h2>
          <p className="text-lg mb-6 text-muted-foreground/90">Below are some renowned dwarf ranger names that have become popular in fantasy settings:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Male Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.male.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Female Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.female.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Surnames</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.lastNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
                {loading && (
                  <TableRow>
                    <TableCell colSpan={2}>Loading name data...</TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </section>

        {/* Latest Generators */}
        <section className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Fantasy Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/fantasy/space-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Space Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate futuristic names for space rangers and cosmic defenders</p>
            </Link>
            <Link to="/fantasy/chaos-dwarf-city" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Chaos Dwarf City Names</h3>
              <p className="text-sm text-muted-foreground">Generate dark and imposing names for chaos dwarf settlements</p>
            </Link>
            <Link to="/fantasy/elven-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Elven Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate mystical and nature-attuned names for elven rangers</p>
            </Link>
            <Link to="/fantasy/halfling-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Halfling Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create nimble and clever names for halfling scouts and rangers</p>
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

export default DwarfRangerNameGenerator; 