import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend
} from "recharts";

const data = [
  { time: "08:00", entregadores: 20, pedidos: 15 },
  { time: "10:00", entregadores: 45, pedidos: 30 },
  { time: "12:00", entregadores: 55, pedidos: 85 },
  { time: "14:00", entregadores: 50, pedidos: 45 },
  { time: "16:00", entregadores: 60, pedidos: 50 },
  { time: "18:00", entregadores: 75, pedidos: 90 },
  { time: "20:00", entregadores: 80, pedidos: 110 },
  { time: "22:00", entregadores: 40, pedidos: 60 },
];

export function CourierDemandChart() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Demanda vs. Disponibilidade</CardTitle>
        <CardDescription>
          Relação entre entregadores disponíveis e pedidos em aberto (Hoje)
        </CardDescription>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorPedidos" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorEntregadores" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-2))" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="hsl(var(--chart-2))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="time" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <YAxis 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
                tickFormatter={(value) => `${value}`} 
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
                itemStyle={{ color: "hsl(var(--foreground))" }}
              />
              <Legend wrapperStyle={{ paddingTop: "20px" }} />
              <Area
                type="monotone"
                dataKey="pedidos"
                name="Pedidos em Aberto"
                stroke="hsl(var(--chart-1))"
                fillOpacity={1}
                fill="url(#colorPedidos)"
                strokeWidth={2}
              />
              <Area
                type="monotone"
                dataKey="entregadores"
                name="Entregadores Disponíveis"
                stroke="hsl(var(--chart-2))"
                fillOpacity={1}
                fill="url(#colorEntregadores)"
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
