import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowDown, ArrowUp, Clock, Users, Bike, WifiOff, Cloud, CloudRain, Sun, Moon, MapPin, ThermometerSun, Droplets, Wind } from "lucide-react";
import type { OperationalDashboardData } from "@/hooks/use-operational-dashboard";
import type { WeatherInfo } from "@/hooks/use-weather";

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

interface WeatherCardInlineProps {
  data?: WeatherInfo | null;
  isLoading?: boolean;
  cityName?: string;
  error?: Error | null;
}

function WeatherCardInline({ data, isLoading, cityName, error }: WeatherCardInlineProps) {
  if (isLoading) {
    return (
      <Card className="hover:shadow-md transition-all animate-pulse">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div className="h-4 w-20 bg-muted rounded" />
          <div className="h-4 w-4 bg-muted rounded" />
        </CardHeader>
        <CardContent>
          <div className="h-8 w-16 bg-muted rounded mb-2" />
          <div className="h-3 w-24 bg-muted rounded" />
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="hover:shadow-md transition-all border-destructive/30">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Clima</CardTitle>
          <Cloud className="h-4 w-4 text-destructive" />
        </CardHeader>
        <CardContent>
          <div className="text-sm text-destructive">Erro</div>
          <p className="text-xs text-muted-foreground mt-1">{cityName || "Sem cidade"}</p>
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="hover:shadow-md transition-all">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">Clima</CardTitle>
          <Cloud className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">--</div>
          <p className="text-xs text-muted-foreground mt-1">
            {cityName ? "Carregando..." : "Selecione cidade"}
          </p>
        </CardContent>
      </Card>
    );
  }

  const getCardStyle = () => {
    if (data.estaChovendo) return "border-blue-400/60 bg-gradient-to-br from-blue-50/80 to-blue-100/40 dark:from-blue-950/40 dark:to-blue-900/20";
    if (!data.ehDia) return "border-indigo-400/60 bg-gradient-to-br from-indigo-50/80 to-indigo-100/40 dark:from-indigo-950/40 dark:to-indigo-900/20";
    return "border-amber-400/60 bg-gradient-to-br from-amber-50/80 to-orange-100/40 dark:from-amber-950/40 dark:to-orange-900/20";
  };

  const getIcon = () => {
    if (data.estaChovendo) return <CloudRain className="h-5 w-5 text-blue-500" />;
    if (!data.ehDia) return <Moon className="h-5 w-5 text-indigo-400" />;
    return <Sun className="h-5 w-5 text-amber-500" />;
  };

  const getStatusColor = () => {
    if (data.estaChovendo) return "text-blue-600 dark:text-blue-400";
    if (!data.ehDia) return "text-indigo-600 dark:text-indigo-400";
    return "text-amber-600 dark:text-amber-400";
  };

  return (
    <Card className={`hover:shadow-md transition-all ${getCardStyle()}`}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="flex items-center gap-1 text-muted-foreground">
          <MapPin className="h-3 w-3" />
          <CardTitle className="text-sm font-medium">{data.cidade}</CardTitle>
        </div>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-1">
          <span className="text-2xl font-bold">{data.temperatura}°C</span>
        </div>
        <p className={`text-xs font-medium mt-1 ${getStatusColor()}`}>
          {data.estaChovendo ? "Chovendo" : !data.ehDia ? "Noite" : "Ensolarado"}
        </p>
        <div className="flex items-center gap-3 mt-2 text-xs text-muted-foreground">
          <span className="flex items-center gap-1">
            <ThermometerSun className="h-3 w-3" />
            {data.sensacaoTermica}°
          </span>
          <span className="flex items-center gap-1">
            <Droplets className="h-3 w-3" />
            {data.umidade}%
          </span>
          <span className="flex items-center gap-1">
            <Wind className="h-3 w-3" />
            {data.ventoKph}km/h
          </span>
        </div>
      </CardContent>
    </Card>
  );
}

interface KPIGridProps {
  data?: OperationalDashboardData["metricas"];
  isLoading?: boolean;
  weatherData?: WeatherInfo | null;
  isWeatherLoading?: boolean;
  cityName?: string;
  weatherError?: Error | null;
}

export function KPIGrid({ data, isLoading, weatherData, isWeatherLoading, cityName, weatherError }: KPIGridProps) {
  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
        {[...Array(6)].map((_, i) => (
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
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-6">
      <MetricCard
        title="Tempo Médio de Aceite"
        value={data ? formatTimeValue(data.tempoMedioAceite.valor, data.tempoMedioAceite.unidade) : "--"}
        icon={Clock}
        description="média últimos 15 min"
      />
      <MetricCard
        title="Tempo até Coleta"
        value={data ? formatTimeValue(data.tempoAteColeta.valor, data.tempoAteColeta.unidade) : "--"}
        icon={Bike}
        description="média últimos 15 min"
      />
      <MetricCard
        title="Tempo Total de Entrega"
        value={data ? formatTimeValue(data.tempoTotalEntrega.valor, data.tempoTotalEntrega.unidade) : "--"}
        icon={Clock}
        description="média últimos 15 min"
      />
      <MetricCard
        title="Entregadores Ativos"
        value={data ? `${data.entregadoresAtivos.valor}` : "--"}
        icon={Users}
        description="média últimos 15 min"
      />
      <MetricCard
        title="Entregadores Offline"
        value={data ? `${data.entregadoresOffline.valor}` : "--"}
        icon={WifiOff}
        description="média últimos 15 min"
      />
      <WeatherCardInline
        data={weatherData}
        isLoading={isWeatherLoading}
        cityName={cityName}
        error={weatherError}
      />
    </div>
  );
}
