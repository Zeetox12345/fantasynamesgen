import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Fantasy from "./pages/Fantasy";
import DwarfNameGenerator from "./pages/fantasy/dwarf";
// Fantasy generators
import SeaGodGenerator from "./pages/fantasy/sea-god";
import SpaceRangerNameGenerator from "./pages/fantasy/space-ranger";
import ReindeerGenerator from "./pages/fantasy/reindeer";
import RangerNameGenerator from "./pages/fantasy/ranger";
import MaleDemonGenerator from "./pages/fantasy/male-demon";
import MerfolkCityGenerator from "./pages/fantasy/merfolk-city";
import HalflingRangerNameGenerator from "./pages/fantasy/halfling-ranger";
import FemaleDemonGenerator from "./pages/fantasy/female-demon";
import FemaleAlienNameGenerator from "./pages/fantasy/female-alien";
import DwarfRangerNameGenerator from "./pages/fantasy/dwarf-ranger";
import ElvenRangerNameGenerator from "./pages/fantasy/elven-ranger";
import DarkRangerNameGenerator from "./pages/fantasy/dark-ranger";
import ChaosDwarfCityNameGenerator from "./pages/fantasy/chaos-dwarf-city";
import ACOTARNameGenerator from "./pages/fantasy/acotar";
// Spirit Names imports
import SpiritNames from "./pages/SpiritNames";
import FoxSpiritNameGenerator from "./pages/spirit-names/fox-spirit";
import IndianSpiritNameGenerator from "./pages/spirit-names/indian-spirit";
import WaterSpiritNameGenerator from "./pages/spirit-names/water-spirit";
import NatureSpiritNameGenerator from "./pages/spirit-names/nature-spirit";
import JJKCursedSpiritNameGenerator from "./pages/spirit-names/jjk-cursed-spirit";
// MHA imports
import MyHeroAcademia from "./pages/MHA";
import HeroNameGenerator from "./pages/mha/hero";
import MaleHeroNameGenerator from "./pages/mha/male";
// Lovecraftian imports
import Lovecraftian from "./pages/Lovecraftian";
import FemaleLovecraftianNameGenerator from "./pages/lovecraftian/female";
import LovecraftianTownNameGenerator from "./pages/lovecraftian/town";
import LovecraftianCultNameGenerator from "./pages/lovecraftian/cult";
import LovecraftianMonsterNameGenerator from "./pages/lovecraftian/monster";
import LovecraftianDeityNameGenerator from "./pages/lovecraftian/deity";
// Splatoon imports
import Splatoon from "./pages/Splatoon";
import SplatoonBandNameGenerator from "./pages/splatoon/band";
import SplatoonIdolGroupNameGenerator from "./pages/splatoon/idol-group";
import SplatoonTeamNameGenerator from "./pages/splatoon/team";
import SplatoonCityNameGenerator from "./pages/splatoon/city";
import SplatoonSongNameGenerator from "./pages/splatoon/song";
import SplatoonNameTagGenerator from "./pages/splatoon/name-tag";
// Other
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fantasy" element={<Fantasy />} />
          {/* Fantasy Routes */}
          <Route path="/fantasy/dwarf" element={<DwarfNameGenerator />} />
          <Route path="/fantasy/sea-god" element={<SeaGodGenerator />} />
          <Route path="/fantasy/space-ranger" element={<SpaceRangerNameGenerator />} />
          <Route path="/fantasy/reindeer" element={<ReindeerGenerator />} />
          <Route path="/fantasy/ranger" element={<RangerNameGenerator />} />
          <Route path="/fantasy/male-demon" element={<MaleDemonGenerator />} />
          <Route path="/fantasy/merfolk-city" element={<MerfolkCityGenerator />} />
          <Route path="/fantasy/halfling-ranger" element={<HalflingRangerNameGenerator />} />
          <Route path="/fantasy/female-demon" element={<FemaleDemonGenerator />} />
          <Route path="/fantasy/female-alien" element={<FemaleAlienNameGenerator />} />
          <Route path="/fantasy/dwarf-ranger" element={<DwarfRangerNameGenerator />} />
          <Route path="/fantasy/elven-ranger" element={<ElvenRangerNameGenerator />} />
          <Route path="/fantasy/dark-ranger" element={<DarkRangerNameGenerator />} />
          <Route path="/fantasy/chaos-dwarf-city" element={<ChaosDwarfCityNameGenerator />} />
          <Route path="/fantasy/acotar" element={<ACOTARNameGenerator />} />
          {/* Spirit Names Routes */}
          <Route path="/spirit-names" element={<SpiritNames />} />
          <Route path="/spirit-names/fox-spirit" element={<FoxSpiritNameGenerator />} />
          <Route path="/spirit-names/indian-spirit" element={<IndianSpiritNameGenerator />} />
          <Route path="/spirit-names/water-spirit" element={<WaterSpiritNameGenerator />} />
          <Route path="/spirit-names/nature-spirit" element={<NatureSpiritNameGenerator />} />
          <Route path="/spirit-names/jjk-cursed-spirit" element={<JJKCursedSpiritNameGenerator />} />
          {/* MHA Routes */}
          <Route path="/mha" element={<MyHeroAcademia />} />
          <Route path="/mha/hero" element={<HeroNameGenerator />} />
          <Route path="/mha/male" element={<MaleHeroNameGenerator />} />
          {/* Lovecraftian Routes */}
          <Route path="/lovecraftian" element={<Lovecraftian />} />
          <Route path="/lovecraftian/female" element={<FemaleLovecraftianNameGenerator />} />
          <Route path="/lovecraftian/town" element={<LovecraftianTownNameGenerator />} />
          <Route path="/lovecraftian/cult" element={<LovecraftianCultNameGenerator />} />
          <Route path="/lovecraftian/monster" element={<LovecraftianMonsterNameGenerator />} />
          <Route path="/lovecraftian/deity" element={<LovecraftianDeityNameGenerator />} />
          {/* Splatoon Routes */}
          <Route path="/splatoon" element={<Splatoon />} />
          <Route path="/splatoon/band" element={<SplatoonBandNameGenerator />} />
          <Route path="/splatoon/idol-group" element={<SplatoonIdolGroupNameGenerator />} />
          <Route path="/splatoon/team" element={<SplatoonTeamNameGenerator />} />
          <Route path="/splatoon/city" element={<SplatoonCityNameGenerator />} />
          <Route path="/splatoon/song" element={<SplatoonSongNameGenerator />} />
          <Route path="/splatoon/name-tag" element={<SplatoonNameTagGenerator />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
