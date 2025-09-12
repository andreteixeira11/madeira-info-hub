import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Edit, ExternalLink, Paperclip } from "lucide-react";
import { EditRecordModal } from "@/components/EditRecordModal";

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
  value?: string;
  conclusionDate?: string;
  attachments?: Array<{name: string; url: string; type: 'file' | 'link'}>;
  news?: Array<{title: string; content: string; link?: string; date: string}>;
}

// Demo data from Machico
const demoRecords: InformationRecord[] = [
  {
    id: "machico-1",
    title: "Requalificação da rede viária regional - zona leste – PAMUS",
    description: "Projeto de requalificação da rede viária regional na zona leste da ilha da Madeira, incluindo melhorias no pavimento, sinalização e segurança rodoviária.",
    area: "Infraestruturas",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "João Silva",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2022-01-15",
    updatedAt: "2022-09-30",
    status: "ativo",
    value: "1.836.017,04 euros",
    conclusionDate: "2022-09-30",
    attachments: [],
    news: [{
      title: "Albuquerque defende suspensão do alojamento local em habitação colectiva",
      content: "Miguel Albuquerque defendeu à margem da inauguração da nova loja Continente Modelo em São Vicente, uma actuação mais firme dos municípios relativamente ao alojamento local, sobretudo em edifícios destinados a habitação permanente.",
      link: "https://www.dnoticias.pt/2025/7/30/457842-albuquerque-defende-suspensao-do-alojamento-local-em-habitacao-colectiva/",
      date: "2025-07-30"
    }, {
      title: "Albuquerque defende estabilidade na Madeira",
      content: "O presidente do Governo Regional da Madeira manifestou preocupação com uma eventual instabilidade política na região e destacou a importância de garantir um governo estável para assegurar o crescimento económico e social.",
      link: "https://www.dnoticias.pt/2025/3/19/442298-albuquerque-defende-estabilidade-na-madeira/",
      date: "2025-03-19"
    }]
  },
  {
    id: "machico-2", 
    title: "Estabilização da Margem Esquerda da Ribeira do Junçal, onde está implantada a ER 110",
    description: "Obras de estabilização e proteção da margem esquerda da Ribeira do Junçal para garantir a segurança da estrada regional ER 110.",
    area: "Infraestruturas",
    concelho: "Machico",
    freguesia: "Junçal",
    assessor: "Maria Costa",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2017-06-01",
    updatedAt: "2018-11-30",
    status: "ativo",
    value: "8.856.825 euros",
    conclusionDate: "2018-11-30",
    attachments: [],
    news: []
  },
  {
    id: "machico-3",
    title: "Reabilitação integral do Complexo Habitacional da Bemposta",
    description: "Recuperação completa do complexo habitacional da Bemposta, incluindo edifícios e espaços exteriores para melhorar as condições de habitabilidade.",
    area: "Infraestruturas", 
    concelho: "Machico",
    freguesia: "Bemposta",
    assessor: "Pedro Santos",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2016-03-10",
    updatedAt: "2017-12-31",
    status: "ativo",
    value: "222.367,02 euros",
    conclusionDate: "2017-12-31",
    attachments: [],
    news: []
  },
  {
    id: "machico-4",
    title: "Reabilitação do Cais de Machico",
    description: "Obras de reabilitação e modernização do cais de Machico para melhorar as infraestruturas portuárias e apoiar a atividade marítima local.",
    area: "Infraestruturas",
    concelho: "Machico", 
    freguesia: "Machico",
    assessor: "Ana Ferreira",
    secretaria: "Secretaria Regional das Infraestruturas",
    createdAt: "2018-01-20",
    updatedAt: "2019-10-31",
    status: "ativo",
    value: "1.928.307 euros",
    conclusionDate: "2019-10-31",
    attachments: [],
    news: []
  },
  {
    id: "machico-5",
    title: "Beneficiação escola Básica e secundária de Machico",
    description: "Obras de beneficiação e melhoramento das instalações da escola básica e secundária de Machico para proporcionar melhores condições de ensino.",
    area: "Cultura",
    concelho: "Machico",
    freguesia: "Machico", 
    assessor: "Carlos Rodrigues",
    secretaria: "Secretaria Regional da Cultura",
    createdAt: "2006-09-01",
    updatedAt: "2007-04-09",
    status: "ativo",
    value: "223.172,12 euros",
    conclusionDate: "2007-04-09",
    attachments: [],
    news: []
  },
  {
    id: "machico-6",
    title: "Remodelação da lota do Caniçal – Fase 1 – Unidade de gelo",
    description: "Primeira fase da remodelação da lota do Caniçal com foco na criação de uma unidade de gelo para apoiar a atividade piscatória.",
    area: "Agricultura e Pescas",
    concelho: "Machico",
    freguesia: "Caniçal",
    assessor: "Manuel Sousa",
    secretaria: "Secretaria Regional da Agricultura e Pescas",
    createdAt: "2019-01-15",
    updatedAt: "2020-12-31",
    status: "ativo",
    value: "1,3 milhões de euros",
    conclusionDate: "2020-12-31",
    attachments: [],
    news: []
  },
  {
    id: "machico-7",
    title: "Solar de São Cristóvão",
    description: "Recuperação e reabilitação do Solar de São Cristóvão, um importante património histórico e cultural de Machico.",
    area: "Cultura",
    concelho: "Machico",
    freguesia: "Machico",
    assessor: "Luisa Mendes",
    secretaria: "Secretaria Regional da Cultura", 
    createdAt: "2018-05-10",
    updatedAt: "2019-12-31",
    status: "ativo",
    value: "100 mil euros",
    conclusionDate: "2019-12-31",
    attachments: [],
    news: []
  },
  {
    id: "machico-8",
    title: "Sidraria do Santo António da Serra",
    description: "Construção de sidraria no Santo António da Serra para apoiar a produção local de sidra e promover a economia rural da região.",
    area: "Agricultura e Pescas",
    concelho: "Machico",
    freguesia: "Santo António da Serra",
    assessor: "António Pereira",
    secretaria: "Secretaria Regional da Agricultura e Pescas",
    createdAt: "2019-01-10",
    updatedAt: "2020-01-31", 
    status: "ativo",
    value: "347.001 euros",
    conclusionDate: "2020-01-31",
    attachments: [],
    news: []
  }
];

