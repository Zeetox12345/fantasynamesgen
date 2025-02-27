import { useState, useEffect } from "react";
import { Wand2, Building2, Map } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Helmet } from "react-helmet";
import { loadNameData, generateNames, LocationNameData } from "@/lib/nameUtils";

const ChaosDwarfCityGenerator = () => {
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
      </div>
    </div>
  );
};

export default ChaosDwarfCityGenerator; 