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

// Space Ranger name data
const maleFirstNames = [
  { name: "Zephyr", description: "A cosmic wind that travels through the stars" },
  { name: "Orion", description: "Named after the famous constellation, representing strength and hunting prowess" },
  { name: "Nova", description: "Inspired by the explosive power of a star" },
  { name: "Stellar", description: "One who shines brightly like a star" },
  { name: "Cosmo", description: "Relating to the cosmos and universe" },
  { name: "Astro", description: "Connected to the stars and celestial bodies" },
  { name: "Nebula", description: "Named after the cosmic cloud formations" },
  { name: "Comet", description: "Fast and bright like a comet streaking through space" },
  { name: "Pulsar", description: "Emitting powerful energy like a rotating neutron star" },
  { name: "Quasar", description: "Extremely luminous and powerful" },
  { name: "Zenith", description: "The highest point in the celestial sphere" },
  { name: "Eclipse", description: "One who can obscure enemies like a cosmic eclipse" },
  { name: "Meteor", description: "Fast and impactful like a meteor" },
  { name: "Vortex", description: "Creating a swirling force in battle" },
  { name: "Helios", description: "Named after the Greek sun god" },
  { name: "Atlas", description: "A titan who bears great responsibility" },
  { name: "Phoenix", description: "Rising from the ashes with renewed strength" },
  { name: "Titan", description: "Enormous strength and power" },
  { name: "Rigel", description: "Named after one of the brightest stars in the night sky" },
  { name: "Sirius", description: "Named after the brightest star in Earth's night sky" },
  { name: "Altair", description: "Named after a bright star in the Aquila constellation" },
  { name: "Vega", description: "Named after one of the brightest stars in the northern hemisphere" },
  { name: "Antares", description: "Named after the red supergiant star" },
  { name: "Arcturus", description: "Named after the brightest star in the northern celestial hemisphere" },
  { name: "Polaris", description: "Steadfast and reliable like the North Star" },
  { name: "Draco", description: "Named after the dragon constellation" },
  { name: "Lyra", description: "Named after the constellation containing Vega" },
  { name: "Perseus", description: "Named after the Greek hero who slew Medusa" },
  { name: "Cepheus", description: "Named after the king in Greek mythology" },
  { name: "Hyperion", description: "Named after the Titan of light in Greek mythology" },
  { name: "Oberon", description: "Named after the king of the fairies in Shakespeare's works" },
  { name: "Triton", description: "Named after Neptune's largest moon" },
  { name: "Deimos", description: "Named after one of Mars' moons, meaning 'dread'" },
  { name: "Phobos", description: "Named after one of Mars' moons, meaning 'fear'" },
  { name: "Io", description: "Named after one of Jupiter's moons" },
  { name: "Callisto", description: "Named after one of Jupiter's moons" },
  { name: "Europa", description: "Named after one of Jupiter's moons" },
  { name: "Ganymede", description: "Named after one of Jupiter's moons" },
  { name: "Titan", description: "Named after Saturn's largest moon" },
  { name: "Enceladus", description: "Named after one of Saturn's moons" },
  { name: "Oberon", description: "Named after one of Uranus' moons" },
  { name: "Titania", description: "Named after one of Uranus' moons" },
  { name: "Triton", description: "Named after Neptune's largest moon" },
  { name: "Charon", description: "Named after Pluto's largest moon" },
  { name: "Eris", description: "Named after the dwarf planet" },
  { name: "Ceres", description: "Named after the dwarf planet" },
  { name: "Makemake", description: "Named after the dwarf planet" },
  { name: "Haumea", description: "Named after the dwarf planet" },
  { name: "Sedna", description: "Named after the trans-Neptunian object" },
  { name: "Quaoar", description: "Named after the trans-Neptunian object" }
];

