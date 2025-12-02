import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Clock, Users, Bike, WifiOff } from "lucide-react";
import type { OperationalDashboardData } from "@/hooks/use-operational-dashboard";

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

interface KPIGridProps {
  data?: OperationalDashboardData["metricas"];
  isLoading?: boolean;
}

export function KPIGrid({ data, isLoading }: KPIGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
        {[...Array(5)].map((_, i) => (
          <Card key={i} className="hover:shadow-md transition-all animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-muted rounded" />
              <div className="h-4 w-4 bg-muted rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-muted rounded mb-2" />
              <div className="h-3 w-20 bg-muted rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatTimeValue = (valor: number, unidade: string) => {
    if (unidade === "segundos") return `${valor}s`;
    if (unidade === "minutos") return `${valor}m`;
    return `${valor}`;
  };

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
      <MetricCard
        title="Tempo Médio de Aceite"
        value={data ? formatTimeValue(data.tempoMedioAceite.valor, data.tempoMedioAceite.unidade) : "--"}
        trend={data ? `${Math.abs(data.tempoMedioAceite.variacao)}%` : undefined}
        trendUp={data ? data.tempoMedioAceite.variacao < 0 : undefined}
        icon={Clock}
        description="vs mês anterior"
      />
      <MetricCard
        title="Tempo até Coleta"
        value={data ? formatTimeValue(data.tempoAteColeta.valor, data.tempoAteColeta.unidade) : "--"}
        trend={data ? `${Math.abs(data.tempoAteColeta.variacao)}%` : undefined}
        trendUp={data ? data.tempoAteColeta.variacao < 0 : undefined}
        icon={Bike}
        description="vs mês anterior"
      />
      <MetricCard
        title="Tempo Total de Entrega"
        value={data ? formatTimeValue(data.tempoTotalEntrega.valor, data.tempoTotalEntrega.unidade) : "--"}
        trend={data ? `${Math.abs(data.tempoTotalEntrega.variacao)}%` : undefined}
        trendUp={data ? data.tempoTotalEntrega.variacao < 0 : undefined}
        icon={Clock}
        description="vs mês anterior"
      />
      <MetricCard
        title="Entregadores Ativos"
        value={data ? `${data.entregadoresAtivos.valor}` : "--"}
        icon={Users}
        description={data?.entregadoresAtivos.descricao || "agora online"}
      />
      <MetricCard
        title="Entregadores Offline"
        value={data ? `${data.entregadoresOffline.valor}` : "--"}
        icon={WifiOff}
        description={data?.entregadoresOffline.descricao || "indisponíveis"}
      />
    </div>
  );
}
