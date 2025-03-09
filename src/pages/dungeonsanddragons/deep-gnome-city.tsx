import { useState, useEffect } from "react";
import { Sword, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Helmet } from "react-helmet";
import { GeneratorImage } from "@/components/GeneratorImage";

const DeepGnomeCityNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<any | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedName, setSelectedName] = useState<string | null>(null);
  const [nameDescription, setNameDescription] = useState<string | null>(null);

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      try {
        // Import the data directly
        const data = await import('@/data/dnd/deep-gnome-city.json');
        setNameData(data.default || data);
      } catch (error) {
        console.error("Error loading D&D deep gnome city name data:", error);
      } finally {
        setLoading(false);
      }
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData || !nameData.cityNames || !nameData.cityNames.length) {
      console.error("No D&D deep gnome city name data available");
      return;
    }
    
    // Randomly select 10 names from the data
    const shuffled = [...nameData.cityNames].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, 10);
    setGeneratedNames(selected.map(entry => entry.name));
  };

  const handleNameClick = (name: string) => {
    if (!nameData || !nameData.cityNames) return;
    
    setSelectedName(name);
    
    // Find the description for the selected name
    const nameEntry = nameData.cityNames.find(entry => entry.name === name);
    if (nameEntry) {
      setNameDescription(nameEntry.description);
    } else {
      setNameDescription(null);
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>DnD Deep Gnome City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate 10,000+ mysterious and underground names for deep gnome settlements in DnD. Create the perfect Underdark community with our free name generator!" />
        <meta name="keywords" content="DnD, Dungeons and Dragons, deep gnome, svirfneblin, Underdark, city names, settlement names, fantasy names, RPG, tabletop games" />
      </Helmet>
      <div className="max-w-7xl mx-auto">
        {/* Header with back button */}
        <div className="mb-6 sm:mb-8">
          <Link 
            to="/dungeonsanddragons" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-primary transition-colors mb-4 sm:mb-6"
            onClick={() => window.scrollTo(0, 0)}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 mr-2"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
            Back to Dungeons and Dragons
          </Link>
          
          <div className="flex items-center gap-3 sm:gap-4 mb-3 sm:mb-4">
            <div className="p-2 sm:p-3 rounded-lg bg-primary/10 text-primary">
              <Sword className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">DnD Deep Gnome City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate mysterious and underground names for deep gnome settlements in your DnD campaign.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Deep Gnome City Names</CardTitle>
            <CardDescription>Create mysterious and underground names for deep gnome settlements</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 sm:gap-6">
              <Button 
                onClick={generateNamesHandler} 
                className="w-full sm:w-auto"
                disabled={loading}
                aria-label="Generate deep gnome city names"
              >
                {loading ? "Loading..." : "Generate Deep Gnome City Names"}
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What Makes a Good Deep Gnome City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#deep-gnome-culture" className="text-primary hover:underline">Deep Gnome Culture in DnD</a>
              </li>
              <li>
                <a href="#famous-settlements" className="text-primary hover:underline">Famous Deep Gnome Settlements</a>
              </li>
              <li>
                <a href="#latest-generators" className="text-primary hover:underline">Latest Generators</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Deep in the twisting caverns of the Underdark, the svirfneblin—or deep gnomes—have carved out 
              a precarious existence. These resilient beings have established hidden communities far from the 
              surface world, developing unique cultures and architectural styles adapted to their subterranean 
              environment.
            </p>
            <p className="mb-4">
              Deep gnome city names in DnD often reflect their underground nature and the challenges of 
              Underdark life. They typically incorporate elements of the svirfneblin language, with its 
              distinctive consonant clusters and references to stone, gems, and the constant dangers that 
              surround them.
            </p>
            <p>
              Whether you're a Dungeon Master creating a new Underdark location, designing a deep gnome 
              character's backstory, or planning an adventure into the depths below, this generator provides 
              authentic-sounding names that capture the mysterious and resilient nature of deep gnome 
              settlements.
            </p>
          </div>
          
          {/* Hero Image */}
          <GeneratorImage 
            src="/images/categories/dungeonsanddragons/deep-gnome-city/deep-gnome-city-main.jpg" 
            alt="DnD Deep Gnome City Names" 
            caption="Create mysterious and underground names for deep gnome settlements in your DnD campaign"
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What Makes a Good Deep Gnome City Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A compelling deep gnome settlement name should evoke their underground culture and environment:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Mineral References:</span> 
                <span>Names that incorporate terms for gems, ores, or stone types (like "Quartzholm" or "Galena Deep") connect to the deep gnomes' expertise in mining and stonework.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Consonant Clusters:</span> 
                <span>Authentic svirfneblin names often feature distinctive consonant combinations that can be challenging for other races to pronounce, like "Blingdenstone" or "Kholthralzak."</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Defensive Elements:</span> 
                <span>References to protection, hiding, or vigilance reflect the constant dangers of Underdark life and the deep gnomes' need for security.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Subterranean Features:</span> 
                <span>Names that reference caverns, tunnels, depths, or underground features create an immediate sense of place.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Illusory Qualities:</span> 
                <span>Deep gnomes are known for their illusory magic, so names that suggest deception, misdirection, or hidden qualities are particularly fitting.</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Using this generator is simple:
            </p>
            <ol className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">1.</span> 
                <span>Click the "Generate Deep Gnome City Names" button to create a list of mysterious underground settlement names.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">2.</span> 
                <span>Click on any name to see more details about the potential characteristics or features of that particular settlement.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">3.</span> 
                <span>Generate as many times as you like until you find the perfect name for your Underdark location.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[40px]">4.</span> 
                <span>Use the descriptions as inspiration for developing the settlement's history, appearance, and notable features in your campaign.</span>
              </li>
            </ol>
          </div>
        </section>

        {/* Deep Gnome Culture */}
        <section id="deep-gnome-culture" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Deep Gnome Culture in DnD</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Understanding deep gnome society can help you create more authentic settlements:
            </p>
            <ul className="space-y-4 mb-6">
              <li>
                <h3 className="font-semibold text-primary text-lg">Survival Focus</h3>
                <p>Deep gnome communities are built around survival in the hostile Underdark. Their settlements are typically well-hidden, heavily fortified, and designed with multiple escape routes. This survival mindset influences everything from architecture to governance.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Mining and Crafting</h3>
                <p>Most svirfneblin settlements are centered around mining operations, gem cutting, and stonework. Their cities often incorporate natural caverns enhanced by their expert stonework, with homes and civic buildings carved directly into the rock.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Illusory Defenses</h3>
                <p>Deep gnomes are naturally talented with illusion magic, which they use extensively to hide entrances to their settlements, disguise important locations, and confuse potential invaders. Some cities might appear to be simple cave systems until the illusions are penetrated.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Communal Living</h3>
                <p>Space is often at a premium in the Underdark, leading to compact, efficient settlement designs. Deep gnome communities tend to be tightly-knit, with strong emphasis on cooperation and shared resources for the good of all.</p>
              </li>
              <li>
                <h3 className="font-semibold text-primary text-lg">Religious Practices</h3>
                <p>Many deep gnomes worship Callarduran Smoothhands, the god of mining and stonework, or Segojan Earthcaller, patron of the earth and nature. Their settlements often include shrines or temples dedicated to these deities, typically located in especially beautiful natural caverns.</p>
              </li>
            </ul>
          </div>
        </section>

        {/* Famous Settlements */}
        <section id="famous-settlements" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Famous Deep Gnome Settlements</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              These notable deep gnome cities from DnD lore can inspire your own creations:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Blingdenstone</h3>
                    <p>Perhaps the most famous svirfneblin settlement, Blingdenstone was once a thriving city in the Upperdark beneath the Silver Marches. Destroyed by drow and later by demons, it has been reclaimed and rebuilt by returning deep gnomes.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Calabra</h3>
                    <p>A hidden city known for its extensive gem mines and master jewelers. The settlement is built around a massive central cavern with terraced dwellings carved into the walls, connected by narrow bridges and staircases.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glitterhome</h3>
                    <p>Named for the mineral deposits that cause its cavern walls to sparkle in even the faintest light, Glitterhome is known for its illusionists and the magical gems they create.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Stonehollow</h3>
                    <p>Built within a network of perfectly spherical caverns, Stonehollow is renowned for its acoustic properties. Deep gnome musicians come from across the Underdark to perform in its central chamber.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Malydren</h3>
                    <p>A relatively young settlement established around a rare freshwater lake in the Underdark. Malydren has developed unusual fishing techniques and boat-building skills uncommon among deep gnomes.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Crystaldelve</h3>
                    <p>Famous for its crystal gardens where rare minerals are cultivated using specialized fungi and magical techniques, producing gems with unique magical properties.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Quartz Haven</h3>
                    <p>Built inside a massive geode, this settlement's walls are lined with enormous quartz crystals that amplify the deep gnomes' innate magical abilities.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glimmerdeep</h3>
                    <p>Known for its phosphorescent fungi gardens that provide both food and light, creating a perpetual twilight atmosphere throughout the settlement.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Shadowshimmer</h3>
                    <p>A city where the boundaries between the Material Plane and Shadowfell are thin, allowing deep gnomes to harness shadow magic for their illusions and defenses.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Gemhold</h3>
                    <p>Built around a massive ruby deposit, this city's buildings are reinforced with gem-infused stone that glows with a soft red light and strengthens magical wards.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Mistwall</h3>
                    <p>Protected by a permanent magical mist that confuses intruders and enhances the deep gnomes' illusion magic, making the city nearly impossible to find without a guide.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Deepburrow</h3>
                    <p>A network of small, interconnected tunnels too narrow for larger races to navigate comfortably, providing natural defense against many Underdark predators.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glimmershadow</h3>
                    <p>Known for its unique architecture that plays with light and shadow, creating buildings that appear to shift and change depending on the angle of observation.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Stonesong</h3>
                    <p>Built in a cavern with remarkable natural acoustics, where the deep gnomes have developed a unique form of stone-shaping magic activated by specific musical notes.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Crystalvault</h3>
                    <p>A city built around a massive vault containing the most precious gemstones and magical crystals discovered by deep gnomes throughout the Underdark.</p>
                  </li>
                </ul>
              </div>
              <div>
                <ul className="space-y-4 mb-6">
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glitterhaunt</h3>
                    <p>A city built in the ruins of an ancient aboleth complex, where the deep gnomes have repurposed strange alien technology and architecture for their own use.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Shimmerhold</h3>
                    <p>Famous for its walls embedded with thousands of tiny mirrors that reflect even the smallest light source, creating a dazzling display that confuses intruders.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Darkhaven</h3>
                    <p>A settlement where deep gnomes have adapted to total darkness, developing a society that functions without light and relies entirely on other senses.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Gemseeker's Rest</h3>
                    <p>A trading hub where deep gnome prospectors return with their discoveries, featuring a bustling marketplace specializing in rare minerals and gems.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Whispering Depths</h3>
                    <p>Built near natural steam vents that create a constant whispering sound, used by the inhabitants for secret communication through the city's pipe system.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Illusionweave</h3>
                    <p>A city where permanent illusions are woven into the very architecture, creating buildings that appear larger, more elaborate, or completely different than their actual form.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Echocavern</h3>
                    <p>Known for its unique warning system that uses the cavern's natural acoustics to alert the entire settlement of approaching danger through specific echo patterns.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Mithraldeep</h3>
                    <p>Built adjacent to a mithral deposit, this settlement specializes in crafting lightweight but durable tools and armor perfect for the small-statured deep gnomes.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Crystalspire</h3>
                    <p>Centered around a massive crystal formation that reaches from floor to ceiling of an enormous cavern, serving as both a landmark and a focus for the community's magical energies.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glimmerstone</h3>
                    <p>Famous for its buildings constructed from a rare stone that absorbs light during the day and gently releases it at night, creating a natural day/night cycle underground.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Shadowsong</h3>
                    <p>A settlement where deep gnomes have developed a unique form of magic that combines sound and shadow, creating illusions that can be both seen and heard.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Deepshimmer</h3>
                    <p>Built around a subterranean river filled with bioluminescent algae, providing both a natural light source and a means of transportation through the Underdark.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Stonewhisper</h3>
                    <p>Known for its stone-speaking sages who can communicate with the very rocks of the Underdark, predicting cave-ins and discovering new mineral deposits.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Glitterdust</h3>
                    <p>Named for the magical sparkling dust that permeates the air, a byproduct of the extensive gem-cutting industry that forms the backbone of the settlement's economy.</p>
                  </li>
                  <li>
                    <h3 className="font-semibold text-primary text-lg">Hiddenheim</h3>
                    <p>A city that exists in plain sight within a drow-controlled territory, completely concealed by powerful illusions and appearing as nothing more than an unremarkable cave system.</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Latest Generators */}
        <section id="latest-generators" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Latest Generators</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Female Half-Elf Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate elegant and diverse names for female half-elf characters</p>
                <Link to="/dungeonsanddragons/female-half-elf" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dwarf City Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Create authentic and immersive names for dwarven cities and strongholds</p>
                <Link to="/dungeonsanddragons/dwarf-city" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Dark Urge Name Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground mb-4">Generate mysterious and ominous names for your dark urge characters</p>
                <Link to="/dungeonsanddragons/dark-urge" onClick={() => window.scrollTo(0, 0)}>
                  <Button variant="outline" size="sm" className="w-full">Try Generator</Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DeepGnomeCityNameGenerator; 