import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import Home from "./pages/Home";
import CompetitorHub from "./pages/CompetitorHub";
import CompetitorDetail from "./pages/CompetitorDetail";
import CompetitorList from "./pages/CompetitorList";
import EventsHub from "./pages/EventsHub";
import EventsList from "./pages/EventsList";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/hub"} component={CompetitorHub} />
      <Route path={"/events"} component={EventsHub} />
      <Route path={"/events/list"} component={EventsList} />
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
