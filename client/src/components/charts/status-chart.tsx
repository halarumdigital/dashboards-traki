import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

const data = [
  { name: "Finalizadas", value: 850 },
  { name: "Canceladas", value: 45 },
  { name: "Não Finalizadas", value: 25 },
];

const COLORS = [
  "hsl(var(--chart-1))", // Blue
  "hsl(var(--destructive))", // Red
  "hsl(var(--chart-4))", // Yellow
];

export function DeliveryStatusChart() {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const cancelledPercentage = ((data[1].value / total) * 100).toFixed(1);

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
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                fill="#8884d8"
                paddingAngle={5}
                dataKey="value"
              >
                {data.map((entry, index) => (
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
