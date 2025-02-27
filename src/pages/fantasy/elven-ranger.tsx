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

// Elven Ranger name data
const maleFirstNames = [
  { name: "Legolas", description: "Meaning 'green leaf', symbolizing connection to the forest" },
  { name: "Thranduil", description: "Meaning 'vigorous spring', representing vitality and renewal" },
  { name: "Celeborn", description: "Meaning 'silver tree', symbolizing wisdom and endurance" },
  { name: "Haldir", description: "Meaning 'hidden hero', perfect for a stealthy forest guardian" },
  { name: "Glorfindel", description: "Meaning 'golden-haired', a noble and powerful protector" },
  { name: "Elrohir", description: "Meaning 'elf-knight', a skilled warrior of the woods" },
  { name: "Elladan", description: "Meaning 'elf-man', bridging the gap between elves and other races" },
  { name: "Beleg", description: "Meaning 'mighty', a legendary archer and tracker" },
  { name: "Finrod", description: "Meaning 'golden-haired champion', a noble defender" },
  { name: "Amras", description: "Meaning 'russet-top', referring to reddish hair color" },
  { name: "Amrod", description: "Meaning 'high flame', symbolizing passion for protecting nature" },
  { name: "Caranthir", description: "Meaning 'red-faced', fierce in battle and loyal to the forest" },
  { name: "Celegorm", description: "Meaning 'hasty riser', quick to respond to threats" },
  { name: "Curufin", description: "Meaning 'skillful', master of ranger crafts" },
  { name: "Daeron", description: "Meaning 'shadow of trees', a stealthy forest guardian" },
  { name: "Eöl", description: "Meaning 'dark elf', a mysterious forest dweller" },
  { name: "Fëanor", description: "Meaning 'spirit of fire', passionate defender of the wild" },
  { name: "Fingolfin", description: "Meaning 'skilled Finwë', a master of woodland combat" },
  { name: "Fingon", description: "Meaning 'hair commander', a natural leader of ranger bands" },
  { name: "Finwë", description: "Meaning 'hair', an ancient and wise protector" },
  { name: "Galathil", description: "Meaning 'radiant moon', guiding light in the darkness" },
  { name: "Guilin", description: "Meaning 'songbird', harmonious with nature" },
  { name: "Ithilbor", description: "Meaning 'moon follower', expert night tracker" },
  { name: "Lindir", description: "Meaning 'singer', one who knows the songs of the forest" },
  { name: "Mablung", description: "Meaning 'heavy hand', powerful in combat" },
  { name: "Maedhros", description: "Meaning 'pale glitter', striking appearance" },
  { name: "Maeglin", description: "Meaning 'sharp glance', keen-eyed scout" },
  { name: "Maglor", description: "Meaning 'forging gold', creator of beautiful and useful items" },
  { name: "Mahtan", description: "Meaning 'skilled hand', expert craftsman" },
  { name: "Orodreth", description: "Meaning 'mountain climber', skilled in mountainous terrain" },
  { name: "Oropher", description: "Meaning 'high beech tree', tall and strong" },
  { name: "Saeros", description: "Meaning 'bitter rain', sometimes harsh but necessary" },
  { name: "Turgon", description: "Meaning 'ruling lord', natural leader" },
  { name: "Voronwë", description: "Meaning 'steadfast', loyal to the end" },
  { name: "Aegnor", description: "Meaning 'fell fire', fierce in battle" },
  { name: "Amdir", description: "Meaning 'hope', bringing light to dark places" },
  { name: "Amroth", description: "Meaning 'upclimber', skilled at scaling trees and cliffs" },
  { name: "Angrod", description: "Meaning 'iron champion', unyielding defender" },
  { name: "Aranwë", description: "Meaning 'noble wind', swift and noble" },
  { name: "Círdan", description: "Meaning 'shipwright', connected to rivers and waters" },
  { name: "Denethor", description: "Meaning 'lithe and lank', agile forest runner" },
  { name: "Eärendil", description: "Meaning 'sea-lover', connected to coastal forests" },
  { name: "Ecthelion", description: "Meaning 'fountain lord', guardian of forest springs" },
  { name: "Edrahil", description: "Meaning 'following desire', pursuing justice in the wild" },
  { name: "Egalmoth", description: "Meaning 'pointed helmet', distinctive armor" },
  { name: "Elemmakil", description: "Meaning 'star-sword', skilled night fighter" },
  { name: "Erestor", description: "Meaning 'lone wanderer', solitary forest guardian" },
  { name: "Gildor", description: "Meaning 'star lord', guided by the stars" },
  { name: "Glorfindel", description: "Meaning 'golden-haired', radiant and powerful" }
];