const femaleFirstNames = [
  { name: "Lyra", description: "Named after the constellation with the star Vega" },
  { name: "Celeste", description: "Relating to the celestial and heavenly" },
  { name: "Aurora", description: "Named after the cosmic light display" },
  { name: "Stella", description: "Meaning 'star' in Latin" },
  { name: "Andromeda", description: "Named after the galaxy closest to the Milky Way" },
  { name: "Luna", description: "Meaning 'moon' in Latin" },
  { name: "Astra", description: "Relating to the stars" },
  { name: "Nova", description: "A star that suddenly increases in brightness" },
  { name: "Cassiopeia", description: "Named after the constellation" },
  { name: "Vela", description: "Named after the constellation" },
  { name: "Carina", description: "Named after the constellation" },
  { name: "Estella", description: "Meaning 'star' in Spanish" },
  { name: "Solara", description: "Relating to the sun" },
  { name: "Galaxia", description: "Relating to galaxies" },
  { name: "Nebula", description: "Named after the cosmic cloud formations" },
  { name: "Celestia", description: "Relating to the heavens" },
  { name: "Astra", description: "Relating to the stars" },
  { name: "Selene", description: "Named after the Greek goddess of the moon" },
  { name: "Elara", description: "Named after one of Jupiter's moons" },
  { name: "Callisto", description: "Named after one of Jupiter's moons" },
  { name: "Europa", description: "Named after one of Jupiter's moons" },
  { name: "Io", description: "Named after one of Jupiter's moons" },
  { name: "Titania", description: "Named after one of Uranus' moons" },
  { name: "Miranda", description: "Named after one of Uranus' moons" },
  { name: "Ariel", description: "Named after one of Uranus' moons" },
  { name: "Cordelia", description: "Named after one of Uranus' moons" },
  { name: "Ophelia", description: "Named after one of Uranus' moons" },
  { name: "Bianca", description: "Named after one of Uranus' moons" },
  { name: "Juliet", description: "Named after one of Uranus' moons" },
  { name: "Portia", description: "Named after one of Uranus' moons" },
  { name: "Rosalind", description: "Named after one of Uranus' moons" },
  { name: "Belinda", description: "Named after one of Uranus' moons" },
  { name: "Puck", description: "Named after one of Uranus' moons" },
  { name: "Galatea", description: "Named after one of Neptune's moons" },
  { name: "Larissa", description: "Named after one of Neptune's moons" },
  { name: "Despina", description: "Named after one of Neptune's moons" },
  { name: "Thalassa", description: "Named after one of Neptune's moons" },
  { name: "Naiad", description: "Named after one of Neptune's moons" },
  { name: "Halimede", description: "Named after one of Neptune's moons" },
  { name: "Sao", description: "Named after one of Neptune's moons" },
  { name: "Laomedeia", description: "Named after one of Neptune's moons" },
  { name: "Psamathe", description: "Named after one of Neptune's moons" },
  { name: "Neso", description: "Named after one of Neptune's moons" },
  { name: "Hydra", description: "Named after Pluto's moon" },
  { name: "Nix", description: "Named after Pluto's moon" },
  { name: "Kerberos", description: "Named after Pluto's moon" },
  { name: "Styx", description: "Named after Pluto's moon" },
  { name: "Dysnomia", description: "Named after Eris' moon" },
  { name: "Namaka", description: "Named after Haumea's moon" },
  { name: "Hi'iaka", description: "Named after Haumea's moon" }
];

