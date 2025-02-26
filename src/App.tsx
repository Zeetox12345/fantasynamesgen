import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate, useNavigate, useLocation } from "react-router-dom";
import { useEffect } from "react";
import Index from "./pages/Index";
import Fantasy from "./pages/Fantasy";
import NotFound from "./pages/NotFound";
import SpaceRangerNameGenerator from "./pages/fantasy/space-ranger";
import DwarfRangerNameGenerator from "./pages/fantasy/dwarf-ranger";
import ElvenRangerNameGenerator from "./pages/fantasy/elven-ranger";
import HalflingRangerNameGenerator from "./pages/fantasy/halfling-ranger";
import ChaosDwarfCityNameGenerator from "./pages/fantasy/chaos-dwarf-city";

/* HIDDEN ROUTES - TO RESTORE ALL ROUTES:
 * 1. Delete this comment block
 * 2. Uncomment the imports below
 * 3. Uncomment the Route components in the Routes section
 */
/*
import Splatoon from "./pages/Splatoon";
import DungeonsAndDragons from "./pages/DungeonsAndDragons";
import Skyrim from "./pages/Skyrim";
import Kenshi from "./pages/Kenshi";
import Undertale from "./pages/Undertale";
import Diablo from "./pages/Diablo";
import Fallout from "./pages/Fallout";
import LordOfTheRings from "./pages/LordOfTheRings";
import Halo from "./pages/Halo";
import PathOfExile from "./pages/PathOfExile";
import BaldursGate3 from "./pages/BaldursGate3";
import Witcher from "./pages/Witcher";
import ESO from "./pages/ESO";
import StardewValley from "./pages/StardewValley";
import Avatar from "./pages/Avatar";
import Roblox from "./pages/Roblox";
import AnimalCrossing from "./pages/AnimalCrossing";
import Warhammer from "./pages/Warhammer";
import DragonAge from "./pages/DragonAge";
import SunlessSea from "./pages/SunlessSea";
import Lovecraftian from "./pages/Lovecraftian";
import Zelda from "./pages/Zelda";
import MyHeroAcademia from "./pages/MyHeroAcademia";
import Beyblade from "./pages/Beyblade";
import EldenRing from "./pages/EldenRing";
import StarTrek from "./pages/StarTrek";
import AmazingDigitalCircus from "./pages/AmazingDigitalCircus";
import WorldOfWarcraft from "./pages/WorldOfWarcraft";
*/

const queryClient = new QueryClient();

// Handle redirects from 404.html
const RedirectHandler = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  useEffect(() => {
    // Check if we have a stored path in sessionStorage
    const redirectPath = sessionStorage.getItem('redirectPath');
    if (redirectPath && location.pathname === '/') {
      // Clear the stored path
      sessionStorage.removeItem('redirectPath');
      // Navigate to the stored path
      navigate(redirectPath);
    }
  }, [navigate, location]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <RedirectHandler />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fantasy" element={<Fantasy />} />
          <Route path="/fantasy/space-ranger" element={<SpaceRangerNameGenerator />} />
          <Route path="/fantasy/dwarf-ranger" element={<DwarfRangerNameGenerator />} />
          <Route path="/fantasy/elven-ranger" element={<ElvenRangerNameGenerator />} />
          <Route path="/fantasy/halfling-ranger" element={<HalflingRangerNameGenerator />} />
          <Route path="/fantasy/chaos-dwarf-city" element={<ChaosDwarfCityNameGenerator />} />
          {/* HIDDEN ROUTES - Uncomment to restore
          <Route path="/splatoon" element={<Splatoon />} />
          <Route path="/dnd" element={<DungeonsAndDragons />} />
          <Route path="/skyrim" element={<Skyrim />} />
          <Route path="/kenshi" element={<Kenshi />} />
          <Route path="/undertale" element={<Undertale />} />
          <Route path="/diablo" element={<Diablo />} />
          <Route path="/fallout" element={<Fallout />} />
          <Route path="/lotr" element={<LordOfTheRings />} />
          <Route path="/halo" element={<Halo />} />
          <Route path="/poe" element={<PathOfExile />} />
          <Route path="/bg3" element={<BaldursGate3 />} />
          <Route path="/witcher" element={<Witcher />} />
          <Route path="/eso" element={<ESO />} />
          <Route path="/stardew" element={<StardewValley />} />
          <Route path="/avatar" element={<Avatar />} />
          <Route path="/roblox" element={<Roblox />} />
          <Route path="/animalcrossing" element={<AnimalCrossing />} />
          <Route path="/warhammer" element={<Warhammer />} />
          <Route path="/dragonage" element={<DragonAge />} />
          <Route path="/sunlesssea" element={<SunlessSea />} />
          <Route path="/lovecraftian" element={<Lovecraftian />} />
          <Route path="/zelda" element={<Zelda />} />
          <Route path="/mha" element={<MyHeroAcademia />} />
          <Route path="/beyblade" element={<Beyblade />} />
          <Route path="/eldenring" element={<EldenRing />} />
          <Route path="/startrek" element={<StarTrek />} />
          <Route path="/tadc" element={<AmazingDigitalCircus />} />
          <Route path="/wow" element={<WorldOfWarcraft />} />
          */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