const femaleFirstNames = [
  { name: "Galadriel", description: "Meaning 'maiden crowned with a radiant garland', noble and powerful" },
  { name: "Arwen", description: "Meaning 'noble maiden', graceful yet strong" },
  { name: "Tauriel", description: "Meaning 'forest daughter', born of the woodland realm" },
  { name: "Lúthien", description: "Meaning 'enchantress', magical connection to nature" },
  { name: "Celebrían", description: "Meaning 'silver queen', regal forest protector" },
  { name: "Aredhel", description: "Meaning 'noble elf', fearless hunter" },
  { name: "Idril", description: "Meaning 'sparkling brilliance', bright and quick-witted" },
  { name: "Míriel", description: "Meaning 'jewel-daughter', precious and rare" },
  { name: "Nimrodel", description: "Meaning 'lady of the white cave', connected to hidden places" },
  { name: "Elwing", description: "Meaning 'star-spray', as beautiful as starlight on water" },
  { name: "Finduilas", description: "Meaning 'slender leaf', graceful and deadly" },
  { name: "Nerdanel", description: "Meaning 'strong girl', powerful and wise" },
  { name: "Nimloth", description: "Meaning 'white blossom', pure of heart" },
  { name: "Eärwen", description: "Meaning 'sea-maiden', connected to coastal forests" },
  { name: "Eldalótë", description: "Meaning 'elven flower', beautiful and resilient" },
  { name: "Indis", description: "Meaning 'bride', connected to fertility and growth" },
  { name: "Melian", description: "Meaning 'dear gift', blessed with magical abilities" },
  { name: "Nellas", description: "Meaning 'bell', alert to danger" },
  { name: "Nienor", description: "Meaning 'mourning', understanding of loss" },
  { name: "Silmariën", description: "Meaning 'shining jewel lady', radiant and precious" },
  { name: "Aerin", description: "Meaning 'ocean', vast in knowledge and skill" },
  { name: "Almarian", description: "Meaning 'blessed one', favored by nature" },
  { name: "Anairë", description: "Meaning 'holiest', spiritually connected to the forest" },
  { name: "Andreth", description: "Meaning 'patience', wise and enduring" },
  { name: "Arien", description: "Meaning 'maiden of sunlight', bringing light to dark places" },
  { name: "Beruthiel", description: "Meaning 'angry queen', fierce protector" },
  { name: "Celebrindal", description: "Meaning 'silver-foot', silent and swift" },
  { name: "Elanor", description: "Meaning 'sun-star', bright and hopeful" },
  { name: "Elemmírë", description: "Meaning 'star-jewel', precious guide" },
  { name: "Elenwë", description: "Meaning 'star-person', guided by the stars" },
  { name: "Erendis", description: "Meaning 'lonely woman', solitary guardian" },
  { name: "Fanuilos", description: "Meaning 'ever-white', pure of purpose" },
  { name: "Fíriel", description: "Meaning 'mortal maiden', understanding of life's cycles" },
  { name: "Galadriel", description: "Meaning 'maiden crowned with radiance', powerful and wise" },
  { name: "Gilraen", description: "Meaning 'wandering star', never lost in the forest" },
  { name: "Haleth", description: "Meaning 'tall woman', commanding presence" },
  { name: "Irimë", description: "Meaning 'beautiful', striking appearance" },
  { name: "Lalaith", description: "Meaning 'laughter', finding joy in nature" },
  { name: "Lindórië", description: "Meaning 'singer', knowing the songs of the forest" },
  { name: "Lúthien", description: "Meaning 'enchantress', magical connection to nature" },
  { name: "Mithrellas", description: "Meaning 'grey maiden', blending with shadows" },
  { name: "Morwen", description: "Meaning 'dark maiden', mysterious and powerful" },
  { name: "Nellas", description: "Meaning 'bell', alert to danger" },
  { name: "Nessa", description: "Meaning 'young', swift as a deer" },
  { name: "Níniel", description: "Meaning 'tear-maiden', compassionate healer" },
  { name: "Olwë", description: "Meaning 'branch', connected to the trees" },
  { name: "Tar-Ancalimë", description: "Meaning 'most bright', illuminating the path" },
  { name: "Tar-Telperiën", description: "Meaning 'silver', valuable and precious" },
  { name: "Uinen", description: "Meaning 'water', fluid and adaptable" },
  { name: "Varda", description: "Meaning 'sublime', elevated in spirit and purpose" }
];