const lastNames = [
  { name: "Starstrider", description: "One who traverses the stars with ease" },
  { name: "Voidwalker", description: "One who walks through the void of space" },
  { name: "Nebulacrest", description: "Bearing the crest of the nebula" },
  { name: "Cosmoshield", description: "Protector of the cosmos" },
  { name: "Galaxyweaver", description: "One who weaves through galaxies" },
  { name: "Stardust", description: "Made from the dust of stars" },
  { name: "Solarsurge", description: "Powerful like a solar flare" },
  { name: "Astralguard", description: "Guardian of the astral plane" },
  { name: "Moonrider", description: "One who rides on moonbeams" },
  { name: "Stellarshot", description: "Accurate like a shooting star" },
  { name: "Voidhunter", description: "Hunter in the void of space" },
  { name: "Cometseeker", description: "One who seeks out comets" },
  { name: "Pulsarfist", description: "With fists as powerful as pulsars" },
  { name: "Quasarblaze", description: "Blazing like a quasar" },
  { name: "Meteorstrike", description: "Striking with the force of a meteor" },
  { name: "Constellationforger", description: "Forger of new constellations" },
  { name: "Galaxystrider", description: "One who strides across galaxies" },
  { name: "Starforge", description: "Forger of stars" },
  { name: "Voidbringer", description: "One who brings the void" },
  { name: "Cosmicflare", description: "Flaring with cosmic energy" },
  { name: "Solarwind", description: "Fast like the solar wind" },
  { name: "Astralseeker", description: "Seeker of astral knowledge" },
  { name: "Moonshade", description: "Hidden in the shade of the moon" },
  { name: "Stellarshield", description: "Protected by stellar energy" },
  { name: "Voidmaster", description: "Master of the void" },
  { name: "Comettrail", description: "Leaving a trail like a comet" },
  { name: "Pulsarbeam", description: "Beaming with pulsar energy" },
  { name: "Quasarlight", description: "Illuminated by quasar light" },
  { name: "Meteorshower", description: "Showering enemies with meteor-like attacks" },
  { name: "Constellationkeeper", description: "Keeper of the constellations" },
  { name: "Galaxykeeper", description: "Keeper of the galaxy" },
  { name: "Starshaper", description: "Shaper of stars" },
  { name: "Voidshaper", description: "Shaper of the void" },
  { name: "Cosmicweaver", description: "Weaver of cosmic energy" },
  { name: "Solarflare", description: "Flaring like the sun" },
  { name: "Astralweaver", description: "Weaver of astral energy" },
  { name: "Moonweaver", description: "Weaver of moonlight" },
  { name: "Stellarweaver", description: "Weaver of stellar energy" },
  { name: "Voidweaver", description: "Weaver of void energy" },
  { name: "Cometweaver", description: "Weaver of comet energy" },
  { name: "Pulsarweaver", description: "Weaver of pulsar energy" },
  { name: "Quasarweaver", description: "Weaver of quasar energy" },
  { name: "Meteorweaver", description: "Weaver of meteor energy" },
  { name: "Constellationweaver", description: "Weaver of constellation energy" },
  { name: "Galaxyweaver", description: "Weaver of galaxy energy" },
  { name: "Starweaver", description: "Weaver of star energy" },
  { name: "Voidweaver", description: "Weaver of void energy" },
  { name: "Cosmicweaver", description: "Weaver of cosmic energy" },
  { name: "Solarweaver", description: "Weaver of solar energy" },
  { name: "Astralweaver", description: "Weaver of astral energy" }
];

