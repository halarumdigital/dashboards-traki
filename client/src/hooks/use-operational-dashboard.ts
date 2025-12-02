import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_SERVER_URL || "http://192.168.3.3:5010";

export interface City {
  id: string;
  name: string;
  state: string;
}

export interface OperationalDashboardData {
  periodo: {
    inicio: string;
    fim: string;
    cidade: string | null;
    intervalo: string; // "15min" - indica que são médias dos últimos 15 minutos
  };
  metricas: {
    tempoMedioAceite: {
      valor: number;
      unidade: string;
      mediaUltimos15min: number;
    };
    tempoAteColeta: {
      valor: number;
      unidade: string;
      mediaUltimos15min: number;
    };
    tempoTotalEntrega: {
      valor: number;
      unidade: string;
      mediaUltimos15min: number;
    };
    entregadoresAtivos: {
      valor: number;
      mediaUltimos15min: number;
    };
    entregadoresOffline: {
      valor: number;
      mediaUltimos15min: number;
    };
  };
  demandaDisponibilidade: Array<{
    hora: string;
    pedidosEmAberto: number;
    mediaUltimos15min: number;
  }>;
  statusEntregas: {
    emAberto: number;
    emAndamento: number;
    canceladas: number;
    concluidas: number;
    total: number;
    taxaCancelamento: number;
    mediaUltimos15min: {
      emAberto: number;
      emAndamento: number;
      canceladas: number;
      concluidas: number;
    };
  };
  empresasVolume: Array<{
    diaSemana: string;
    empresasAtivas: number;
    totalEntregas: number;
    mediaUltimos15min: {
      empresasAtivas: number;
      totalEntregas: number;
    };
  }>;
}

interface UseOperationalDashboardParams {
  month?: string;
  city?: string;
}

async function fetchOperationalDashboard(params: UseOperationalDashboardParams): Promise<OperationalDashboardData> {
  const queryParams = new URLSearchParams();

  if (params.month) {
    queryParams.append("month", params.month);
  }

  if (params.city) {
    queryParams.append("city", params.city);
  }

  const queryString = queryParams.toString();
  const url = `${API_BASE_URL}/api/admin/dashboard/operational${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar dados: ${response.status}`);
  }

  return response.json();
}

export function useOperationalDashboard(params: UseOperationalDashboardParams = {}) {
  return useQuery<OperationalDashboardData>({
    queryKey: ["operational-dashboard", params.month, params.city],
    queryFn: () => fetchOperationalDashboard(params),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000, // Refetch every 1 minute
    refetchIntervalInBackground: true, // Continue updating even when tab is not focused
    refetchOnWindowFocus: true, // Also refetch when user returns to tab
  });
}

async function fetchCities(): Promise<City[]> {
  const url = `${API_BASE_URL}/api/admin/dashboard/cities`;

  const response = await fetch(url, {
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`Erro ao buscar cidades: ${response.status}`);
  }

  return response.json();
}

export function useCities() {
  return useQuery<City[]>({
    queryKey: ["cities"],
    queryFn: fetchCities,
    staleTime: 300000, // 5 minutes
  });
}
