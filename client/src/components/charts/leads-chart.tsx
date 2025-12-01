import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

const data = [
  { name: "Jan", leadsEntregadores: 150, leadsEmpresas: 45 },
  { name: "Fev", leadsEntregadores: 180, leadsEmpresas: 52 },
  { name: "Mar", leadsEntregadores: 220, leadsEmpresas: 68 },
  { name: "Abr", leadsEntregadores: 260, leadsEmpresas: 75 },
  { name: "Mai", leadsEntregadores: 310, leadsEmpresas: 90 },
  { name: "Jun", leadsEntregadores: 350, leadsEmpresas: 110 },
];

export function LeadsChart() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Aquisição de Leads</CardTitle>
        <CardDescription>Novos cadastros de Entregadores vs. Empresas (CNPJ)</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis 
                dataKey="name" 
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
              />
              <Tooltip 
                cursor={{fill: 'hsl(var(--accent))', opacity: 0.3}}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Legend />
              <Bar 
                dataKey="leadsEntregadores" 
                name="Leads Entregadores"
                fill="hsl(var(--chart-1))" 
                radius={[4, 4, 0, 0]} 
              />
              <Bar 
                dataKey="leadsEmpresas" 
                name="Leads Empresas"
                fill="hsl(var(--chart-2))" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
