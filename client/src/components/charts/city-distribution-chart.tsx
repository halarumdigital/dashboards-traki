import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Cell } from "recharts";

const data = [
  { city: "São Paulo", entregadores: 1250, empresas: 450 },
  { city: "Rio de Janeiro", entregadores: 850, empresas: 320 },
  { city: "Belo Horizonte", entregadores: 620, empresas: 210 },
  { city: "Curitiba", entregadores: 480, empresas: 180 },
  { city: "Porto Alegre", entregadores: 390, empresas: 150 },
];

export function CityDistributionChart() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Distribuição Geográfica</CardTitle>
        <CardDescription>Entregadores e Empresas ativas por cidade</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide />
              <YAxis 
                dataKey="city" 
                type="category" 
                width={100}
                stroke="hsl(var(--muted-foreground))"
                fontSize={12} 
                tickLine={false} 
                axisLine={false} 
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="entregadores" name="Entregadores Ativos" stackId="a" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={20} />
              <Bar dataKey="empresas" name="Empresas Ativas" stackId="a" fill="hsl(var(--chart-4))" radius={[0, 4, 4, 0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
