import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Clock, Users, Bike } from "lucide-react";

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

export function KPIGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <MetricCard
        title="Tempo Médio de Aceite"
        value="45s"
        trend="12%"
        trendUp={true}
        icon={Clock}
        description="vs mês anterior"
      />
      <MetricCard
        title="Tempo até Coleta"
        value="12m"
        trend="2%"
        trendUp={false}
        icon={Bike}
        description="vs mês anterior"
      />
      <MetricCard
        title="Tempo Total de Entrega"
        value="28m"
        trend="5%"
        trendUp={true}
        icon={Clock}
        description="vs mês anterior"
      />
      <MetricCard
        title="Entregadores Ativos"
        value="142"
        trend="+8"
        trendUp={true}
        icon={Users}
        description="agora online"
      />
    </div>
  );
}
