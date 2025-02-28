import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Snowflake, Footprints, Info } from "lucide-react";
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
import { loadNameData, generateNames, LocationNameData, NameEntry } from "@/lib/nameUtils";
import { GeneratorImage } from "@/components/GeneratorImage";

const ReindeerGenerator = () => {
  const [gender, setGender] = useState<"male" | "female">("male");
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LocationNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      console.log("Fetching reindeer name data...");
      try {
        const data = await loadNameData("fantasy", "reindeer");
        console.log("Reindeer data loaded:", data);
        setNameData(data as LocationNameData);
      } catch (error) {
        console.error("Error loading reindeer data:", error);
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
    
    console.log("Generating reindeer names with data:", nameData);
    
    // Get the reindeer names from the JSON data
    const reindeerNameEntries = nameData.reindeerNames as NameEntry[] || [];
    console.log("Available reindeer names:", reindeerNameEntries.length);
    
    // Extract just the names
    const availableNames = reindeerNameEntries.map(entry => entry.name);
    
    // Check if we have enough names to generate
    if (availableNames.length === 0) {
      console.log("No reindeer names available in the data");
      return;
    }
    
    // Create an array to store the generated names
    const newNames: string[] = [];
    
    // Generate unique names
    const maxAttempts = 50; // Prevent infinite loop if we can't find enough unique names
    let attempts = 0;
    
    while (newNames.length < 10 && attempts < maxAttempts) {
      // Get a random index
      const nameIndex = Math.floor(Math.random() * availableNames.length);
      const name = availableNames[nameIndex];
      
      // Only add if it's not already in the list
      if (!newNames.includes(name)) {
        newNames.push(name);
      }
      
      attempts++;
    }
    
    console.log("Generated reindeer names:", newNames);
    setGeneratedNames(newNames);
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    console.log("Clicked on reindeer name:", name);
    
    // Find the name in the reindeerNames array
    const nameList = nameData.reindeerNames as NameEntry[] || [];
    const entry = nameList.find(e => e.name === name);
    
    console.log("Name entry found:", entry);
    
    let description = '';
    if (entry) {
      // The description format in the JSON is "Blizius, A legendary reindeer known for unmatched endurance"
      // We need to extract just the description part after the comma
      const parts = entry.description.split(', ');
      if (parts.length > 1) {
        description = parts[1]; // Take the part after the comma
      } else {
        description = entry.description;
      }
    } else {
      // Provide a fallback description if none is found
      description = `A majestic reindeer named ${name} with distinctive features and magical abilities.`;
    }
    
    console.log("Final reindeer description:", description);
    setNameDescription(description);
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Reindeer Name Generator - 10,000+ Magical & Fantasy Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ magical and festive names for your fantasy reindeer characters. Our name generator is perfect for holiday stories, winter-themed tales, and fantasy worldbuilding." />
        <meta name="keywords" content="reindeer names, fantasy reindeer, magical deer, christmas reindeer, winter fantasy, name generator, northern fantasy" />
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
              <Snowflake className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Reindeer Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate magical and festive names for your fantasy reindeer characters.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Reindeer Names</CardTitle>
            <CardDescription>Select gender and generate unique reindeer names</CardDescription>
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
                aria-label="Generate reindeer names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Reindeer Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Reindeer Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Reindeer Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Fantasy reindeer are magical creatures that inhabit northern realms and enchanted winter forests. Unlike their 
              real-world counterparts, these mythical beings often possess supernatural abilities such as flight, 
              luminescent antlers, or the power to navigate between worlds during the winter solstice.
            </p>
            <p className="mb-4">
              In many fantasy settings, reindeer are intelligent creatures with rich cultures and traditions of their own. 
              They may serve as companions to winter spirits, guardians of ancient boreal forests, or messengers 
              between the mortal realm and frosty otherworlds.
            </p>
            <p>
              This generator creates names for these magnificent creatures, providing you with authentic-sounding 
              reindeer names that evoke their magical nature and northern heritage.
            </p>
          </div>
          
          {/* Featured Reindeer Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/reindeer/reindeer-main.jpg"
            alt="Fantasy Reindeer"
            caption="A majestic fantasy reindeer with glowing antlers stands proudly in a moonlit snow-covered forest."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Reindeer Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good fantasy reindeer name should evoke the creature's northern nature and magical qualities. 
              Here are some characteristics that make for effective reindeer names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Winter Elements:</span> 
                <span>Names that reference snow, ice, frost, or winter phenomena create an immediate connection to their habitat.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Northern Sounds:</span> 
                <span>Scandinavian, Russian, or indigenous northern naming patterns lend authenticity to reindeer names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Sky and Star References:</span> 
                <span>For flying reindeer, names that evoke the sky, stars, or flight suggest their magical abilities.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>References to forest features, mountains, or tundra connect the reindeer to their natural environment.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Light and Glow:</span> 
                <span>Names that suggest brightness, light, or glowing qualities fit with magical reindeer features.</span>
              </li>
            </ul>
            <p>
              Great reindeer names like "Frostantler," "Snowdash," or "Starleap" instantly conjure an image of these 
              magical creatures and hint at their special qualities or abilities.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using the Reindeer Name Generator is simple and intuitive. Here's how to get the most out of it:
            </p>
            <ol className="space-y-3 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Select whether you want to generate names for male or female reindeer using the toggles.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click the "Generate Names" button to create a list of reindeer names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Browse through the generated names for one that fits your character or story.</span>
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
              Our generator combines first names and surnames inspired by winter, northern cultures, and fantastical elements 
              to create authentic-sounding names for your magical reindeer.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Reindeer Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              In fantasy worlds, reindeer naming traditions often reflect their culture, abilities, and environment. 
              Here are some common patterns:
            </p>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Descriptive Names</h3>
              <p>
                Many reindeer receive names that describe their physical attributes or special qualities. A reindeer with 
                unusually bright antlers might be named "Glowpoint" or "Shimmerhorn," while one known for speed might 
                be called "Swifthooves" or "Windrunner."
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Seasonal Naming</h3>
              <p>
                Reindeer born during specific seasons or celestial events may be named accordingly. "Midwinter," 
                "Solstice," or "Aurora" might mark when a reindeer came into the world, connecting their identity 
                to natural cycles.
              </p>
            </div>
            <div className="mb-6">
              <h3 className="text-xl font-semibold mb-3 text-primary">Magical Affiliations</h3>
              <p>
                Reindeer with particular magical talents often have names reflecting those powers. Those with 
                frost magic might have names incorporating "Frost," "Rime," or "Chill," while those with abilities 
                related to light might have "Gleam," "Spark," or "Luminous" in their names.
              </p>
            </div>
          </div>
          
          {/* Featured Reindeer Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/reindeer/reindeer-herd.jpg"
            alt="Herd of Fantasy Reindeer"
            caption="A magical herd of fantasy reindeer with varied colors and glowing features traveling across a snowy landscape at dusk."
          />
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Reindeer Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-6">
              While fantasy reindeer can have endless creative names, some have become particularly iconic in 
              literature and folklore. Below we've compiled extensive lists of popular names by category.
            </p>
            
            {/* Male Reindeer Names */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Popular Male Reindeer Names</h3>
            <p className="mb-4">
              Male reindeer often have names that convey strength, speed, and their magical connection to winter and the sky.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Origin/Meaning</TableHead>
                    <TableHead>Notable Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Dasher</TableCell>
                    <TableCell>English, "one who moves quickly"</TableCell>
                    <TableCell>Known for incredible speed and agility when flying</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Comet</TableCell>
                    <TableCell>Astronomical term</TableCell>
                    <TableCell>Leaves a trail of light when flying through the night sky</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Blitzen</TableCell>
                    <TableCell>German, "lightning"</TableCell>
                    <TableCell>Antlers occasionally crackle with lightning during winter storms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Donder</TableCell>
                    <TableCell>Dutch, "thunder"</TableCell>
                    <TableCell>Hooves create thundering sounds when galloping across the sky</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Frost</TableCell>
                    <TableCell>English, "frozen dew"</TableCell>
                    <TableCell>Creates beautiful frost patterns wherever he walks</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Glacier</TableCell>
                    <TableCell>French, "ice formation"</TableCell>
                    <TableCell>Has icy blue eyes and a coat that shimmers like ice crystals</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Silverhoof</TableCell>
                    <TableCell>Fantasy compound</TableCell>
                    <TableCell>Hooves appear silver in moonlight and leave magical trails</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Northwind</TableCell>
                    <TableCell>Directional element</TableCell>
                    <TableCell>Can control cold winds and create paths of snowflakes</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Starfell</TableCell>
                    <TableCell>Fantasy compound</TableCell>
                    <TableCell>Antlers appear to contain tiny captured stars</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Frostbite</TableCell>
                    <TableCell>Winter condition</TableCell>
                    <TableCell>Breath creates unique snowflake patterns in the air</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Female Reindeer Names */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Popular Female Reindeer Names</h3>
            <p className="mb-4">
              Female reindeer names often emphasize grace, wisdom, and their connection to winter magic and celestial phenomena.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Origin/Meaning</TableHead>
                    <TableHead>Notable Features</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Vixen</TableCell>
                    <TableCell>Old English, "female fox"</TableCell>
                    <TableCell>Clever and cunning, with exceptional navigation skills</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Snowdrift</TableCell>
                    <TableCell>Winter phenomenon</TableCell>
                    <TableCell>Perfectly camouflaged in snowy landscapes with frost-tipped fur</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Aurora</TableCell>
                    <TableCell>Latin, "dawn"</TableCell>
                    <TableCell>Antlers shimmer with colors resembling the northern lights</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Crystal</TableCell>
                    <TableCell>Greek, "ice"</TableCell>
                    <TableCell>Fur sparkles like ice crystals in moonlight</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mistral</TableCell>
                    <TableCell>Mediterranean wind</TableCell>
                    <TableCell>Swift and graceful, seems to float above the snow</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Frostfeather</TableCell>
                    <TableCell>Fantasy compound</TableCell>
                    <TableCell>Has an unusually light step that barely disturbs snow</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Eira</TableCell>
                    <TableCell>Welsh, "snow"</TableCell>
                    <TableCell>Can create small snowstorms with a shake of her antlers</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Glimmer</TableCell>
                    <TableCell>English, "faint light"</TableCell>
                    <TableCell>Coat contains flecks that glow faintly in darkness</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Luminara</TableCell>
                    <TableCell>Latin, "light"</TableCell>
                    <TableCell>Antlers glow brightly on moonless nights, guiding the herd</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Winter</TableCell>
                    <TableCell>Season name</TableCell>
                    <TableCell>Born during the harshest blizzard in a century</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {/* Reindeer Surnames/Traits */}
            <h3 className="text-xl font-semibold mb-3 text-primary">Popular Reindeer Surnames/Traits</h3>
            <p className="mb-4">
              Reindeer often have descriptive surnames that indicate their lineage, magical abilities, or distinguishing features.
            </p>
            <div className="overflow-x-auto mb-8">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Surname</TableHead>
                    <TableHead>Origin/Meaning</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">Frostantler</TableCell>
                    <TableCell>Winter element + physical feature</TableCell>
                    <TableCell>Denotes reindeer with antlers that perpetually appear to be covered in frost</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Starstrider</TableCell>
                    <TableCell>Celestial + movement</TableCell>
                    <TableCell>Family known for exceptional flying abilities, particularly at night</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Snowcaller</TableCell>
                    <TableCell>Winter element + ability</TableCell>
                    <TableCell>Lineage with the ability to summon gentle snowfalls</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Icerunner</TableCell>
                    <TableCell>Winter element + skill</TableCell>
                    <TableCell>Known for exceptional sure-footedness on icy terrain</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Moonguide</TableCell>
                    <TableCell>Celestial + role</TableCell>
                    <TableCell>Family traditionally serving as pathfinders on moonlit nights</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Winterborn</TableCell>
                    <TableCell>Season + origin</TableCell>
                    <TableCell>Born during the winter solstice, often with heightened magical abilities</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Mistwalker</TableCell>
                    <TableCell>Weather phenomenon + ability</TableCell>
                    <TableCell>Can move silently through fog and mist, seemingly becoming part of it</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Northheart</TableCell>
                    <TableCell>Direction + courage</TableCell>
                    <TableCell>Known for exceptional bravery and resilience in frozen lands</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Everdrift</TableCell>
                    <TableCell>Permanence + snow formation</TableCell>
                    <TableCell>Nomadic families that never settle in one region for long</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Brightpath</TableCell>
                    <TableCell>Light + journey</TableCell>
                    <TableCell>Hooves leave briefly glowing trails that help others follow safely</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            <h3 className="text-xl font-semibold mb-3 text-primary">Dynamically Generated Names</h3>
            <p className="mb-3">
              The names generated by our tool are pulled from extensive curated lists in our database.
              Each name is paired with a meaningful description explaining the name's significance or magical attributes.
            </p>
            <p>
              If you're looking for even more reindeer names, simply use the generator at the top of this page to create
              unique combinations drawing from our comprehensive collection of fantasy reindeer nomenclature.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ReindeerGenerator; 