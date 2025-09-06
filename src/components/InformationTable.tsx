import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Download, ExternalLink, Paperclip } from "lucide-react";

interface Attachment {
  name: string;
  url: string;
  type: 'file' | 'link';
}

interface News {
  title: string;
  content: string;
  link?: string;
  date: string;
}

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
  attachments?: Attachment[];
  news?: News[];
  value?: string;
  conclusionDate?: string;
}

interface InformationTableProps {
  records: InformationRecord[];
  onViewRecord: (id: string) => void;
  onDownloadRecord: (id: string) => void;
}

// Dados detalhados de Machico
const machicoRecords: InformationRecord[] = [
  {
    id: "machico-1",
    title: "Requalificação da rede viária regional - zona leste – PAMUS",
    description: "Projeto de requalificação da rede viária na zona leste da região, melhorando a conectividade e segurança rodoviária.",
    area: "Infraestruturas",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Eng. Carlos Silva",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2022-01-15",
    updatedAt: "2022-09-20",
    status: "ativo",
    value: "1.836.017,04 euros",
    conclusionDate: "2022-09-01",
    attachments: [],
    news: []
  },
  {
    id: "machico-2", 
    title: "Estabilização da ER102 – Massapez",
    description: "Obras de estabilização e segurança da Estrada Regional 102 na zona do Massapez, garantindo a segurança dos utentes.",
    area: "Infraestruturas",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Eng. Maria Santos",
    secretaria: "Secretaria Regional das Infraestruturas", 
    createdAt: "2017-03-10",
    updatedAt: "2017-12-30",
    status: "ativo",
    value: "505.080 euros",
    conclusionDate: "2017-12-01",
    attachments: [],
    news: []
  },
  {
    id: "machico-3",
    title: "Reabilitação integral do Complexo Habitacional da Bemposta",
    description: "Recuperação completa de edifícios e espaços exteriores do complexo habitacional, melhorando as condições de vida dos residentes.",
    area: "Infraestruturas",
    concelho: "Machico", 
    freguesia: "Machico",
    assessor: "Arq. João Pereira",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2016-08-20",
    updatedAt: "2017-06-15",
    status: "ativo",
    value: "222.367,02 euros",
    conclusionDate: "2017-01-01",
    attachments: [],
    news: []
  },
  {
    id: "machico-4",
    title: "Reabilitação do Cais de Machico",
    description: "Modernização e reabilitação das infraestruturas portuárias do cais de Machico, melhorando as condições para atividades marítimas.",
    area: "Infraestruturas",
    concelho: "Machico",
    freguesia: "Machico", 
    assessor: "Eng. Ana Costa",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2018-05-12",
    updatedAt: "2019-10-25",
    status: "ativo",
    value: "1.928.307 euros",
    conclusionDate: "2019-10-01",
    attachments: [],
    news: []
  },
  {
    id: "machico-5",
    title: "Beneficiação escola Básica e secundária de Machico",
    description: "Obras de beneficiação e modernização da Escola Básica e Secundária de Machico, melhorando as condições de ensino.",
    area: "Economia",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Prof. Clara Mendes", 
    secretaria: "Secretaria Regional da Economia",
    createdAt: "2006-09-15",
    updatedAt: "2007-04-09",
    status: "ativo",
    value: "223.172,12 euros",
    conclusionDate: "2007-04-09",
    attachments: [],
    news: []
  },
  {
    id: "machico-6",
    title: "Reparação de danos no Centro de Saúde de Machico",
    description: "Reparação e manutenção das instalações do Centro de Saúde de Machico para garantir o funcionamento adequado dos serviços de saúde.",
    area: "Saúde e Proteção Civil",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Dr. Pedro Santos",
    secretaria: "Secretaria Regional da Saúde e Proteção Civil",
    createdAt: "2017-07-10", 
    updatedAt: "2017-10-11",
    status: "ativo",
    value: "50.000 euros",
    conclusionDate: "2017-10-11",
    attachments: [],
    news: []
  },
  {
    id: "machico-7",
    title: "Remodelação da lota do Caniçal – Fase 1 – Unidade de gelo",
    description: "Primeira fase da remodelação da lota do Caniçal com foco na unidade de gelo, modernizando as instalações de apoio à pesca.",
    area: "Agricultura e Pescas",
    concelho: "Machico",
    freguesia: "Caniçal",
    assessor: "Eng. Rui Fernandes",
    secretaria: "Secretaria Regional da Agricultura e Pescas",
    createdAt: "2019-03-18",
    updatedAt: "2020-08-20",
    status: "ativo",
    value: "1.300.000 euros", 
    conclusionDate: "2020-01-01",
    attachments: [],
    news: []
  },
  {
    id: "machico-8",
    title: "Solar de São Cristóvão",
    description: "Recuperação e valorização do Solar de São Cristóvão, património histórico importante da região de Machico.",
    area: "Cultura",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Dr. Luís Almeida",
    secretaria: "Secretaria Regional da Cultura",
    createdAt: "2018-04-25",
    updatedAt: "2019-07-15",
    status: "ativo",
    value: "100.000 euros",
    conclusionDate: "2019-01-01",
    attachments: [],
    news: []
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

export function InformationTable({ records = machicoRecords, onViewRecord, onDownloadRecord }: InformationTableProps) {
  const allRecords = [...machicoRecords, ...records];

  return (
    <div className="bg-card rounded-lg border shadow-card-soft overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-muted/50">
            <TableHead className="font-semibold">Projeto</TableHead>
            <TableHead className="font-semibold">Área</TableHead>
            <TableHead className="font-semibold">Localização</TableHead>
            <TableHead className="font-semibold">Assessor</TableHead>
            <TableHead className="font-semibold">Valor</TableHead>
            <TableHead className="font-semibold">Conclusão</TableHead>
            <TableHead className="font-semibold">Estado</TableHead>
            <TableHead className="font-semibold text-center">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allRecords.map((record) => (
            <TableRow key={record.id} className="hover:bg-muted/30">
              <TableCell className="max-w-xs">
                <div>
                  <h4 className="font-medium text-foreground line-clamp-2 mb-1">{record.title}</h4>
                  <p className="text-sm text-muted-foreground line-clamp-2">{record.description}</p>
                  {(record.attachments?.length || record.news?.length) && (
                    <div className="flex gap-1 mt-2">
                      {record.attachments?.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <Paperclip className="h-3 w-3" />
                          <span>{record.attachments.length} anexo(s)</span>
                        </div>
                      )}
                      {record.news?.length > 0 && (
                        <div className="flex items-center gap-1 text-xs text-primary">
                          <ExternalLink className="h-3 w-3" />
                          <span>{record.news.length} notícia(s)</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                <Badge variant="secondary" className="bg-primary/10 text-primary">
                  {record.area}
                </Badge>
              </TableCell>
              <TableCell className="text-sm">
                <div>
                  <div className="font-medium">{record.concelho}</div>
                  <div className="text-muted-foreground">{record.freguesia}</div>
                </div>
              </TableCell>
              <TableCell className="text-sm">
                <div>
                  <div className="font-medium">{record.assessor}</div>
                  <div className="text-xs text-muted-foreground line-clamp-1" title={record.secretaria}>
                    {record.secretaria}
                  </div>
                </div>
              </TableCell>
              <TableCell className="text-sm font-medium">
                {record.value || "N/A"}
              </TableCell>
              <TableCell className="text-sm">
                {record.conclusionDate 
                  ? new Date(record.conclusionDate).toLocaleDateString('pt-PT')
                  : "N/A"
                }
              </TableCell>
              <TableCell>
                <Badge className={getStatusColor(record.status)}>
                  {getStatusText(record.status)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-1 justify-center">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onViewRecord(record.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => onDownloadRecord(record.id)}
                    className="h-8 w-8 p-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}