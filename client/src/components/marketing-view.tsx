import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Eye, MousePointerClick, MessageSquare, Share2, Target, TrendingUp } from "lucide-react";
import { CampaignPerformanceChart, EngagementTrendChart } from "@/components/charts/marketing-charts";
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

export function MarketingView() {
  return (
    <div className="space-y-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
      >
        <MetricCard
          title="Visualizações Totais"
          value="1.2M"
          trend="+15%"
          trendUp={true}
          icon={Eye}
          description="últimos 30 dias"
        />
        <MetricCard
          title="Taxa de Engajamento"
          value="4.8%"
          trend="+0.5%"
          trendUp={true}
          icon={Share2}
          description="vs mês anterior"
        />
        <MetricCard
          title="Conversas Iniciadas"
          value="856"
          trend="+12%"
          trendUp={true}
          icon={MessageSquare}
          description="WhatsApp / Direct"
        />
        <MetricCard
          title="Custo por Clique (CPC)"
          value="R$ 0,45"
          trend="-8%"
          trendUp={true} // Lower cost is good
          icon={MousePointerClick}
          description="Média campanhas"
        />
        <MetricCard
          title="CTR Médio"
          value="2.1%"
          trend="+0.2%"
          trendUp={true}
          icon={Target}
          description="Taxa de cliques"
        />
        <MetricCard
          title="ROAS"
          value="5.4x"
          trend="+1.2"
          trendUp={true}
          icon={TrendingUp}
          description="Retorno sobre Ad Spend"
        />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div 
          className="col-span-4 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <CampaignPerformanceChart />
        </motion.div>
        
        <motion.div 
          className="col-span-4 lg:col-span-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <EngagementTrendChart />
        </motion.div>
      </div>
    </div>
  );
}
