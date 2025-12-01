import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, DollarSign, TrendingUp, Users, Building2 } from "lucide-react";
import { LeadsChart } from "@/components/charts/leads-chart";
import { CityDistributionChart } from "@/components/charts/city-distribution-chart";
import { motion } from "framer-motion";

interface MetricCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: React.ElementType;
  description?: string;
}

function MetricCard({ title, value, trend, trendUp, icon: Icon, description }: MetricCardProps) {
  return (
    <Card className="hover:shadow-md transition-all">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {(trend || description) && (
          <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
            {trend && (
              <span className={trendUp ? "text-emerald-500 flex items-center" : "text-rose-500 flex items-center"}>
                {trendUp ? <ArrowUp className="h-3 w-3 mr-0.5" /> : <ArrowDown className="h-3 w-3 mr-0.5" />}
                {trend}
              </span>
            )}
            <span className="opacity-70">{description}</span>
          </p>
        )}
      </CardContent>
    </Card>
  );
}

export function ManagementView() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard
          title="Custo por Lead (CPL)"
          value="R$ 4,50"
          trend="-12%"
          trendUp={true} // Down is good for cost, but let's keep "green" as good
          icon={DollarSign}
          description="vs mês anterior"
        />
        <MetricCard
          title="CAC (Empresa)"
          value="R$ 125,00"
          trend="-5%"
          trendUp={true}
          icon={Building2}
          description="vs mês anterior"
        />
        <MetricCard
          title="CAC (Entregador)"
          value="R$ 15,00"
          trend="+2%"
          trendUp={false}
          icon={Users}
          description="vs mês anterior"
        />
        <MetricCard
          title="LTV / CAC"
          value="4.2x"
          trend="+0.3"
          trendUp={true}
          icon={TrendingUp}
          description="Retorno saudável (>3x)"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          className="col-span-4 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <LeadsChart />
        </motion.div>
        
        <motion.div 
          className="col-span-4 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <CityDistributionChart />
        </motion.div>
      </div>
    </div>
  );
}
