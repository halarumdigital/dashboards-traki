import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      {/* Add other routes as needed for sidebar links, for now they can fallback to 404 or redirect */}
      <Route path="/entregas" component={Dashboard} />
      <Route path="/entregadores" component={Dashboard} />
      <Route path="/empresas" component={Dashboard} />
      <Route path="/relatorios" component={Dashboard} />
      <Route path="/configuracoes" component={Dashboard} />
      
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
