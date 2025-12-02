import { useState, useMemo } from "react";
import { KPIGrid } from "@/components/metrics-cards";
import { CourierDemandChart } from "@/components/charts/delivery-chart";
import { DeliveryStatusChart } from "@/components/charts/status-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { ManagementView } from "@/components/management-view";
import { MarketingView } from "@/components/marketing-view";
import { Bell, Bike, Filter, LayoutDashboard, TrendingUp, Megaphone } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useOperationalDashboard, useCities } from "@/hooks/use-operational-dashboard";

// Mapeamento de meses para formato YYYY-MM
const monthMapping: Record<string, string> = {
  "janeiro": "01",
  "fevereiro": "02",
  "marco": "03",
  "abril": "04",
  "maio": "05",
  "junho": "06",
  "julho": "07",
  "agosto": "08",
  "setembro": "09",
  "outubro": "10",
  "novembro": "11",
  "dezembro": "12",
};

// Obter mês atual como padrão
const getCurrentMonth = () => {
  const now = new Date();
  const monthNames = ["janeiro", "fevereiro", "marco", "abril", "maio", "junho",
                      "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
  return monthNames[now.getMonth()];
};

const getCurrentYear = () => {
  return new Date().getFullYear();
};

export default function Dashboard() {
  const [month, setMonth] = useState(getCurrentMonth());
  const [city, setCity] = useState("");
  const [activeTab, setActiveTab] = useState("operacional");

  // Marketing filters
  const [campaign, setCampaign] = useState("todas");
  const [ad, setAd] = useState("todos");

  // Converter filtros para formato da API
  const apiParams = useMemo(() => {
    const params: { month?: string; city?: string } = {};

    if (month && monthMapping[month]) {
      params.month = `${getCurrentYear()}-${monthMapping[month]}`;
    }

    if (city && city !== "todas") {
      params.city = city;
    }

    return params;
  }, [month, city]);

  // Buscar dados da API operacional
  const { data: operationalData, isLoading, error } = useOperationalDashboard(apiParams);

  // Buscar lista de cidades
  const { data: cities } = useCities();

  const getTitle = () => {
    switch(activeTab) {
      case "operacional": return "Dashboard Operacional";
      case "gestao": return "Dashboard de Gestão";
      case "marketing": return "Dashboard de Marketing";
      default: return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      
      {/* Header */}
      <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Bike className="h-5 w-5" />
          </div>
          Traki Logística
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <h1 className="text-lg font-semibold text-foreground">
            {getTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-accent transition-colors relative">
            <Bell className="h-5 w-5 text-muted-foreground" />
            <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-primary"></span>
          </button>
          
          <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold cursor-pointer">
            AD
          </div>
        </div>
      </header>

      {/* Filter Bar & Tabs */}
      <div className="bg-card border-b px-6 py-4 flex flex-col md:flex-row gap-4 items-center justify-between sticky top-16 z-10 shadow-sm">
        <div className="flex items-center gap-4 w-full md:w-auto overflow-x-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full md:w-auto">
            <TabsList>
              <TabsTrigger value="operacional" className="flex items-center gap-2">
                <LayoutDashboard className="h-4 w-4" />
                Operacional
              </TabsTrigger>
              <TabsTrigger value="gestao" className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                Gestão
              </TabsTrigger>
              <TabsTrigger value="marketing" className="flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                Marketing
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
        
        <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto items-center">
           <div className="flex items-center gap-2 text-sm text-muted-foreground mr-2 hidden md:flex">
            <Filter className="h-4 w-4" />
            <span>Filtros:</span>
          </div>

          {activeTab === "marketing" && (
            <>
              <Select value={campaign} onValueChange={setCampaign}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Campanha" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todas">Todas Campanhas</SelectItem>
                  <SelectItem value="verao-2025">Verão 2025</SelectItem>
                  <SelectItem value="volta-aulas">Volta às Aulas</SelectItem>
                  <SelectItem value="frete-gratis">Frete Grátis</SelectItem>
                  <SelectItem value="instalacao-app">Instalação App</SelectItem>
                </SelectContent>
              </Select>

              <Select value={ad} onValueChange={setAd}>
                <SelectTrigger className="w-full md:w-[180px]">
                  <SelectValue placeholder="Anúncio" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos Anúncios</SelectItem>
                  <SelectItem value="ad-1">Video Promo 1</SelectItem>
                  <SelectItem value="ad-2">Carrossel Benefícios</SelectItem>
                  <SelectItem value="ad-3">Stories Depoimento</SelectItem>
                  <SelectItem value="ad-4">Banner Estático</SelectItem>
                </SelectContent>
              </Select>
            </>
          )}

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Todas Cidades" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todas">Todas Cidades</SelectItem>
              {cities?.map((c) => (
                <SelectItem key={c.id} value={c.id}>
                  {c.name} - {c.state}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-full md:w-[140px]">
              <SelectValue placeholder="Mês" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="janeiro">Janeiro</SelectItem>
              <SelectItem value="fevereiro">Fevereiro</SelectItem>
              <SelectItem value="marco">Março</SelectItem>
              <SelectItem value="abril">Abril</SelectItem>
              <SelectItem value="maio">Maio</SelectItem>
              <SelectItem value="junho">Junho</SelectItem>
              <SelectItem value="julho">Julho</SelectItem>
              <SelectItem value="agosto">Agosto</SelectItem>
              <SelectItem value="setembro">Setembro</SelectItem>
              <SelectItem value="outubro">Outubro</SelectItem>
              <SelectItem value="novembro">Novembro</SelectItem>
              <SelectItem value="dezembro">Dezembro</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Content */}
      <main className="flex-1 p-6 space-y-6 container mx-auto max-w-7xl">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            {activeTab === "operacional" && (
              <div className="space-y-6">
                {error && (
                  <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 text-destructive">
                    Erro ao carregar dados: {error.message}
                  </div>
                )}

                <KPIGrid data={operationalData?.metricas} isLoading={isLoading} />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="col-span-3 lg:col-span-2">
                    <CourierDemandChart data={operationalData?.demandaDisponibilidade} isLoading={isLoading} />
                  </div>

                  <div className="col-span-3 lg:col-span-1">
                    <DeliveryStatusChart data={operationalData?.statusEntregas} isLoading={isLoading} />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="col-span-4">
                    <WeeklyActivityChart data={operationalData?.empresasVolume} isLoading={isLoading} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "gestao" && <ManagementView />}

            {activeTab === "marketing" && <MarketingView />}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
