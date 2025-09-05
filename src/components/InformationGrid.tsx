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
    title: "Construção de 45km de Novas Estradas Regionais",
    description: "Projeto de expansão da rede viária regional incluindo a construção de 45 quilómetros de novas estradas, beneficiando diretamente 12 freguesias e melhorando a conectividade entre concelhos.",
    area: "Infraestruturas",
    concelho: "Funchal",
    freguesia: "Monte",
    assessor: "Eng. Maria Silva",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2024-01-15",
    updatedAt: "2024-01-20",
    status: "ativo"
  },
  {
    id: "2", 
    title: "Reabilitação de 280 Habitações Sociais",
    description: "Programa abrangente de reabilitação de habitações sociais, incluindo melhorias na eficiência energética, acessibilidade e qualidade de vida de 280 famílias madeirenses.",
    area: "Infraestruturas",
    concelho: "Câmara de Lobos",
    freguesia: "Estreito de Câmara de Lobos",
    assessor: "Arq. João Pereira",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2024-01-10",
    updatedAt: "2024-01-18",
    status: "ativo"
  },
  {
    id: "3",
    title: "Abertura de 18km de Caminhos Agrícolas",
    description: "Criação e beneficiação de caminhos agrícolas para facilitar o acesso às zonas de produção, beneficiando 150 produtores locais e melhorando o escoamento de produtos agrícolas.",
    area: "Agricultura e Pescas",
    concelho: "Santa Cruz",
    freguesia: "Camacha",
    assessor: "Eng. Ana Costa",
    secretaria: "Secretaria Regional da Agricultura e Pescas",
    createdAt: "2024-01-08",
    updatedAt: "2024-01-16",
    status: "em_revisao"
  },
  {
    id: "4",
    title: "Construção de 12 Postos de Saúde Rurais",
    description: "Ampliação da rede de cuidados de saúde primários com a construção de 12 novos postos de saúde em zonas rurais, servindo uma população de aproximadamente 8.000 habitantes.",
    area: "Saúde e Proteção Civil",
    concelho: "Machico",
    freguesia: "Porto da Cruz",
    assessor: "Dr. Pedro Santos",
    secretaria: "Secretaria Regional da Saúde e Proteção Civil",
    createdAt: "2024-01-05",
    updatedAt: "2024-01-14",
    status: "ativo"
  },
  {
    id: "5",
    title: "Modernização de 25 Escolas Básicas",
    description: "Projeto de modernização e digitalização de 25 estabelecimentos de ensino básico, incluindo renovação de equipamentos, infraestruturas tecnológicas e espaços de aprendizagem.",
    area: "Economia",
    concelho: "Ribeira Brava",
    freguesia: "Ribeira Brava",
    assessor: "Prof. Clara Mendes",
    secretaria: "Secretaria Regional da Economia",
    createdAt: "2024-01-03",
    updatedAt: "2024-01-12",
    status: "ativo"
  },
  {
    id: "6",
    title: "Instalação de 150 Pontos de Carregamento Elétrico",
    description: "Expansão da rede de mobilidade elétrica com instalação de 150 novos pontos de carregamento distribuídos estrategicamente por todos os concelhos da Região.",
    area: "Ambiente",
    concelho: "Porto Santo",
    freguesia: "Porto Santo",
    assessor: "Eng. Rui Fernandes",
    secretaria: "Secretaria Regional do Ambiente",
    createdAt: "2024-01-01",
    updatedAt: "2024-01-10",
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

              <div className="text-xs text-muted-foreground pt-1 border-t">
                {record.secretaria}
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