const lastNames = [
  { name: "Greenleaf", description: "Connected to the living forest, symbolizing renewal and life" },
  { name: "Silverbow", description: "Master archer, deadly accurate with the bow" },
  { name: "Startracker", description: "Navigates by the stars, never lost in the wilderness" },
  { name: "Moonwhisper", description: "Silent as moonlight, expert in stealth" },
  { name: "Windrunner", description: "Swift as the wind, able to move quickly through any terrain" },
  { name: "Nightshade", description: "Master of darkness, specializing in night operations" },
  { name: "Swiftstride", description: "Covers great distances with ease and speed" },
  { name: "Oakenheart", description: "Strong and resilient like an ancient oak" },
  { name: "Willowhawk", description: "Flexible yet sharp-eyed, missing nothing" },
  { name: "Dawntracker", description: "Follows trails at first light, when signs are freshest" },
  { name: "Forestsong", description: "In harmony with the music of the forest" },
  { name: "Rainshadow", description: "Finds shelter in any storm, expert survivalist" },
  { name: "Leafdancer", description: "Moves gracefully through foliage without disturbing it" },
  { name: "Moonshadow", description: "Blends with shadows cast by moonlight" },
  { name: "Stormrider", description: "Harnesses the power of storms, unafraid of wild weather" },
  { name: "Riverfriend", description: "At home near water, expert in river and stream navigation" },
  { name: "Pathfinder", description: "Discovers new routes through the wilderness" },
  { name: "Treewhisper", description: "Communicates with the ancient trees of the forest" },
  { name: "Stargazer", description: "Reads the stars for guidance and wisdom" },
  { name: "Wildrunner", description: "At one with the untamed wilderness" },
  { name: "Lightfoot", description: "Leaves no trace when passing through the forest" },
  { name: "Thornguard", description: "Protector of wild places, as sharp as thorns to enemies" },
  { name: "Mistwalker", description: "Moves through fog and mist with ease" },
  { name: "Frostleaf", description: "Thrives in winter conditions, resistant to cold" },
  { name: "Sunseeker", description: "Finds light even in the darkest forest" },
  { name: "Vinecaller", description: "Has an affinity with forest plants and vines" },
  { name: "Beastspeaker", description: "Communicates with forest animals" },
  { name: "Skydancer", description: "Agile in the treetops, moving between branches with ease" },
  { name: "Earthsinger", description: "Connected to the ground, sensing vibrations and movements" },
  { name: "Flamehair", description: "With hair like autumn leaves or sunset" },
  { name: "Dewcatcher", description: "Finds water even in the driest conditions" },
  { name: "Wolfriend", description: "Has a special bond with wolves or wolf-like creatures" },
  { name: "Hawkeye", description: "Possesses exceptional vision and accuracy" },
  { name: "Swiftarrow", description: "Renowned for speed and accuracy with a bow" },
  { name: "Dreamwalker", description: "Spiritually connected to the forest, receives visions" },
  { name: "Shadegrove", description: "At home in the darkest parts of the forest" },
  { name: "Brightstream", description: "Follows and protects forest waterways" },
  { name: "Farstrider", description: "Travels to distant and unknown regions" },
  { name: "Highbranch", description: "Prefers the canopy, expert in treetop movement" },
  { name: "Deeproot", description: "Connected to ancient forest wisdom" },
  { name: "Silentfoot", description: "Moves without sound, master of stealth" },
  { name: "Wildbloom", description: "Knowledgeable about forest plants and their uses" },
  { name: "Stormbow", description: "Accurate with a bow even in adverse conditions" },
  { name: "Twilightrunner", description: "Most active at dusk and dawn" },
  { name: "Moonfire", description: "Mysterious and magical, glowing with inner light" },
  { name: "Sunleaf", description: "Draws strength from sunlight" },
  { name: "Winterwhisper", description: "Thrives in the cold season" },
  { name: "Autumnblaze", description: "Vibrant and passionate like fall colors" },
  { name: "Springwater", description: "Brings renewal and healing" },
  { name: "Summerlight", description: "Warm and bright, full of life energy" }
];

