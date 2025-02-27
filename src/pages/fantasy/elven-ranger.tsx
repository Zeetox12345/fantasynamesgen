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
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Elven Rangers are legendary wilderness guardians who combine the natural grace and longevity of elves with 
              masterful archery and tracking skills. These forest sentinels serve as the first line of defense for elven 
              realms, patrolling ancient woodlands and ensuring that no threats encroach upon their sacred territories.
            </p>
            <p className="mb-4">
              With their intimate connection to nature and centuries to perfect their craft, Elven Rangers develop an 
              almost supernatural ability to move unseen through the wilderness, read the subtle signs of the forest, 
              and strike with deadly precision from the shadows of the trees they protect.
            </p>
            <p>
              This generator creates names for these graceful wilderness protectors, providing you with authentic-sounding 
              elven names that reflect both their heritage and their ranger calling.
            </p>
          </div>
          
          {/* Featured Elven Ranger Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/elven-ranger/elven-ranger-main.jpg"
            alt="Elven Ranger"
            caption="An Elven Ranger moves silently through ancient woods, bow drawn and senses alert to the faintest signs of danger."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Elven Ranger Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good Elven Ranger name should reflect both their elven heritage and their connection to the wilderness. 
              Here are some characteristics that make for effective Elven Ranger names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Flowing Sounds:</span> 
                <span>Melodic names with soft consonants and long vowels that reflect the grace and beauty of elven language.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Nature Elements:</span> 
                <span>References to forests, stars, animals, or natural phenomena that symbolize their connection to the wilderness.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Meaningful Titles:</span> 
                <span>Epithets or titles that describe their role as protectors, hunters, or guides in the wild.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Ancient Quality:</span> 
                <span>Names that sound timeless and ancient, reflecting the long-lived nature of elves.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subtle Strength:</span> 
                <span>Names that convey quiet power and resilience rather than brute force.</span>
              </li>
            </ul>
            <p>
              The best Elven Ranger names often combine a lyrical first name with a surname or epithet that hints at 
              their wilderness expertise, creating a name that feels both authentically elven and fitting for a ranger.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Elven Ranger Name Generator is straightforward:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Select Gender:</span> Choose whether you want male, female, or gender-neutral names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique Elven Ranger names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your character.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Mix and Match:</span> Feel free to combine different first names and surnames from the generated results to create your perfect Elven Ranger name.
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
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Elven Ranger Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Elven Rangers follow distinct naming patterns that reflect both their cultural heritage and their wilderness profession:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Birth Names</h3>
                <p>
                  Elven Rangers typically receive a birth name that follows traditional elven naming conventions. These names 
                  are often melodic and flowing, with many syllables and elegant sounds. Examples might include Thalion, Elanor, 
                  Galadhriel, or Legolas.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Family Names</h3>
                <p>
                  Many elves have family names that trace their lineage back through centuries. For Rangers, these names might 
                  reference ancient forests, celestial bodies, or legendary ancestors. Examples include Starleaf, Moonwhisper, 
                  or Silverbow.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Chosen Names</h3>
                <p>
                  Some Elven Rangers adopt new names when they take up the mantle of wilderness guardian. These chosen names 
                  often reflect their personal connection to nature or a significant event in their lives. A ranger might be 
                  known as "Wolfriend," "Stormwalker," or "Dawntracker."
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Honorifics and Titles</h3>
                <p>
                  Accomplished Elven Rangers may earn honorifics or titles that are added to their names. These might indicate 
                  their rank within ranger society, special skills, or notable achievements. Titles like "Pathfinder," "Master 
                  of Shadows," or "Guardian of the Eastern Marches" might be used formally or in certain contexts.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Elven Ranger Names</h2>
          <p className="text-lg mb-6 text-muted-foreground/90">Below are some renowned elven ranger names that have become popular in fantasy settings:</p>
          
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