import { useState, useEffect } from "react";
import { KPIGrid } from "@/components/metrics-cards";
import { CourierDemandChart } from "@/components/charts/delivery-chart";
import { DeliveryStatusChart } from "@/components/charts/status-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { ManagementView } from "@/components/management-view";
import { MarketingView } from "@/components/marketing-view";
import { Bell, Search, Bike, Filter, LayoutDashboard, TrendingUp, Megaphone } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function Dashboard() {
  const [month, setMonth] = useState("dezembro");
  const [city, setCity] = useState("sao-paulo");
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("operacional");

  // Simulate data loading when filters change
  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 600);
    return () => clearTimeout(timer);
  }, [month, city]);

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
          FlashDelivery
        </div>
        
        <div className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
          <h1 className="text-lg font-semibold text-foreground">
            {getTitle()}
          </h1>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <div className="relative w-full md:w-64 hidden md:block">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Buscar entregas, empresas..." className="pl-8 bg-background" />
          </div>
          
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

          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className="w-full md:w-[200px]">
              <SelectValue placeholder="Selecione a Cidade" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="sao-paulo">São Paulo</SelectItem>
              <SelectItem value="rio-de-janeiro">Rio de Janeiro</SelectItem>
              <SelectItem value="belo-horizonte">Belo Horizonte</SelectItem>
              <SelectItem value="curitiba">Curitiba</SelectItem>
            </SelectContent>
          </Select>

          <Select value={month} onValueChange={setMonth}>
            <SelectTrigger className="w-full md:w-[180px]">
              <SelectValue placeholder="Selecione o Mês" />
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
          {loading ? (
             <motion.div 
              key="loader"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-[600px] flex items-center justify-center"
            >
              <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                <p className="text-muted-foreground animate-pulse">Atualizando dados...</p>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-6"
            >
              {activeTab === "operacional" && (
                <div className="space-y-6">
                  <KPIGrid />

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="col-span-3 lg:col-span-2">
                      <CourierDemandChart />
                    </div>
                    
                    <div className="col-span-3 lg:col-span-1">
                      <DeliveryStatusChart />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div className="col-span-4">
                      <WeeklyActivityChart />
                    </div>
                  </div>
                </div>
              )}
              
              {activeTab === "gestao" && <ManagementView />}
              
              {activeTab === "marketing" && <MarketingView />}
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
