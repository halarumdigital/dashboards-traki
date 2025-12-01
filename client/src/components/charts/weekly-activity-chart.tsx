import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, Tooltip, CartesianGrid } from "recharts";

const data = [
  { day: "Seg", empresas: 120 },
  { day: "Ter", empresas: 132 },
  { day: "Qua", empresas: 145 },
  { day: "Qui", empresas: 160 },
  { day: "Sex", empresas: 185 },
  { day: "Sáb", empresas: 190 },
  { day: "Dom", empresas: 150 },
];

export function WeeklyActivityChart() {
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-2">
      <CardHeader>
        <CardTitle>Empresas Ativas (Semanal)</CardTitle>
        <CardDescription>Número de empresas realizando pedidos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="day" 
                stroke="hsl(var(--muted-foreground))" 
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                cursor={{fill: 'hsl(var(--accent))', opacity: 0.3}}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar 
                dataKey="empresas" 
                fill="hsl(var(--chart-3))" 
                radius={[4, 4, 0, 0]} 
                barSize={30}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
