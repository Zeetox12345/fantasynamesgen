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
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Dwarf Rangers are elite scouts and wilderness experts who patrol the mountainous regions, 
              forests, and borderlands of dwarven kingdoms. Unlike their kin who prefer the comfort of 
              underground halls, these hardy individuals venture into the wilderness, serving as the first 
              line of defense against threats to their people.
            </p>
            <p>
              Known for their exceptional tracking abilities, survival skills, and combat prowess, dwarf 
              rangers combine the natural toughness and craftsmanship of their race with an intimate 
              knowledge of the wild. They are often solitary figures, though some form small bands that 
              patrol specific territories.
            </p>
            <p>
              The name of a dwarf ranger often reflects both their dwarven heritage and their connection 
              to the wilderness. This generator helps you create authentic and meaningful names for your 
              dwarf ranger characters in role-playing games, fantasy stories, or any creative project.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Dwarf Ranger Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good dwarf ranger name should evoke both the sturdy, traditional nature of dwarven culture 
              and the wilderness expertise of a ranger. Here are some characteristics of effective dwarf 
              ranger names:
            </p>
            <ul>
              <li><strong>Strong Consonants:</strong> Dwarven names typically feature strong consonants that convey resilience and strength.</li>
              <li><strong>Nature References:</strong> Surnames often include references to natural elements like stone, mountains, or forests.</li>
              <li><strong>Practical Meaning:</strong> Names that reflect practical skills or traits valued in dwarven society.</li>
              <li><strong>Ancestral Connections:</strong> Names that honor ancestors or dwarven traditions.</li>
              <li><strong>Descriptive Elements:</strong> Surnames that describe a notable physical feature or skill.</li>
            </ul>
            <p>
              The best dwarf ranger names combine a traditional dwarven first name with a surname that 
              hints at their ranger abilities or experiences in the wild. This creates a name that is 
              both authentic to dwarven culture and reflective of their ranger profession.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Dwarf Ranger Name Generator is straightforward:</p>
            <ol>
              <li><strong>Select Gender:</strong> Choose between male and female options to get gender-appropriate first names.</li>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique dwarf ranger names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that suits your character.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Mix and Match:</strong> Feel free to mix first names and last names from different generated results to create your perfect combination.</li>
            </ol>
            <p>
              The generator combines traditional dwarven first names with surnames that reflect the 
              ranger's connection to nature, their skills, or notable achievements. This creates balanced 
              names that sound authentically dwarven while highlighting their ranger profession.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Dwarf Ranger Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Dwarf rangers follow several naming traditions that blend standard dwarven customs with 
              elements unique to their wilderness profession:
            </p>
            <h3>Clan Names and Personal Names</h3>
            <p>
              Like all dwarves, rangers have a personal name given at birth and a clan name. However, 
              many rangers adopt a third name or title that reflects their life in the wilderness. 
              For example, Thorin Oakenshield might be known among rangers as "Thorin Oakenshield the 
              Wolftracker."
            </p>
            <h3>Deed Names</h3>
            <p>
              Many dwarf rangers earn names based on notable deeds or skills. These "deed names" often 
              replace their clan names when operating in the wild. A ranger who saved their patrol from 
              a rock slide might become known as "Borin Rockwatcher."
            </p>
            <h3>Nature Bonds</h3>
            <p>
              Some rangers take names that reflect a special connection to a particular aspect of nature. 
              These might reference animals they have an affinity with, terrains they specialize in 
              navigating, or natural phenomena they've mastered predicting.
            </p>
            <h3>Secret Names</h3>
            <p>
              Many dwarf rangers have secret names known only to their closest companions. These names 
              often reflect their deepest connection to the wilderness and are used in private ceremonies 
              or when communicating with nature spirits.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Dwarf Ranger Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most iconic dwarf ranger names, each with its own meaning:</p>
          
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