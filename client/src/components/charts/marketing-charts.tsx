import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend,
  Line, LineChart, Area, AreaChart
} from "recharts";

const campaignData = [
  { name: "Verão 2025", clicks: 4500, conversions: 320, spend: 1200 },
  { name: "Volta às Aulas", clicks: 3800, conversions: 280, spend: 950 },
  { name: "Frete Grátis", clicks: 5200, conversions: 450, spend: 1500 },
  { name: "Instalação App", clicks: 6100, conversions: 890, spend: 2100 },
  { name: "Retargeting", clicks: 2100, conversions: 180, spend: 600 },
];

const engagementData = [
  { date: "01/12", instagram: 1200, facebook: 800, linkedin: 400 },
  { date: "05/12", instagram: 1350, facebook: 850, linkedin: 420 },
  { date: "10/12", instagram: 1500, facebook: 900, linkedin: 450 },
  { date: "15/12", instagram: 1800, facebook: 950, linkedin: 500 },
  { date: "20/12", instagram: 2100, facebook: 1100, linkedin: 550 },
  { date: "25/12", instagram: 2400, facebook: 1200, linkedin: 580 },
  { date: "30/12", instagram: 2200, facebook: 1150, linkedin: 560 },
];

export function CampaignPerformanceChart() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Performance de Campanhas</CardTitle>
        <CardDescription>Cliques vs. Conversões por Campanha</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={campaignData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="left" orientation="left" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis yAxisId="right" orientation="right" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{fill: 'hsl(var(--accent))', opacity: 0.3}}
                contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }}
              />
              <Legend />
              <Bar yAxisId="left" dataKey="clicks" name="Cliques" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
              <Bar yAxisId="right" dataKey="conversions" name="Conversões" fill="hsl(var(--chart-4))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function EngagementTrendChart() {
  return (
    <Card className="col-span-4 lg:col-span-2">
      <CardHeader>
        <CardTitle>Engajamento Social</CardTitle>
        <CardDescription>Interações por plataforma nos últimos 30 dias</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={engagementData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorInsta" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-5))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-5))" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="colorFb" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--chart-1))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--chart-1))" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <XAxis dataKey="date" stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} tickLine={false} axisLine={false} />
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
              <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", borderColor: "hsl(var(--border))", borderRadius: "8px" }} />
              <Area type="monotone" dataKey="instagram" name="Instagram" stroke="hsl(var(--chart-5))" fillOpacity={1} fill="url(#colorInsta)" />
              <Area type="monotone" dataKey="facebook" name="Facebook" stroke="hsl(var(--chart-1))" fillOpacity={1} fill="url(#colorFb)" />
              <Area type="monotone" dataKey="linkedin" name="LinkedIn" stroke="hsl(var(--chart-3))" fill="transparent" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