const ElvenRangerNameGenerator = () => {
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
      const data = await loadNameData("fantasy", "elven-ranger");
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
        <title>Elven Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your elven ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="elven ranger, fantasy names, name generator, elf, ranger, character names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Elven Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your elven ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Elven Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique elven ranger names</CardDescription>
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
                aria-label="Generate elven ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Elven Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Elven Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Elven Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Elven Rangers are the silent guardians of ancient forests and mystical woodlands. With their 
              unparalleled connection to nature, exceptional archery skills, and ability to move without 
              trace through the wilderness, they serve as protectors of elven realms and natural sanctuaries.
            </p>
            <p>
              These skilled individuals combine the natural grace and longevity of elves with specialized 
              training in wilderness survival, tracking, and combat. They often serve as scouts, messengers, 
              and the first line of defense against those who would threaten their woodland homes.
            </p>
            <p>
              The name of an elven ranger typically reflects both their elven heritage and their special 
              connection to the natural world. This generator helps you create authentic and evocative names 
              for your elven ranger characters in role-playing games, fantasy stories, or any creative project.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Elven Ranger Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good elven ranger name should evoke both the ethereal, graceful nature of elven culture 
              and the ranger's deep connection to the wilderness. Here are some characteristics of effective 
              elven ranger names:
            </p>
            <ul>
              <li><strong>Flowing Sounds:</strong> Elven names typically feature flowing, melodic sounds with many vowels and soft consonants.</li>
              <li><strong>Nature References:</strong> Surnames often include references to natural elements like trees, stars, wind, or animals.</li>
              <li><strong>Poetic Quality:</strong> Names that have an inherent beauty or poetic quality to them.</li>
              <li><strong>Ancient Feeling:</strong> Names that sound ancient and timeless, reflecting the long lifespan of elves.</li>
              <li><strong>Meaningful Elements:</strong> Components that have significance in elven culture or describe the ranger's abilities.</li>
            </ul>
            <p>
              The best elven ranger names combine a traditional elven first name with a surname or epithet 
              that hints at their ranger abilities or their special connection to nature. This creates a name 
              that is both authentically elven and reflective of their ranger profession.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Elven Ranger Name Generator is intuitive and simple:</p>
            <ol>
              <li><strong>Select Gender:</strong> Choose between male and female options to get gender-appropriate first names.</li>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique elven ranger names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that resonates with your character concept.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Mix and Match:</strong> Feel free to mix first names and last names from different generated results to create your perfect combination.</li>
            </ol>
            <p>
              The generator combines traditional elven first names with nature-inspired surnames that reflect 
              the ranger's connection to the wilderness, their skills, or notable traits. This creates balanced 
              names that sound authentically elven while highlighting their ranger profession.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Elven Ranger Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Elven rangers follow several naming traditions that blend standard elven customs with 
              elements unique to their role as wilderness guardians:
            </p>
            <h3>Birth Names and Chosen Names</h3>
            <p>
              Like all elves, rangers receive a birth name from their parents. However, upon completing 
              their ranger training, many choose a new name or epithet that reflects their new identity 
              and connection to nature. For example, an elf named Elrond might become known as "Elrond Startracker" 
              after demonstrating exceptional skill at navigating by the stars.
            </p>
            <h3>Nature Bonds</h3>
            <p>
              Many elven rangers take names that reflect a special connection to a particular aspect of 
              nature. These might reference elements they have an affinity with, animals they share traits 
              with, or natural phenomena they've mastered understanding. A ranger with exceptional night 
              vision might be called "Thranduil Nightshade."
            </p>
            <h3>Deed Names</h3>
            <p>
              Some rangers earn names based on notable deeds or accomplishments. These "deed names" often 
              become more widely known than their birth names. A ranger who saved a forest from fire might 
              become known as "Legolas Flamequencher."
            </p>
            <h3>Ancient Names</h3>
            <p>
              Some elven rangers choose to honor ancient heroes or ancestors by taking elements of their 
              names. This connects them to the long history of elven rangers who came before them and 
              signifies their commitment to upholding those traditions.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Elven Ranger Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most popular elven ranger names, each with its own unique significance:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Male Elven Ranger Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maleFirstNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Female Elven Ranger Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {femaleFirstNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          
          <div className="overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Elven Ranger Surnames</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {lastNames.slice(0, 20).map((name, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{name.name}</TableCell>
                    <TableCell>{name.description}</TableCell>
                  </TableRow>
                ))}
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
            <Link to="/fantasy/dwarf-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dwarf Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create strong and rugged names for dwarven rangers and scouts</p>
            </Link>
            <Link to="/fantasy/chaos-dwarf-city" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Chaos Dwarf City Names</h3>
              <p className="text-sm text-muted-foreground">Generate dark and imposing names for chaos dwarf settlements</p>
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

export default ElvenRangerNameGenerator; 