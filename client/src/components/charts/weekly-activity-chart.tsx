import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, CartesianGrid, Legend, YAxis } from "recharts";
import type { OperationalDashboardData } from "@/hooks/use-operational-dashboard";

interface WeeklyActivityChartProps {
  data?: OperationalDashboardData["empresasVolume"];
  isLoading?: boolean;
}

export function WeeklyActivityChart({ data, isLoading }: WeeklyActivityChartProps) {
  const chartData = data?.map((item) => ({
    day: item.diaSemana,
    empresas: item.empresasAtivas,
    entregas: item.totalEntregas,
  })) || [];

  if (isLoading) {
    return (
      <Card className="col-span-4 md:col-span-2 lg:col-span-2">
        <CardHeader>
          <CardTitle>Empresas Ativas & Volume de Entregas</CardTitle>
          <CardDescription>Relação semanal de atividade</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-[300px] w-full flex items-center justify-center">
            <div className="h-6 w-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Empresas Ativas & Volume de Entregas</CardTitle>
        <CardDescription>Relação semanal de atividade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis
                dataKey="day"
                stroke="hsl(var(--muted-foreground))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="left"
                orientation="left"
                stroke="hsl(var(--chart-3))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                stroke="hsl(var(--primary))"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip
                cursor={{ fill: 'hsl(var(--accent))', opacity: 0.3 }}
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar
                yAxisId="left"
                dataKey="empresas"
                name="Empresas Ativas"
                fill="hsl(var(--chart-3))"
                radius={[4, 4, 0, 0]}
              />
              <Bar
                yAxisId="right"
                dataKey="entregas"
                name="Total de Entregas"
                fill="hsl(var(--primary))"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
