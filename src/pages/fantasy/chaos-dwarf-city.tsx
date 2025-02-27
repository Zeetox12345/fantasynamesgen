import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Wand2, Building2, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { loadNameData, generateNames, LocationNameData } from "@/lib/nameUtils";

// REMOVE hardcoded arrays
// const prefixes = [ ... ];
// const suffixes = [ ... ];
// const modifiers = [ ... ];

const ChaosDwarfCityNameGenerator = () => {
  const [generatedNames, setGeneratedNames] = useState<string[]>([]);
  const [nameData, setNameData] = useState<LocationNameData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<"cityNames" | "districtNames" | "landmarkNames">("cityNames");

  // Load name data when component mounts
  useEffect(() => {
    async function fetchNameData() {
      setLoading(true);
      const data = await loadNameData("fantasy", "chaos-dwarf-city");
      setNameData(data as LocationNameData);
      setLoading(false);
    }
    
    fetchNameData();
  }, []);

  const generateNamesHandler = () => {
    if (!nameData) return;
    
    const newNames = generateNames(nameData, { nameType: activeTab }, 10);
    setGeneratedNames(newNames);
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case "cityNames": return <Building2 className="h-4 w-4 mr-2" />;
      case "districtNames": return <Map className="h-4 w-4 mr-2" />;
      case "landmarkNames": return <Wand2 className="h-4 w-4 mr-2" />;
      default: return <Building2 className="h-4 w-4 mr-2" />;
    }
  };

  const getTabTitle = (tab: string) => {
    switch (tab) {
      case "cityNames": return "Chaos Dwarf Cities";
      case "districtNames": return "Districts";
      case "landmarkNames": return "Landmarks";
      default: return "Names";
    }
  };

  return (
    <div className="min-h-screen py-8 px-4 sm:py-12 sm:px-6">
      <Helmet>
        <title>Chaos Dwarf City Name Generator - 10,000+ Names | FantasyNamesGen</title>
        <meta name="description" content="Generate names for Chaos Dwarf cities, districts, and landmarks. Over 10,000 unique name combinations available." />
        <meta name="keywords" content="chaos dwarf, warhammer, fantasy names, city names, name generator" />
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
              <Building2 className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold">Chaos Dwarf City Name Generator</h1>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground">Generate dark and imposing names for Chaos Dwarf settlements, districts, and landmarks.</p>
        </div>

        {/* Generator Card */}
        <Card className="glass-card mb-6 sm:mb-8">
          <CardHeader className="pb-3 sm:pb-4">
            <CardTitle className="text-xl sm:text-2xl">Generate Chaos Dwarf Location Names</CardTitle>
            <CardDescription>
              Select what to generate and click the button
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="cityNames" 
              value={activeTab} 
              onValueChange={(v) => setActiveTab(v as any)}
              className="mb-4"
            >
              <TabsList className="grid grid-cols-3">
                <TabsTrigger value="cityNames">
                  <Building2 className="h-4 w-4 mr-2" />
                  Cities
                </TabsTrigger>
                <TabsTrigger value="districtNames">
                  <Map className="h-4 w-4 mr-2" />
                  Districts
                </TabsTrigger>
                <TabsTrigger value="landmarkNames">
                  <Wand2 className="h-4 w-4 mr-2" />
                  Landmarks
                </TabsTrigger>
              </TabsList>
            </Tabs>
            
            <Button onClick={generateNamesHandler} disabled={loading} className="w-full mb-4">
              {getTabIcon(activeTab)}
              Generate {getTabTitle(activeTab)}
            </Button>
            
            {loading && <p>Loading name data...</p>}
            
            {!loading && generatedNames.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {generatedNames.map((name, index) => {
                    // Find description of the name
                    const nameList = nameData?.[activeTab as keyof LocationNameData] as any[];
                    const entry = nameList?.find(e => e.name === name);
                    
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{name}</TableCell>
                        <TableCell>{entry?.description}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            )}
            
            {!loading && generatedNames.length === 0 && (
              <div className="text-center p-6 text-muted-foreground">
                Click "Generate" to create {getTabTitle(activeTab).toLowerCase()}
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Information Section */}
        <Card className="glass-card">
          <CardHeader>
            <CardTitle className="text-xl sm:text-2xl">About Chaos Dwarf Locations</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <p>
              Chaos Dwarf settlements are dark, imposing places built on slavery, industry and the worship of dark gods. Their architecture features harsh angles, black stone, and decorative elements that inspire terror.
            </p>
            <p>
              The major city of the Chaos Dwarfs is <strong>Zharr-Naggrund</strong>, the Great Black Fortress. This terrifying ziggurat-city rises like a black mountain from the volcanic Plain of Zharrduk.
            </p>
            <p>
              Districts within chaos dwarf cities are typically organized around specific industrial functions or social hierarchies, while landmarks often honor their dark gods or commemorate violent conquests.
            </p>
            <p>
              Use these names for your dark fantasy worldbuilding, Warhammer campaigns, or other roleplaying games that feature evil dwarven civilizations.
            </p>
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
                <a href="#what-is-a-good-name" className="text-primary hover:underline">What is a Good Chaos Dwarf City Name?</a>
              </li>
              <li>
                <a href="#how-to-use" className="text-primary hover:underline">How to Use the Generator</a>
              </li>
              <li>
                <a href="#naming-traditions" className="text-primary hover:underline">Chaos Dwarf City Naming Traditions</a>
              </li>
              <li>
                <a href="#popular-names" className="text-primary hover:underline">Most Popular Chaos Dwarf City Names</a>
              </li>
            </ul>
          </nav>
        </div>

        {/* Introduction */}
        <section id="introduction" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Introduction</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              The Chaos Dwarfs, also known as the Dawi-Zharr in their own twisted tongue, are a 
              corrupted offshoot of the proud dwarf race. Centuries ago, these dwarfs ventured 
              too far into the eastern lands, where the influence of Chaos warped their bodies 
              and souls. Now they dwell in the blighted lands of the Dark Lands, building 
              massive industrial cities around volcanic pits and enslaving other races to fuel 
              their endless ambition.
            </p>
            <p>
              Unlike their uncorrupted kin who carve their holds into mountains, Chaos Dwarfs 
              construct imposing ziggurats, towering fortresses, and sprawling industrial 
              complexes on the surface. Their cities are hellish places of smoke, fire, and 
              suffering, where the clanging of hammers and the screams of slaves never cease.
            </p>
            <p>
              The names of Chaos Dwarf cities reflect their dark nature, often incorporating 
              elements related to fire, iron, darkness, and cruelty. This generator helps you 
              create authentic and evocative names for Chaos Dwarf settlements in your fantasy 
              worlds, role-playing games, or creative writing.
            </p>
          </div>
        </section>

        {/* What is a Good Name */}
        <section id="what-is-a-good-name" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">What is a Good Chaos Dwarf City Name?</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              A good Chaos Dwarf city name should evoke images of dark industry, volcanic 
              landscapes, and tyrannical rule. Here are some characteristics of effective 
              Chaos Dwarf city names:
            </p>
            <ul>
              <li><strong>Harsh Consonants:</strong> Names often feature hard sounds like 'z', 'k', 'g', and 'r', creating a guttural, aggressive feel.</li>
              <li><strong>Fire and Forge References:</strong> Many names incorporate elements related to fire, forges, and metalworking, reflecting their industrial nature.</li>
              <li><strong>Hyphenated Structure:</strong> Chaos Dwarf cities often have compound names with two parts connected by a hyphen, such as "Zharr-Naggrund."</li>
              <li><strong>Dark Modifiers:</strong> Names may include descriptive modifiers like "The Black," "The Burning," or "The Damned."</li>
              <li><strong>Corrupted Dwarf Words:</strong> They often use twisted versions of traditional dwarf terms, reflecting their corrupted heritage.</li>
            </ul>
            <p>
              The most effective Chaos Dwarf city names combine these elements to create a name 
              that sounds both distinctly dwarfish and unmistakably evil. The name should 
              convey the city's function, location, or notable feature while maintaining an 
              atmosphere of dread and oppression.
            </p>
          </div>
        </section>

        {/* How to Use */}
        <section id="how-to-use" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">How to Use the Generator</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>Using our Chaos Dwarf City Name Generator is straightforward:</p>
            <ol>
              <li><strong>Generate Names:</strong> Click the "Generate Names" button to create a list of 10 unique Chaos Dwarf city names.</li>
              <li><strong>Browse Results:</strong> Look through the generated names to find one that suits your needs.</li>
              <li><strong>Regenerate if Needed:</strong> If none of the names appeal to you, simply click the button again for a new set.</li>
              <li><strong>Customize:</strong> Feel free to modify the generated names by changing prefixes, suffixes, or modifiers to better fit your specific vision.</li>
              <li><strong>Add Context:</strong> Consider the location and purpose of the city when selecting a name. A major industrial center might have a more imposing name than a minor outpost.</li>
            </ol>
            <p>
              The generator creates names by combining prefixes, suffixes, and sometimes modifiers 
              that are authentic to Chaos Dwarf naming conventions. Some names will be simple 
              compound names (like "Zharr-Naggrund"), while others will include descriptive 
              modifiers (like "Gorgoth-Drazh, The Burning").
            </p>
          </div>
        </section>

        {/* Naming Traditions */}
        <section id="naming-traditions" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Chaos Dwarf City Naming Traditions</h2>
          <div className="prose max-w-none prose-sm sm:prose-base">
            <p>
              Chaos Dwarf cities follow several naming traditions that reflect their dark culture 
              and twisted history:
            </p>
            <h3>Function-Based Names</h3>
            <p>
              Many Chaos Dwarf cities are named according to their primary function. Industrial 
              centers often include terms related to forges or fire, while slave markets might 
              reference chains or bondage. Military strongholds typically incorporate terms 
              suggesting strength or defense.
            </p>
            <h3>Geographical References</h3>
            <p>
              Cities are sometimes named after prominent geographical features in their vicinity, 
              particularly volcanic features. Terms referring to mountains, fire pits, ash plains, 
              or lava rivers are common in these names.
            </p>
            <h3>Hashut Worship</h3>
            <p>
              As devoted worshippers of Hashut, the Father of Darkness, Chaos Dwarfs often name 
              important religious centers after aspects of their dark god. These names might 
              reference bulls (Hashut's symbol), fire, darkness, or sacrifice.
            </p>
            <h3>Corrupted Ancestral Names</h3>
            <p>
              Some Chaos Dwarf cities bear twisted versions of traditional dwarf naming elements, 
              deliberately corrupting their ancestral heritage. These names serve as a mockery of 
              their uncorrupted kin and a reminder of their own transformed nature.
            </p>
            <h3>Conquest Commemorations</h3>
            <p>
              Occasionally, Chaos Dwarfs name cities to commemorate great victories or conquests. 
              These names might incorporate elements referring to defeated enemies or significant 
              battles, serving as permanent monuments to their military achievements.
            </p>
          </div>
        </section>

        {/* Popular Names */}
        <section id="popular-names" className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Most Popular Chaos Dwarf City Names</h2>
          <p className="mb-4 sm:mb-6">Below is a collection of the most iconic chaos dwarf city names, each with its own dark significance:</p>
          
          <div className="mb-6 sm:mb-8 overflow-x-auto">
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Common Name Elements</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.cityNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
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
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">District Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.districtNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
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
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Landmark Names</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {!loading && nameData && nameData.landmarkNames.slice(0, 20).map((element, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{element.name}</TableCell>
                    <TableCell>{element.description}</TableCell>
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

export default ChaosDwarfCityNameGenerator; 