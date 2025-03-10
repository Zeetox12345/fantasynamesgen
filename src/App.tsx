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
// Beyblade imports
import Beyblade from "./pages/Beyblade";
import BeybladeNameGenerator from "./pages/beyblade/beyblade-names";
import BeybladeBurstNameGenerator from "./pages/beyblade/burst";
import BeybladeSpecialMoveNameGenerator from "./pages/beyblade/special-move";
// World of Warcraft imports
import WorldOfWarcraft from "./pages/WorldOfWarcraft";
import NightborneMageNameGenerator from "./pages/worldofwarcraft/nightborne-mage";
import OrcWarriorNameGenerator from "./pages/worldofwarcraft/orc-warrior";
import OrcShamanNameGenerator from "./pages/worldofwarcraft/orc-shaman";
import MagharOrcNameGenerator from "./pages/worldofwarcraft/maghar-orc";
import EarthenDwarfNameGenerator from "./pages/worldofwarcraft/earthen-dwarf";
// Dungeons and Dragons imports
import DungeonsAndDragons from "./pages/DungeonsAndDragons";
import DwarfCityNameGenerator from "./pages/dungeonsanddragons/dwarf-city";
import DarkUrgeNameGenerator from "./pages/dungeonsanddragons/dark-urge";
import MerfolkNameGenerator from "./pages/dungeonsanddragons/merfolk";
import SeaNameGenerator from "./pages/dungeonsanddragons/sea";
import BlacksmithNameGenerator from "./pages/dungeonsanddragons/blacksmith";
import ElfDruidNameGenerator from "./pages/dungeonsanddragons/elf-druid";
import DeepGnomeCityNameGenerator from "./pages/dungeonsanddragons/deep-gnome-city";
import FemaleHalfElfNameGenerator from "./pages/dungeonsanddragons/female-half-elf";
import MaleHalfElfNameGenerator from "./pages/dungeonsanddragons/male-half-elf";
import WoodHalfElfNameGenerator from "./pages/dungeonsanddragons/wood-half-elf";
import DrowHalfElfNameGenerator from "./pages/dungeonsanddragons/drow-half-elf";
import HighHalfElfNameGenerator from "./pages/dungeonsanddragons/high-half-elf";
import GladiatorNameGenerator from "./pages/dungeonsanddragons/gladiator";
import GroupNameGenerator from "./pages/dungeonsanddragons/group";
import SorcererNameGenerator from "./pages/dungeonsanddragons/sorcerer";
import DwarfClanNameGenerator from "./pages/dungeonsanddragons/dwarf-clan";
import FemaleGenieNameGenerator from "./pages/dungeonsanddragons/female-genie";
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
          {/* Beyblade Routes */}
          <Route path="/beyblade" element={<Beyblade />} />
          <Route path="/beyblade/beyblade-names" element={<BeybladeNameGenerator />} />
          <Route path="/beyblade/burst" element={<BeybladeBurstNameGenerator />} />
          <Route path="/beyblade/special-move" element={<BeybladeSpecialMoveNameGenerator />} />
          {/* World of Warcraft Routes */}
          <Route path="/worldofwarcraft" element={<WorldOfWarcraft />} />
          <Route path="/worldofwarcraft/nightborne-mage" element={<NightborneMageNameGenerator />} />
          <Route path="/worldofwarcraft/orc-warrior" element={<OrcWarriorNameGenerator />} />
          <Route path="/worldofwarcraft/orc-shaman" element={<OrcShamanNameGenerator />} />
          <Route path="/worldofwarcraft/maghar-orc" element={<MagharOrcNameGenerator />} />
          <Route path="/worldofwarcraft/earthen-dwarf" element={<EarthenDwarfNameGenerator />} />
          {/* Dungeons and Dragons Routes */}
          <Route path="/dungeonsanddragons" element={<DungeonsAndDragons />} />
          <Route path="/dungeonsanddragons/dwarf-city" element={<DwarfCityNameGenerator />} />
          <Route path="/dungeonsanddragons/dark-urge" element={<DarkUrgeNameGenerator />} />
          <Route path="/dungeonsanddragons/merfolk" element={<MerfolkNameGenerator />} />
          <Route path="/dungeonsanddragons/sea" element={<SeaNameGenerator />} />
          <Route path="/dungeonsanddragons/blacksmith" element={<BlacksmithNameGenerator />} />
          <Route path="/dungeonsanddragons/elf-druid" element={<ElfDruidNameGenerator />} />
          <Route path="/dungeonsanddragons/deep-gnome-city" element={<DeepGnomeCityNameGenerator />} />
          <Route path="/dungeonsanddragons/female-half-elf" element={<FemaleHalfElfNameGenerator />} />
          <Route path="/dungeonsanddragons/male-half-elf" element={<MaleHalfElfNameGenerator />} />
          <Route path="/dungeonsanddragons/wood-half-elf" element={<WoodHalfElfNameGenerator />} />
          <Route path="/dungeonsanddragons/drow-half-elf" element={<DrowHalfElfNameGenerator />} />
          <Route path="/dungeonsanddragons/high-half-elf" element={<HighHalfElfNameGenerator />} />
          <Route path="/dungeonsanddragons/gladiator" element={<GladiatorNameGenerator />} />
          <Route path="/dungeonsanddragons/group" element={<GroupNameGenerator />} />
          <Route path="/dungeonsanddragons/sorcerer" element={<SorcererNameGenerator />} />
          <Route path="/dungeonsanddragons/dwarf-clan" element={<DwarfClanNameGenerator />} />
          <Route path="/dungeonsanddragons/female-genie" element={<FemaleGenieNameGenerator />} />
          {/* 404 Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
    </Router>
  );
}

export default App;