const SpaceRangerNameGenerator = () => {
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
      const data = await loadNameData("fantasy", "space-ranger");
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
        <title>Space Ranger Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate the perfect name for your space ranger character. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="space ranger, sci-fi names, name generator, space, ranger, character names, RPG names" />
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
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Space Ranger Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate the perfect name for your space ranger character.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Space Ranger Names</CardTitle>
            <CardDescription>Select gender and generate unique space ranger names</CardDescription>
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
                aria-label="Generate space ranger names"
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Space Ranger Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Space Ranger Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Space Ranger Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Introduction</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              Space Rangers are elite cosmic defenders who patrol the vast reaches of space, 
              protecting planets, star systems, and galaxies from various threats. These brave individuals come from diverse backgrounds 
              and species, but they all share a common purpose: to maintain peace and order throughout the cosmos.
            </p>
            <p className="mb-4">
              The name of a Space Ranger often reflects their cosmic connection, drawing inspiration from celestial 
              bodies, astronomical phenomena, and cosmic energies. A well-chosen name can convey a ranger's strength, 
              agility, intelligence, and their special connection to the stars.
            </p>
            <p>
              This generator helps you create the perfect name for your Space Ranger character, whether for a role-playing 
              game, a science fiction story, or any creative project that involves these galactic guardians.
            </p>
          </div>
          
          {/* Featured Space Ranger Image */}
          <GeneratorImage 
            src="/images/categories/fantasy/space-ranger/space-ranger-main.jpg"
            alt="Space Ranger"
            caption="Space Rangers are elite cosmic defenders who patrol the vast reaches of space, protecting planets and star systems from various threats."
          />
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">What is a Good Space Ranger Name?</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">
              A good Space Ranger name should evoke the vastness of space and the heroic nature of these cosmic defenders. 
              Here are some characteristics of effective Space Ranger names:
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Celestial References:</span> 
                <span>Names that reference stars, planets, constellations, or other cosmic phenomena.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Powerful Sounds:</span> 
                <span>Strong consonants and clear vowels that convey strength and determination.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Memorable Quality:</span> 
                <span>Names that are easy to remember but unique enough to stand out.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Heroic Undertones:</span> 
                <span>Elements that suggest heroism, protection, or guardianship.</span>
              </li>
              <li className="flex gap-2">
                <span className="font-semibold text-primary min-w-[180px]">Cultural Blend:</span> 
                <span>A mix of familiar and alien-sounding elements to suggest a cosmic origin.</span>
              </li>
            </ul>
            <p>
              The best Space Ranger names often combine a personal name that reflects the individual's character with a surname 
              or title that indicates their role or special abilities as a defender of the cosmos.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">How to Use the Generator</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-4">Using our Space Ranger Name Generator is simple and intuitive:</p>
            <ol className="space-y-3 mb-6 pl-5">
              <li className="pl-2">
                <span className="font-semibold text-primary">Select Gender:</span> Choose between male and female options to get gender-appropriate first names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Generate Names:</span> Click the "Generate Names" button to create a list of 10 unique Space Ranger names.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Browse Results:</span> Look through the generated names to find one that suits your character.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Regenerate if Needed:</span> If none of the names appeal to you, simply click the button again for a new set.
              </li>
              <li className="pl-2">
                <span className="font-semibold text-primary">Mix and Match:</span> Feel free to mix first names and last names from different generated results to create your perfect combination.
              </li>
            </ol>
            <p>
              The generator combines first names inspired by celestial bodies and astronomical terms with last names that 
              evoke the heroic and protective nature of Space Rangers. This creates balanced names that sound both cosmic and powerful.
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Space Ranger Naming Traditions</h2>
          <div className="prose prose-lg max-w-none leading-relaxed text-muted-foreground/90">
            <p className="mb-5">
              Space Rangers follow several naming traditions that have evolved over centuries of cosmic protection:
            </p>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Celestial Inspiration</h3>
                <p>
                  Many Space Rangers adopt names inspired by celestial bodies. This tradition began with the first rangers who felt a 
                  deep connection to the stars they protected. Names like Orion Starstrider or Lyra Voidwalker follow this tradition.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Functional Surnames</h3>
                <p>
                  Space Ranger surnames often describe their function or special abilities. Names like Cosmoshield, Voidhunter, or 
                  Stellarshot indicate the ranger's role or special talent in cosmic defense.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Honorific Titles</h3>
                <p>
                  Some rangers earn special titles after notable achievements. These titles may replace or supplement their original names. 
                  For example, a ranger might be known as "Nova the Nebula Guardian" after protecting a significant nebula from destruction.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-primary">Homeworld References</h3>
                <p>
                  Rangers sometimes incorporate references to their home planets or star systems in their names, especially if they come 
                  from notable cosmic locations. This helps maintain a connection to their origins while serving throughout the cosmos.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-10 sm:mb-14">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 sm:mb-5 text-primary">Most Popular Space Ranger Names</h2>
          <p className="text-lg mb-6 text-muted-foreground/90">Below is a collection of the most iconic space ranger names, each with its own cosmic significance:</p>
          
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
            <Link to="/fantasy/chaos-dwarf-city" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Chaos Dwarf City Names</h3>
              <p className="text-sm text-muted-foreground">Generate dark and imposing names for chaos dwarf settlements</p>
            </Link>
            <Link to="/fantasy/dwarf-ranger" className="block p-4 rounded-lg border border-border hover:border-primary transition-colors">
              <h3 className="font-bold mb-2">Dwarf Ranger Names</h3>
              <p className="text-sm text-muted-foreground">Create strong and rugged names for dwarven rangers and scouts</p>
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

export default SpaceRangerNameGenerator; 