export default function RecordDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [record, setRecord] = useState<InformationRecord | null>(null);
  const [editModalOpen, setEditModalOpen] = useState(false);

  useEffect(() => {
    // Find record in demo data or user records
    const foundRecord = demoRecords.find(r => r.id === id);
    if (foundRecord) {
      setRecord(foundRecord);
    } else {
      // In a real app, you'd fetch from your state management or API
      navigate('/');
    }
  }, [id, navigate]);

  const handleEditRecord = (updatedRecord: any) => {
    setRecord(prev => prev ? { ...prev, ...updatedRecord } : null);
    setEditModalOpen(false);
  };

  if (!record) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-government shadow-government">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <Button
              variant="ghost"
              className="text-white hover:bg-white/10"
              onClick={() => navigate('/')}
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Voltar
            </Button>
            <Button
              variant="outline"
              className="bg-white text-primary hover:bg-blue-50"
              onClick={() => setEditModalOpen(true)}
            >
              <Edit className="h-4 w-4 mr-2" />
              Editar Registo
            </Button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Title and Basic Info */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">{record.title}</h1>
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary">{record.area}</Badge>
            <Badge variant="outline">{record.concelho}</Badge>
            <Badge variant="outline">{record.freguesia}</Badge>
            <Badge variant="outline">{record.secretaria}</Badge>
          </div>
        </div>

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Descrição</h2>
          <p className="text-muted-foreground leading-relaxed">{record.description}</p>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="font-semibold mb-2">Informações do Projeto</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Adicionado por:</span> {record.assessor}</div>
              {record.value && <div><span className="font-medium">Valor:</span> {record.value}</div>}
              {record.conclusionDate && (
                <div><span className="font-medium">Data de Conclusão:</span> {new Date(record.conclusionDate).toLocaleDateString('pt-PT')}</div>
              )}
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-2">Datas</h3>
            <div className="space-y-2 text-sm">
              <div><span className="font-medium">Criado em:</span> {new Date(record.createdAt).toLocaleDateString('pt-PT')}</div>
              <div><span className="font-medium">Atualizado em:</span> {new Date(record.updatedAt).toLocaleDateString('pt-PT')}</div>
            </div>
          </div>
        </div>

        {/* Update History */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-3">Histórico de Atualizações</h2>
          <div className="space-y-2">
            <div className="p-3 bg-muted/50 rounded-lg text-sm">
              <div className="font-medium">Última atualização</div>
              <div className="text-muted-foreground">{new Date(record.updatedAt).toLocaleDateString('pt-PT')} - Registo criado</div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Attachments */}
        {record.attachments && record.attachments.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">Anexos</h2>
            <div className="space-y-2">
              {record.attachments.map((attachment, index) => (
                <div key={index} className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                  {attachment.type === 'file' ? <Paperclip className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                  <a 
                    href={attachment.url} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="text-primary hover:underline"
                  >
                    {attachment.name}
                  </a>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News */}
        {record.news && record.news.length > 0 && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">O que se disse</h2>
            <div className="space-y-4">
              {record.news.map((newsItem, index) => (
                <div key={index} className="p-4 border rounded-lg bg-card">
                  <div className="flex items-start justify-between mb-3">
                    <h3 className="font-montserrat text-title text-foreground pr-4">{newsItem.title}</h3>
                    <div className="text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(newsItem.date).toLocaleDateString('pt-PT')}
                    </div>
                  </div>
                  
                  <p className="font-montserrat text-description text-muted-foreground mb-3 leading-relaxed">
                    {newsItem.content}
                  </p>
                  
                  {newsItem.link && (
                    <div className="flex items-center justify-between pt-2 border-t">
                      <div className="text-xs text-muted-foreground">
                        <span className="font-medium">Fonte:</span> {new URL(newsItem.link).hostname}
                      </div>
                      <a 
                        href={newsItem.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline flex items-center gap-1 text-sm font-montserrat"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Ler notícia completa
                      </a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {(!record.news || record.news.length === 0) && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-3">O que se disse</h2>
            <p className="text-muted-foreground">Ainda não foram adicionadas notícias para este registo.</p>
          </div>
        )}
      </div>

      {editModalOpen && (
        <EditRecordModal
          record={record}
          onSave={handleEditRecord}
          onClose={() => setEditModalOpen(false)}
        />
      )}
    </div>
  );
}