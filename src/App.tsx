
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Fantasy from "./pages/Fantasy";
import Splatoon from "./pages/Splatoon";
import DungeonsAndDragons from "./pages/DungeonsAndDragons";
import Skyrim from "./pages/Skyrim";
import Kenshi from "./pages/Kenshi";
import Undertale from "./pages/Undertale";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/fantasy" element={<Fantasy />} />
          <Route path="/splatoon" element={<Splatoon />} />
          <Route path="/dnd" element={<DungeonsAndDragons />} />
          <Route path="/skyrim" element={<Skyrim />} />
          <Route path="/kenshi" element={<Kenshi />} />
          <Route path="/undertale" element={<Undertale />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
