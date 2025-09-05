import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, Users, Building, TrendingUp } from "lucide-react";

interface StatsCardsProps {
  totalRecords: number;
  totalAssessors: number;
  totalConcelhos: number;
  monthlyGrowth: number;
}

export function StatsCards({ totalRecords, totalAssessors, totalConcelhos, monthlyGrowth }: StatsCardsProps) {
  const stats = [
    {
      title: "Total de Registos",
      value: totalRecords.toLocaleString(),
      icon: FileText,
      description: "Informações registadas",
      color: "text-primary"
    },
    {
      title: "Assessores Ativos",
      value: totalAssessors.toString(),
      icon: Users,
      description: "Colaboradores registando",
      color: "text-government-accent"
    },
    {
      title: "Concelhos Cobertos",
      value: `${totalConcelhos}/11`,
      icon: Building,
      description: "Cobertura territorial",
      color: "text-blue-600"
    },
    {
      title: "Crescimento Mensal",
      value: `+${monthlyGrowth}%`,
      icon: TrendingUp,
      description: "Novos registos este mês",
      color: "text-green-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
      {stats.map((stat, index) => (
        <Card key={index} className="shadow-card-soft hover:shadow-government transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">{stat.value}</div>
            <p className="text-xs text-muted-foreground">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}