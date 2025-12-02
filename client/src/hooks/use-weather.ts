import { useQuery } from "@tanstack/react-query";

const WEATHER_API_KEY = import.meta.env.VITE_WEATHER_API_KEY;
const WEATHER_API_URL = "https://api.weatherapi.com/v1/current.json";

export interface WeatherData {
  location: {
    name: string;
    region: string;
    country: string;
    localtime: string;
  };
  current: {
    temp_c: number;
    condition: {
      text: string;
      icon: string;
      code: number;
    };
    humidity: number;
    wind_kph: number;
    feelslike_c: number;
    is_day: number;
  };
}

export interface WeatherInfo {
  cidade: string;
  temperatura: number;
  sensacaoTermica: number;
  condicao: string;
  icone: string;
  umidade: number;
  ventoKph: number;
  estaChovendo: boolean;
  ehDia: boolean;
  horarioLocal: string;
}

// Códigos de condições que indicam chuva na WeatherAPI
const RAIN_CONDITION_CODES = [
  1063, // Patchy rain possible
  1150, // Patchy light drizzle
  1153, // Light drizzle
  1168, // Freezing drizzle
  1171, // Heavy freezing drizzle
  1180, // Patchy light rain
  1183, // Light rain
  1186, // Moderate rain at times
  1189, // Moderate rain
  1192, // Heavy rain at times
  1195, // Heavy rain
  1198, // Light freezing rain
  1201, // Moderate or heavy freezing rain
  1240, // Light rain shower
  1243, // Moderate or heavy rain shower
  1246, // Torrential rain shower
  1273, // Patchy light rain with thunder
  1276, // Moderate or heavy rain with thunder
];

// Função para remover acentos
function removeAccents(str: string): string {
  return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
}

async function fetchWeather(cityName: string): Promise<WeatherInfo | null> {
  if (!cityName || !WEATHER_API_KEY) {
    console.log("[Weather] Sem cidade ou API key:", { cityName, hasKey: !!WEATHER_API_KEY });
    return null;
  }

  // Usar apenas o nome da cidade sem o estado e remover acentos para melhor compatibilidade
  const cityOnly = removeAccents(cityName.split(",")[0].trim());
  const url = `${WEATHER_API_URL}?key=${WEATHER_API_KEY}&q=${encodeURIComponent(cityOnly)}&lang=pt`;

  console.log("[Weather] Buscando clima para:", cityOnly);
  const response = await fetch(url);

  if (!response.ok) {
    const errorText = await response.text();
    console.error("[Weather] Erro da API:", response.status, errorText);
    throw new Error(`Erro ao buscar clima: ${response.status}`);
  }

  const data: WeatherData = await response.json();

  return {
    cidade: data.location.name,
    temperatura: Math.round(data.current.temp_c),
    sensacaoTermica: Math.round(data.current.feelslike_c),
    condicao: data.current.condition.text,
    icone: data.current.condition.icon,
    umidade: data.current.humidity,
    ventoKph: Math.round(data.current.wind_kph),
    estaChovendo: RAIN_CONDITION_CODES.includes(data.current.condition.code),
    ehDia: data.current.is_day === 1,
    horarioLocal: data.location.localtime,
  };
}

interface UseWeatherParams {
  cityName?: string;
  enabled?: boolean;
}

export function useWeather({ cityName, enabled = true }: UseWeatherParams) {
  return useQuery<WeatherInfo | null>({
    queryKey: ["weather", cityName],
    queryFn: () => fetchWeather(cityName || ""),
    enabled: enabled && !!cityName,
    staleTime: 1800000, // 30 minutos
    refetchInterval: 3600000, // Atualiza a cada 1 hora
    refetchIntervalInBackground: true,
    retry: 2,
  });
}
