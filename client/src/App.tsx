import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import CompetitorHub from "./pages/CompetitorHub";
import CompetitorDetail from "./pages/CompetitorDetail";
import CompetitorList from "./pages/CompetitorList";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hub"} component={CompetitorHub} />
      <Route path={"/list"} component={CompetitorList} />
      <Route path={"/competitor"} component={CompetitorDetail} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
