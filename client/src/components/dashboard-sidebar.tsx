import { Link, useLocation } from "wouter";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  BarChart3, 
  Settings, 
  LogOut,
  Bike,
  Building2
} from "lucide-react";
import { cn } from "@/lib/utils";

export function DashboardSidebar() {
  const [location] = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: "Visão Geral", href: "/" },
    { icon: Package, label: "Entregas", href: "/entregas" },
    { icon: Bike, label: "Entregadores", href: "/entregadores" },
    { icon: Building2, label: "Empresas", href: "/empresas" },
    { icon: BarChart3, label: "Relatórios", href: "/relatorios" },
    { icon: Settings, label: "Configurações", href: "/configuracoes" },
  ];

  return (
    <aside className="hidden h-screen w-64 flex-col border-r bg-card text-card-foreground md:flex fixed left-0 top-0 z-30">
      <div className="flex h-16 items-center border-b px-6">
        <div className="flex items-center gap-2 font-bold text-xl text-primary">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground">
            <Bike className="h-5 w-5" />
          </div>
          FlashDelivery
        </div>
      </div>

      <div className="flex-1 overflow-y-auto py-6 px-4">
        <nav className="space-y-1">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href}>
              <a
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                  location === item.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </a>
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t p-4">
        <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground hover:bg-accent hover:text-foreground transition-all">
          <LogOut className="h-4 w-4" />
          Sair
        </button>
      </div>
    </aside>
  );
}
