import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, Calendar, MapPin, Building2, User } from "lucide-react";

interface InformationRecord {
  id: string;
  title: string;
  description: string;
  area: string;
  concelho: string;
  freguesia: string;
  assessor: string;
  secretaria: string;
  createdAt: string;
  updatedAt: string;
  status: "ativo" | "arquivado" | "em_revisao";
}

interface InformationGridProps {
  records: InformationRecord[];
  onViewRecord: (id: string) => void;
  onDownloadRecord: (id: string) => void;
}

const mockRecords: InformationRecord[] = [
  {
    id: "1",
    title: "Projeto de Requalificação Urbana do Centro do Funchal",
    description: "Plano detalhado para renovação das infraestruturas urbanas na zona histórica da cidade",
    area: "Infraestruturas",
    concelho: "Funchal",
    freguesia: "Sé",
    assessor: "Maria Silva",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    status: "ativo"
  },
  {
    id: "2", 
    title: "Programa de Apoio à Agricultura Familiar",
    description: "Iniciativa de suporte aos pequenos produtores agrícolas da região com subsídios e formação",
    area: "Agricultura e Pescas",
    concelho: "Câmara de Lobos",
    freguesia: "Jardim da Serra",
    assessor: "João Pereira",
    secretaria: "Secretaria Regional da Agricultura",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    status: "ativo"
  },
  {
    id: "3",
    title: "Campanha de Sensibilização Ambiental nas Escolas",
    description: "Programa educativo sobre sustentabilidade e proteção ambiental dirigido aos estudantes",
    area: "Ambiente e Recursos Naturais",
    concelho: "Santa Cruz",
    freguesia: "Santa Cruz",
    assessor: "Ana Costa",
    secretaria: "Secretaria Regional do Ambiente",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    status: "em_revisao"
  },
  {
    id: "4",
    title: "Festival de Cultura Tradicional Madeirense",
    description: "Evento anual de promoção das tradições culturais da Madeira com folclore e gastronomia",
    area: "Cultura e Turismo",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Pedro Santos",
    secretaria: "Secretaria Regional do Turismo e Cultura",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-14",
    status: "ativo"
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case "ativo":
      return "bg-green-100 text-green-800 border-green-200";
    case "em_revisao":
      return "bg-yellow-100 text-yellow-800 border-yellow-200";
    case "arquivado":
      return "bg-gray-100 text-gray-800 border-gray-200";
    default:
      return "bg-gray-100 text-gray-800 border-gray-200";
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case "ativo":
      return "Ativo";
    case "em_revisao":
      return "Em Revisão";
    case "arquivado":
      return "Arquivado";
    default:
      return status;
  }
};

export function InformationGrid({ records = mockRecords, onViewRecord, onDownloadRecord }: InformationGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {records.map((record) => (
        <Card key={record.id} className="shadow-card-soft hover:shadow-government transition-all duration-200 hover:translate-y-[-2px]">
          <CardHeader className="pb-3">
            <div className="flex items-start justify-between">
              <CardTitle className="text-lg font-semibold text-foreground line-clamp-2 pr-2">
                {record.title}
              </CardTitle>
              <Badge className={getStatusColor(record.status)}>
                {getStatusText(record.status)}
              </Badge>
            </div>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <p className="text-sm text-muted-foreground line-clamp-3">
              {record.description}
            </p>
            
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm">
                <Building2 className="h-4 w-4 text-primary" />
                <span className="font-medium text-primary">{record.area}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>{record.concelho} • {record.freguesia}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{record.assessor}</span>
              </div>
              
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>Atualizado: {new Date(record.updatedAt).toLocaleDateString('pt-PT')}</span>
              </div>
            </div>
            
            <div className="flex gap-2 pt-2">
              <Button 
                variant="default" 
                size="sm" 
                onClick={() => onViewRecord(record.id)}
                className="flex-1"
              >
                <Eye className="h-4 w-4 mr-2" />
                Ver Detalhes
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => onDownloadRecord(record.id)}
              >
                <Download className="h-4 w-4" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}