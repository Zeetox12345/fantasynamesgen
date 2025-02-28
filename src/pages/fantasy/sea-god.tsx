import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Crown, Anchor, Info } from "lucide-react";
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
import { loadNameData, generateNames, CharacterNameData } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const SeaGodGenerator = () => {
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
      console.log("Fetching sea god name data...");
      try {
        const data = await loadNameData("fantasy", "sea-god");
        console.log("Sea god data loaded:", data);
        setNameData(data as CharacterNameData);
      } catch (error) {
        console.error("Error loading sea god data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) {
      console.log("No name data available");
      return;
    }
    
    console.log("Generating sea god names with data:", nameData);
    
    // Create an array to store the generated names
    const newNames: string[] = [];
    
    // Get the first names based on gender
    const firstNames = nameData[gender].map(entry => entry.name);
    console.log(`Available ${gender} first names:`, firstNames);
    
    // Check if we have first names to generate
    if (firstNames.length === 0) {
      console.log("Not enough name data to generate names");
      return;
    }
    
    // Get the last names if available
    const lastNames = nameData.lastNames?.map(entry => entry.name) || [];
    console.log("Available last names:", lastNames);
    
    // Generate unique combinations
    const maxAttempts = 50; // Prevent infinite loop if we can't find enough unique names
    let attempts = 0;
    
    // If we have lastNames, generate first+last name combinations
    if (lastNames.length > 0) {
      while (newNames.length < 10 && attempts < maxAttempts) {
        // Get random indices
        const firstNameIndex = Math.floor(Math.random() * firstNames.length);
        const lastNameIndex = Math.floor(Math.random() * lastNames.length);
        
        // Create the full name
        const fullName = `${firstNames[firstNameIndex]} ${lastNames[lastNameIndex]}`;
        
        // Only add if it's not already in the list
        if (!newNames.includes(fullName)) {
          newNames.push(fullName);
        }
        
        attempts++;
      }
    } else {
      // If no lastNames available, just use first names
      while (newNames.length < 10 && attempts < maxAttempts) {
        // Get random index
        const firstNameIndex = Math.floor(Math.random() * firstNames.length);
        
        // Use just the first name
        const name = firstNames[firstNameIndex];
        
        // Only add if it's not already in the list
        if (!newNames.includes(name)) {
          newNames.push(name);
        }
        
        attempts++;
      }
    }
    
    console.log("Generated sea god names:", newNames);
    setGeneratedNames(newNames);
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    console.log("Clicked on sea god name:", name);
    
    // Find description for each part of the name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts[1] : null;
    console.log("Name parts:", firstName, lastName);
    
    // Look for the first name in the correct gender array
    const firstNameEntry = nameData[gender].find(e => e.name === firstName);
    console.log("First name entry:", firstNameEntry);
    
    // Look for the last name if it exists
    const lastNameEntry = lastName ? nameData.lastNames?.find(e => e.name === lastName) : null;
    console.log("Last name entry:", lastNameEntry);
    
    // Extract descriptions from the entries
    let description = '';
    
    if (firstNameEntry) {
      // The description format in the JSON is "Yortis, A divine being who watches over the deep abyss"
      // We need to extract just the description part after the comma
      const parts = firstNameEntry.description.split(', ');
      if (parts.length > 1) {
        description += parts[1]; // Take the part after the comma
      } else {
        description += firstNameEntry.description;
      }
    }
    
    if (firstNameEntry && lastNameEntry) {
      description += ' ';
    }
    
    if (lastNameEntry) {
      description += lastNameEntry.description;
    }
    
    // If no description was found, provide a fallback
    if (!description) {
      description = `A powerful sea deity named ${name}, ruler of ocean domains.`;
    }
    
    console.log("Final description:", description);
    setNameDescription(description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Sea God Name Generator - Oceanic Deities | FantasyNamesGen</title>
        <meta name="description" content="Generate powerful names for sea gods and goddesses. Create majestic oceanic deities for your fantasy world or story." />
        <meta name="keywords" content="sea god names, ocean deity, water goddess, fantasy deity, poseidon, name generator, mythology, aquatic god" />
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
              <Crown className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Sea God Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate powerful names for sea gods and oceanic deities for your fantasy world.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Sea God Names</CardTitle>
            <CardDescription>Select gender and generate unique sea deity names</CardDescription>
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
                aria-label="Generate sea god names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Sea God Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Sea God Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Sea God Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Sea gods and goddesses are powerful deities that rule over the oceans, seas, and all water bodies in 
              mythologies across the world. These divine beings control the tides, storms, and marine life, and are 
              often portrayed as majestic figures wielding tridents, riding fearsome sea creatures, or emerging from 
              the depths adorned with pearls and coral.
            </p>
            <p className="mb-4">
              From the ancient Greek Poseidon to the Polynesian Tangaroa, sea deities hold significant places in countless 
              pantheons, reflecting humanity's complex relationship with the vast, unpredictable oceans. Sailors, fishermen, 
              and coastal communities have traditionally honored these gods to ensure safe voyages and bountiful catches.
            </p>
            <p>
              This generator creates names for these powerful aquatic deities, providing you with authentic-sounding 
              divine names that evoke the majesty and mystery of the deep.
            </p>
          </div>
          
          {/* Featured Sea God Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/sea-god/sea-god-main.jpg"
            alt="Sea God"
            caption="A powerful sea god rising from the ocean depths, wielding a trident and commanding the waves with divine authority."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Sea God Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good sea god name should evoke power, majesty, and a connection to the ocean. 
              Here are some characteristics that make for effective sea deity names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flowing Sounds:</span> 
                <span>Names with liquid consonants (l, r) and long vowels that mimic the movement of water.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Oceanic References:</span> 
                <span>Elements that reference sea-related phenomena like tides, waves, depths, or storms.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Divine Qualities:</span> 
                <span>Components that suggest immortality, power, or divine authority (like "eternal" or "sovereign").</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Roots:</span> 
                <span>Names with roots in ancient languages, particularly Greek, Latin, Norse, or Pacific Islander tongues.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Resonant Endings:</span> 
                <span>Names that end with strong, resonant sounds that convey gravity and importance.</span>
              </li>
            </ul>
            <p>
              Great sea god names like "Poseidon," "Njord," or "Thalassa" instantly evoke the power and majesty of the sea,
              while suggesting their divine authority over the oceanic domain.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using the Sea God Name Generator is simple and intuitive. Here's how to get the most out of it:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Select whether you want to generate names for male or female sea deities using the toggles.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click the "Generate Names" button to create a list of sea god or goddess names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Browse through the generated names for one that fits your fantasy pantheon or story.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>If you want to see the meaning or description of a name, click on it to view more details.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">5.</span> 
                <span>Generate new sets of names as many times as you wish until you find the perfect one.</span>
              </li>
            </ol>
            <p>
              Our generator combines first names and titles based on mythology, ancient languages, and oceanic terminology 
              to create authentic-sounding names for your divine sea-dwelling characters.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Sea God Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Sea deity naming traditions vary across cultures and mythologies, reflecting different relationships 
              with the ocean. Here are some of the most significant traditions:
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Mediterranean Traditions</h3>
              <p>
                Greek and Roman sea deity names often feature strong, commanding sounds with clear etymological meanings. 
                Poseidon (possibly meaning "lord of the waters") and Neptune exemplify this pattern. These names frequently 
                incorporate references to the sea's power and vastness.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Norse and Germanic Naming</h3>
              <p>
                Northern European sea gods like Njord and Aegir have names that often reflect the cold, dangerous 
                waters of the North Sea and Atlantic. These names tend to be shorter, with harder consonants and 
                strong syllables that evoke the harsh northern waters.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Pacific Islander Traditions</h3>
              <p>
                Oceanic cultures like Polynesian, Micronesian, and Hawaiian traditions feature sea deity names with 
                flowing, open vowels that mirror the expansive Pacific. Names like Tangaroa and Namaka have a rhythmic 
                quality that suggests the ocean's endless motion.
              </p>
            </div>
          </div>
          
          {/* Featured Sea God Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/sea-god/sea-goddess.jpg"
            alt="Sea Goddess"
            caption="A serene sea goddess adorned with pearls and coral, communing with marine creatures and controlling the gentle tides."
          />
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Sea God Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              Across various mythologies and cultures, sea deities have played crucial roles in explaining the mysteries and powers of the ocean. 
              These names have been revered in ancient temples, invoked by sailors seeking safe passage, and immortalized in epic tales. 
              Our comprehensive lists below showcase the most renowned oceanic deities from around the world.
            </p>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-primary">Famous Male Sea Gods</h3>
              <p className="mb-4">
                These powerful male sea deities have dominated oceanic mythology across different cultures, each commanding respect and reverence from mortals who depended on the sea.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Domain and Attributes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Poseidon</TableCell>
                      <TableCell>Greek</TableCell>
                      <TableCell>God of the sea, earthquakes, and horses, wielding the three-pronged trident</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Neptune</TableCell>
                      <TableCell>Roman</TableCell>
                      <TableCell>Equivalent to Poseidon, god of freshwater and the sea</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Aegir</TableCell>
                      <TableCell>Norse</TableCell>
                      <TableCell>Personification of the peaceful sea, known for hosting feasts for the gods</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tangaroa</TableCell>
                      <TableCell>Polynesian</TableCell>
                      <TableCell>God of the ocean and creator of fish and other sea creatures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Manannan Mac Lir</TableCell>
                      <TableCell>Celtic</TableCell>
                      <TableCell>God of the sea and the Otherworld, known for his magical boat and cloak of mists</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Njord</TableCell>
                      <TableCell>Norse</TableCell>
                      <TableCell>God of sea winds, coastal waters, and prosperity in fishing and seafaring</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Susanoo</TableCell>
                      <TableCell>Japanese</TableCell>
                      <TableCell>Storm god associated with the sea and serpent-slaying</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Varuna</TableCell>
                      <TableCell>Hindu</TableCell>
                      <TableCell>Originally the sky god who later became associated with oceans and waters</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Enki</TableCell>
                      <TableCell>Sumerian</TableCell>
                      <TableCell>God of freshwater, wisdom, and the abzu (primordial sea)</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Yam</TableCell>
                      <TableCell>Canaanite</TableCell>
                      <TableCell>Primordial god of the sea, often depicted as a chaos monster</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-primary">Revered Sea Goddesses</h3>
              <p className="mb-4">
                Female sea deities embody both the nurturing abundance and terrible power of the ocean. These goddesses have been worshipped by coastal communities throughout history.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Origin</TableHead>
                      <TableHead>Domain and Attributes</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Amphitrite</TableCell>
                      <TableCell>Greek</TableCell>
                      <TableCell>Queen of the sea and wife of Poseidon, mother of tritons and sea creatures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tethys</TableCell>
                      <TableCell>Greek</TableCell>
                      <TableCell>Titan sea goddess, mother of the river gods and sea nymphs</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ran</TableCell>
                      <TableCell>Norse</TableCell>
                      <TableCell>Goddess who collects the drowned in her net, wife of Aegir</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Namaka</TableCell>
                      <TableCell>Hawaiian</TableCell>
                      <TableCell>Goddess of the sea and sister of Pele, the volcano goddess</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Salacia</TableCell>
                      <TableCell>Roman</TableCell>
                      <TableCell>Goddess of saltwater and Neptune's consort</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sedna</TableCell>
                      <TableCell>Inuit</TableCell>
                      <TableCell>Goddess of the sea and marine animals, who lives in the depths</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Yemoja</TableCell>
                      <TableCell>Yoruba</TableCell>
                      <TableCell>Mother goddess associated with rivers, oceans, and motherhood</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Chalchiuhtlicue</TableCell>
                      <TableCell>Aztec</TableCell>
                      <TableCell>Goddess of water, lakes, rivers, seas, and protector of newborns</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thalassa</TableCell>
                      <TableCell>Greek</TableCell>
                      <TableCell>Primordial goddess personifying the Mediterranean Sea</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ganga</TableCell>
                      <TableCell>Hindu</TableCell>
                      <TableCell>Goddess of the Ganges River, purifier and life-giver</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-3 text-primary">Divine Oceanic Titles and Epithets</h3>
              <p className="mb-4">
                Sea deities are often known by various titles and epithets that describe their powers, domains, or characteristics. These can be combined with names to create more elaborate divine identities.
              </p>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Title/Epithet</TableHead>
                      <TableHead>Meaning</TableHead>
                      <TableHead>Usage</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Lord/Lady of the Deep</TableCell>
                      <TableCell>Ruler of the ocean depths</TableCell>
                      <TableCell>Used for deities who command the deepest parts of the ocean</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Storm-Bringer</TableCell>
                      <TableCell>One who summons sea storms</TableCell>
                      <TableCell>Applied to wrathful sea gods who control weather at sea</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wave-Rider</TableCell>
                      <TableCell>One who travels on ocean waves</TableCell>
                      <TableCell>For sea deities known for their swift movement across waters</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tide-Master/Mistress</TableCell>
                      <TableCell>Controller of ocean tides</TableCell>
                      <TableCell>Denotes power over the rhythmic movement of the sea</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Coral-Crowned</TableCell>
                      <TableCell>Adorned with coral regalia</TableCell>
                      <TableCell>Suggests royalty among sea deities</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Trident-Bearer</TableCell>
                      <TableCell>Wielder of the three-pronged spear</TableCell>
                      <TableCell>Traditional symbol of sea god authority</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pearl-Keeper</TableCell>
                      <TableCell>Guardian of ocean treasures</TableCell>
                      <TableCell>Associated with wealth and bounty from the sea</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Abyssal Sovereign</TableCell>
                      <TableCell>Ruler of the ocean abyss</TableCell>
                      <TableCell>Denotes authority over the darkest ocean realms</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tempest-Heart</TableCell>
                      <TableCell>Embodiment of sea storms</TableCell>
                      <TableCell>Describes deities with tempestuous natures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Serene Waters</TableCell>
                      <TableCell>Bringer of calm seas</TableCell>
                      <TableCell>For benevolent deities who protect sailors</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-primary">Using Our Generator</h3>
            <p className="mb-4">
              Our Sea God Name Generator draws inspiration from these legendary deities while creating unique combinations that feel authentic and powerful. The generator combines:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Divine First Names:</span> 
                <span>Names that sound majestic and commanding, appropriate for oceanic deities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Powerful Titles:</span> 
                <span>Epithets that describe domains, powers, or characteristics of the deity.</span>
              </li>
            </ul>
            <p>
              Each generated name comes with a description that provides context and meaning, helping you develop rich lore for your fantasy world's pantheon of sea gods.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default SeaGodGenerator; 