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

const RangerNameGenerator = () => {
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
      const data = await loadNameData("fantasy", "ranger");
      setNameData(data as CharacterNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    // Check if we have the expected data structure
    if (nameData[gender] && nameData[gender].length > 0) {
      // Randomly select 10 names from the data
      const shuffled = [...nameData[gender]].sort(() => 0.5 - Math.random());
      const selected = shuffled.slice(0, 10);
      setGeneratedNames(selected.map(entry => entry.name));
    } else {
      console.error("Invalid name data structure or empty data");
      setGeneratedNames([]);
    }
  };

  const handleNameClick = (name: string) => {
    if (!nameData) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData[gender].find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="ranger, fantasy names, name generator, wilderness, tracker, hunter, character names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique ranger names</CardDescription>
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
                aria-label="Generate ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Rangers are skilled wilderness warriors who have mastered the art of survival in the harshest environments. 
              These expert trackers, hunters, and scouts serve as protectors of the wild places and the communities that 
              border them, using their intimate knowledge of nature to their advantage.
            </p>
            <p className="mb-4">
              With their exceptional archery skills, dual-wielding combat techniques, and ability to move unseen through 
              natural terrain, rangers are formidable allies and dangerous foes. They often form deep bonds with animal 
              companions and can harness minor nature magic to aid their endeavors.
            </p>
            <p>
              This generator creates authentic-sounding names for these wilderness protectors, providing you with names 
              that reflect both their connection to nature and their role as guardians of the wild.
            </p>
          </div>
          
          {/* Featured Ranger Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/ranger/ranger-main.jpg"
            alt="Ranger"
            caption="A skilled ranger moves silently through the forest, bow at the ready, alert to the faintest signs of danger."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Ranger Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good ranger name should reflect their connection to the wilderness and their role as protectors. 
              Here are some characteristics that make for effective ranger names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>References to forests, animals, weather, or natural phenomena that symbolize their connection to the wilderness.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Strong Consonants:</span> 
                <span>Names with strong consonants that convey resilience and determination.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Descriptive Surnames:</span> 
                <span>Last names that describe their skills as trackers, hunters, or protectors.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Practical Quality:</span> 
                <span>Names that sound practical and grounded, reflecting their pragmatic approach to survival.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subtle Strength:</span> 
                <span>Names that convey quiet competence rather than flashy power.</span>
              </li>
            </ul>
            <p>
              The best ranger names often combine a strong first name with a surname or epithet that hints at 
              their wilderness expertise, creating a name that feels both authentic and fitting for a ranger.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Ranger Name Generator is straightforward:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Select Gender:</span> Choose whether you want male or female names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique ranger names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your character.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Mix and Match:</span> Feel free to combine different first names and surnames from the generated results to create your perfect ranger name.
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Ranger Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Ranger naming traditions often reflect their deep connection to the natural world and their role as protectors of the wilderness:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <span className="font-semibold text-primary">Nature-Inspired Names:</span> Many rangers adopt names that reference natural elements, animals, or plants they feel a connection to. Names like Hawkeye, Wolfguard, or Oakshield are common.
              </li>
              <li>
                <span className="font-semibold text-primary">Earned Titles:</span> Some rangers earn titles based on their notable deeds or skills, which eventually become part of their identity. A ranger known for tracking in storms might become known as "Stormtracker."
              </li>
              <li>
                <span className="font-semibold text-primary">Compound Names:</span> Rangers often have compound names that combine natural elements with their qualities or skills, such as Swiftarrow, Nightwalker, or Silentblade.
              </li>
              <li>
                <span className="font-semibold text-primary">Regional Variations:</span> Rangers from different regions may incorporate local naming traditions. Forest rangers might favor names with sylvan elements, while mountain rangers might use names with references to stone or heights.
              </li>
              <li>
                <span className="font-semibold text-primary">Legacy Names:</span> Some rangers come from families with long traditions of wilderness protection, and may carry ancestral names that have been passed down through generations of rangers.
              </li>
            </ul>
            <p>
              These naming traditions help rangers establish their identity within their communities and among other wilderness protectors, creating a sense of camaraderie and shared purpose.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Ranger Names</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              While rangers are known for their individuality, certain names have become popular among these wilderness protectors:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <h3 className="text-xl font-semibold mb-3">Popular Male Ranger Names</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Meaning/Origin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Hawkeye</TableCell>
                      <TableCell>Known for exceptional vision and accuracy with a bow</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Strider</TableCell>
                      <TableCell>One who covers great distances with ease</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thornguard</TableCell>
                      <TableCell>Protector of wild and dangerous places</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wolfheart</TableCell>
                      <TableCell>One with the spirit and loyalty of a wolf</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Flintwood</TableCell>
                      <TableCell>Hard as stone, resilient as wood</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Oakenshield</TableCell>
                      <TableCell>Defender with the strength and resilience of oak</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pathfinder</TableCell>
                      <TableCell>Expert at discovering new routes through wilderness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beastcaller</TableCell>
                      <TableCell>One who can communicate with and command animals</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Windwalker</TableCell>
                      <TableCell>Moves silently and swiftly like the wind</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stormbow</TableCell>
                      <TableCell>Archer whose arrows strike with the force of a storm</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stormtracker</TableCell>
                      <TableCell>Can navigate through the fiercest tempests with uncanny precision</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Beastheart</TableCell>
                      <TableCell>Known for an extraordinary bond with wild creatures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pinecrest</TableCell>
                      <TableCell>Mountain ranger specializing in alpine survival and tracking</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mistwalker</TableCell>
                      <TableCell>Moves silently through fog, using limited visibility as advantage</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Embertrail</TableCell>
                      <TableCell>Can track prey through scorched lands and resist extreme heat</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Frostgaze</TableCell>
                      <TableCell>Has exceptional vision in snowy conditions and survives harsh winters</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thistlefoot</TableCell>
                      <TableCell>Moves through thorny underbrush without leaving traces</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Riverguide</TableCell>
                      <TableCell>Expert at navigating waterways and tracking water creatures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stonestride</TableCell>
                      <TableCell>Specializes in mountain terrain with incredible climbing skills</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Falconhand</TableCell>
                      <TableCell>Special affinity for birds of prey as scouts and companions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Duskrunner</TableCell>
                      <TableCell>Most active at twilight with enhanced low-light vision</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Rootwalker</TableCell>
                      <TableCell>Deeply connected to ancient forests, communicates with trees</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Marshstrider</TableCell>
                      <TableCell>Expert at navigating swamps and immune to natural poisons</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Windwhisper</TableCell>
                      <TableCell>Reads wind to predict weather and track scents over distances</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Caveshadow</TableCell>
                      <TableCell>Specializes in underground navigation and tracking in darkness</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Thornshield</TableCell>
                      <TableCell>Protector of sacred groves and endangered plant species</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ashtracker</TableCell>
                      <TableCell>Follows trails through burned forests and devastated landscapes</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Wolfbrother</TableCell>
                      <TableCell>Raised by wolves with uncanny instincts and pack leadership</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stargazer</TableCell>
                      <TableCell>Navigates by stars with knowledge of celestial patterns</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div>
                <h3 className="text-xl font-semibold mb-3">Popular Female Ranger Names</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Meaning/Origin</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">Swiftarrow</TableCell>
                      <TableCell>Known for quick and precise archery</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Nightshade</TableCell>
                      <TableCell>Master of stealth and shadow</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ravenwatch</TableCell>
                      <TableCell>Observant guardian with keen intelligence</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Willowheart</TableCell>
                      <TableCell>Flexible and resilient, yet compassionate</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stormtracker</TableCell>
                      <TableCell>Able to follow trails even in the harshest weather</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Moonwhisper</TableCell>
                      <TableCell>One who moves silently under moonlight</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Fernwalker</TableCell>
                      <TableCell>Expert at navigating dense forest undergrowth</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Eagleeye</TableCell>
                      <TableCell>Renowned for exceptional vision and perception</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Deerfoot</TableCell>
                      <TableCell>One who moves with the grace and speed of a deer</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Misttracker</TableCell>
                      <TableCell>Able to track prey even in foggy conditions</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Moontracker</TableCell>
                      <TableCell>Hunts primarily at night, guided by moonlight</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Foxshadow</TableCell>
                      <TableCell>Known for cunning strategies and outthinking prey</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dewwhisper</TableCell>
                      <TableCell>Tracks by following morning dew disturbances invisible to others</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Hawkfeather</TableCell>
                      <TableCell>Possesses incredible eyesight and precision with ranged weapons</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Brambleheart</TableCell>
                      <TableCell>Protector of thorny thickets and creatures within them</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ivystrider</TableCell>
                      <TableCell>Moves through dense vegetation with supernatural ease</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mistblade</TableCell>
                      <TableCell>Uses fog and mist to conceal movements during hunts</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Emberfoot</TableCell>
                      <TableCell>Tracks across smoldering landscapes and resists extreme heat</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Streamfinder</TableCell>
                      <TableCell>Expert at locating hidden water sources in dry environments</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Owlsight</TableCell>
                      <TableCell>Possesses exceptional night vision and silent movement</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Frostwhisper</TableCell>
                      <TableCell>Specializes in arctic survival and tracking in snow</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Dawntracker</TableCell>
                      <TableCell>Most active at first light when creatures are still drowsy</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Pinewalker</TableCell>
                      <TableCell>Guardian of coniferous forests, communicates with woodland creatures</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Stormheart</TableCell>
                      <TableCell>Fearless in natural disasters, helps communities survive</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Ravensong</TableCell>
                      <TableCell>Mimics bird calls perfectly and uses ravens as messengers</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Mossheart</TableCell>
                      <TableCell>Specializes in healing using rare plants and forest remedies</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Sandstrider</TableCell>
                      <TableCell>Expert at desert survival and tracking in arid environments</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Tidewalker</TableCell>
                      <TableCell>Specializes in coastal regions and predicts dangerous tides</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Gladekeeper</TableCell>
                      <TableCell>Protector of sacred clearings and magical creatures within</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
            
            <p>
              These names have become popular because they effectively convey the skills, values, and connection to nature 
              that define rangers. They serve as inspiration for many aspiring wilderness protectors seeking to forge their own identity.
            </p>
          </div>
        </section>

        {/* Latest Generators */}
        <section className="mb-8 sm:mb-12 border-t border-border pt-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6">Latest Fantasy Generators</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            <Link to="/fantasy/dark-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dark Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Generate names for rangers who have embraced shadow magic</p>
            </Link>
            <Link to="/fantasy/acotar" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">ACOTAR Names</h3>
              <p className="text-sm text-muted-foreground">Create names inspired by the Court of Thorns and Roses series</p>
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

export default RangerNameGenerator; 