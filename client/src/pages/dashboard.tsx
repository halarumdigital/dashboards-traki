import { DashboardSidebar } from "@/components/dashboard-sidebar";
import { KPIGrid } from "@/components/metrics-cards";
import { CourierDemandChart } from "@/components/charts/delivery-chart";
import { DeliveryStatusChart } from "@/components/charts/status-chart";
import { NPSChart } from "@/components/charts/nps-chart";
import { WeeklyActivityChart } from "@/components/charts/weekly-activity-chart";
import { Bell, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-background flex">
      <DashboardSidebar />
      
      <main className="flex-1 md:ml-64">
        {/* Header */}
        <header className="h-16 border-b bg-card/50 backdrop-blur-sm flex items-center justify-between px-6 sticky top-0 z-20">
          <h1 className="text-2xl font-bold text-foreground hidden md:block">Visão Geral</h1>
          
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

        {/* Content */}
        <div className="p-6 space-y-6">
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <KPIGrid />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <motion.div 
              className="col-span-4 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            >
              <CourierDemandChart />
            </motion.div>
            
            <motion.div 
              className="col-span-4 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.2 }}
            >
              <DeliveryStatusChart />
            </motion.div>

            <motion.div 
              className="col-span-4 lg:col-span-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.3 }}
            >
              <NPSChart />
            </motion.div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
             <motion.div 
              className="col-span-4 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.4 }}
            >
              <WeeklyActivityChart />
            </motion.div>
            
            {/* Example of another widget or empty space */}
             <motion.div 
              className="col-span-4 lg:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.5 }}
            >
               {/* Placeholder for future content or recent activity list */}
               <Card className="h-full">
                 <CardHeader>
                   <CardTitle>Últimas Ocorrências</CardTitle>
                   <CardDescription>Eventos recentes do sistema</CardDescription>
                 </CardHeader>
                 <CardContent>
                   <div className="space-y-4">
                     {[1, 2, 3].map((i) => (
                       <div key={i} className="flex items-center gap-4 border-b pb-3 last:border-0">
                         <div className="h-8 w-8 rounded-full bg-red-100 text-red-600 flex items-center justify-center">
                           <Bell className="h-4 w-4" />
                         </div>
                         <div className="flex-1">
                           <p className="text-sm font-medium">Atraso na coleta #123{i}</p>
                           <p className="text-xs text-muted-foreground">Há 5 minutos • Zona Sul</p>
                         </div>
                       </div>
                     ))}
                   </div>
                 </CardContent>
               </Card>
            </motion.div>
          </div>
        </div>
      </main>
    </div>
  );
}
