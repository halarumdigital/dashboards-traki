import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import type { OperationalDashboardData } from "@/hooks/use-operational-dashboard";

const COLORS = [
  "hsl(var(--chart-1))", // Blue - Concluídas
  "hsl(var(--destructive))", // Red - Canceladas
  "hsl(var(--chart-4))", // Yellow - Em Aberto
  "hsl(var(--chart-2))", // Green - Em Andamento
];

interface DeliveryStatusChartProps {
  data?: OperationalDashboardData["statusEntregas"];
  isLoading?: boolean;
}

export function DeliveryStatusChart({ data, isLoading }: DeliveryStatusChartProps) {
  const chartData = data ? [
    { name: "Concluídas", value: data.concluidas },
    { name: "Canceladas", value: data.canceladas },
    { name: "Em Aberto", value: data.emAberto },
    { name: "Em Andamento", value: data.emAndamento },
  ] : [];

  const total = data?.total || 0;
  const cancelledPercentage = data?.taxaCancelamento?.toFixed(1) || "0.0";

  if (isLoading) {
    return (
      <Card className="col-span-4 lg:col-span-1">
        <CardHeader>
          <CardTitle>Status das Entregas</CardTitle>
          <CardDescription>Carregando...</CardDescription>
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
    <Card className="col-span-4 lg:col-span-1">
      <CardHeader>
        <CardTitle>Status das Entregas</CardTitle>
        <CardDescription>Taxa de cancelamento: {cancelledPercentage}%</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {chartData.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend verticalAlign="bottom" height={36} iconType="circle" />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none mb-5">
            <div className="text-3xl font-bold">{total}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
