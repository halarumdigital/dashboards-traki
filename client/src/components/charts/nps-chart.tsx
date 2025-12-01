import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

const data = [
  { name: "Empresas", score: 72, fill: "hsl(var(--chart-1))" },
  { name: "Entregadores", score: 65, fill: "hsl(var(--chart-2))" },
];

export function NPSChart() {
  return (
    <Card className="col-span-4 md:col-span-2 lg:col-span-1">
      <CardHeader>
        <CardTitle>NPS</CardTitle>
        <CardDescription>Net Promoter Score atual</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full flex flex-col justify-center">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 0, right: 30 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="hsl(var(--border))" />
              <XAxis type="number" hide domain={[0, 100]} />
              <YAxis 
                dataKey="name" 
                type="category" 
                width={100} 
                tick={{ fill: 'hsl(var(--foreground))', fontSize: 12 }} 
                axisLine={false}
                tickLine={false}
              />
              <Tooltip 
                cursor={{fill: 'transparent'}}
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  borderColor: "hsl(var(--border))",
                  borderRadius: "8px"
                }}
              />
              <Bar dataKey="score" radius={[0, 4, 4, 0]} barSize={40}>
                 {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
