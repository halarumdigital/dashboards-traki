import { Card, CardContent } from "@/components/ui/card";
import { Cloud, CloudRain, Droplets, Wind, ThermometerSun, Sun, Moon, MapPin } from "lucide-react";
import type { WeatherInfo } from "@/hooks/use-weather";

interface WeatherCardProps {
  data?: WeatherInfo | null;
  isLoading?: boolean;
  cityName?: string;
  error?: Error | null;
}

export function WeatherCard({ data, isLoading, cityName, error }: WeatherCardProps) {
  if (isLoading) {
    return (
      <Card className="hover:shadow-lg transition-all animate-pulse h-full">
        <CardContent className="p-5">
          <div className="h-4 w-24 bg-muted rounded mb-4" />
          <div className="h-12 w-28 bg-muted rounded mb-3" />
          <div className="h-4 w-32 bg-muted rounded mb-4" />
          <div className="grid grid-cols-2 gap-3 pt-3 border-t">
            <div className="h-8 bg-muted rounded" />
            <div className="h-8 bg-muted rounded" />
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="hover:shadow-lg transition-all border-destructive/50 h-full">
        <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px]">
          <Cloud className="h-12 w-12 text-destructive/50 mb-3" />
          <p className="text-sm font-medium text-destructive">Erro ao carregar clima</p>
          {cityName && (
            <p className="text-xs text-muted-foreground mt-1">{cityName}</p>
          )}
        </CardContent>
      </Card>
    );
  }

  if (!data) {
    return (
      <Card className="hover:shadow-lg transition-all h-full">
        <CardContent className="p-5 flex flex-col items-center justify-center h-full min-h-[200px]">
          <Cloud className="h-12 w-12 text-muted-foreground/50 mb-3" />
          <p className="text-sm text-muted-foreground text-center">
            {cityName ? "Carregando..." : "Selecione uma cidade para ver o clima"}
          </p>
        </CardContent>
      </Card>
    );
  }

  // Determinar estilo do card baseado nas condições
  const getCardStyle = () => {
    if (data.estaChovendo) {
      return "border-blue-400/60 bg-gradient-to-br from-blue-50 to-blue-100/50 dark:from-blue-950/40 dark:to-blue-900/20";
    }
    if (!data.ehDia) {
      return "border-indigo-400/60 bg-gradient-to-br from-indigo-50 to-indigo-100/50 dark:from-indigo-950/40 dark:to-indigo-900/20";
    }
    return "border-amber-400/60 bg-gradient-to-br from-amber-50 to-orange-100/50 dark:from-amber-950/40 dark:to-orange-900/20";
  };

  // Determinar ícone grande baseado nas condições
  const getWeatherIconLarge = () => {
    if (data.estaChovendo) {
      return <CloudRain className="h-14 w-14 text-blue-500" />;
    }
    if (!data.ehDia) {
      return <Moon className="h-14 w-14 text-indigo-400" />;
    }
    return <Sun className="h-14 w-14 text-amber-500" />;
  };

  const getStatusText = () => {
    if (data.estaChovendo) {
      return { text: "Chovendo", color: "text-blue-600 dark:text-blue-400" };
    }
    if (!data.ehDia) {
      return { text: "Noite", color: "text-indigo-600 dark:text-indigo-400" };
    }
    return { text: "Ensolarado", color: "text-amber-600 dark:text-amber-400" };
  };

  const status = getStatusText();

  return (
    <Card className={`hover:shadow-lg transition-all h-full ${getCardStyle()}`}>
      <CardContent className="p-5">
        {/* Cidade */}
        <div className="flex items-center gap-1.5 text-muted-foreground mb-3">
          <MapPin className="h-3.5 w-3.5" />
          <span className="text-sm font-medium">{data.cidade}</span>
        </div>

        {/* Temperatura e ícone */}
        <div className="flex items-center justify-between mb-2">
          <div>
            <span className="text-5xl font-bold tracking-tight">{data.temperatura}°</span>
            <span className="text-2xl text-muted-foreground">C</span>
          </div>
          {getWeatherIconLarge()}
        </div>

        {/* Status e condição */}
        <div className="mb-4">
          <p className={`text-sm font-semibold ${status.color}`}>{status.text}</p>
          <p className="text-xs text-muted-foreground">{data.condicao}</p>
        </div>

        {/* Detalhes */}
        <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border/50">
          <div className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
            <ThermometerSun className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Sensação</p>
              <p className="text-sm font-medium">{data.sensacaoTermica}°C</p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
            <Droplets className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Umidade</p>
              <p className="text-sm font-medium">{data.umidade}%</p>
            </div>
          </div>
          <div className="col-span-2 flex items-center gap-2 bg-background/50 rounded-lg px-3 py-2">
            <Wind className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Vento</p>
              <p className="text-sm font-medium">{data.ventoKph} km/h</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
