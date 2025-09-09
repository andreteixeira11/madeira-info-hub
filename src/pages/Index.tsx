import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { InformationTable } from "@/components/InformationTable";
import { NewRecordModal } from "@/components/NewRecordModal";
import { PDFGenerationModal } from "@/components/PDFGenerationModal";
import { Database, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import group761 from "@/assets/group-761.png";
import group764 from "@/assets/group-764.png";

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    year: "all",
    concelho: "Todos os Concelhos",
    freguesia: "all",
    area: "Todas as Áreas",
    secretaria: "Todas as Secretarias",
    search: ""
  });

  const [records, setRecords] = useState([]);
  const [showPDFModal, setShowPDFModal] = useState(false);

  const handleViewRecord = (id: string) => {
    toast({
      title: "Visualizar Registo",
      description: `A abrir detalhes do registo ${id}`,
    });
  };

  const handleDownloadRecord = (id: string) => {
    toast({
      title: "Download Iniciado",
      description: `A descarregar registo ${id}`,
    });
  };

  const handleAddRecord = (newRecord: any) => {
    const recordWithId = {
      ...newRecord,
      id: Date.now().toString(),
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      status: "ativo" as const
    };
    
    setRecords(prev => [recordWithId, ...prev]);
  };

  const handleGeneratePDF = () => {
    setShowPDFModal(true);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-government shadow-government relative overflow-hidden">
        <div 
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: `url(${group761})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
            backgroundSize: 'cover'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <img src={group764} alt="Logo" className="h-8 w-8 sm:h-12 sm:w-12" />
              <div className="hidden sm:block">
                <h1 className="font-montserrat text-title text-white">
                  Sistema de Informação Governamental
                </h1>
                <p className="font-montserrat text-sm text-blue-100">
                  Governo Regional da Madeira
                </p>
              </div>
              <div className="block sm:hidden">
                <h1 className="font-montserrat text-lg font-semibold text-white">
                  SIG
                </h1>
              </div>
            </div>
            <div className="flex gap-2 sm:gap-3">
              <Button 
                onClick={handleGeneratePDF}
                className="bg-button-yellow text-black hover:bg-button-yellow/90 border-0 font-montserrat text-sm sm:text-body"
                size="sm"
              >
                <Download className="h-4 w-4 mr-1 sm:mr-2" />
                <span className="hidden sm:inline">Gerar PDF</span>
                <span className="sm:hidden">PDF</span>
              </Button>
              <NewRecordModal onAddRecord={handleAddRecord} />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <FilterBar
          onYearChange={(year) => setFilters(prev => ({ ...prev, year }))}
          onConcelhoChange={(concelho) => setFilters(prev => ({ ...prev, concelho }))}
          onFreguesiaChange={(freguesia) => setFilters(prev => ({ ...prev, freguesia }))}
          onAreaChange={(area) => setFilters(prev => ({ ...prev, area }))}
          onSecretariaChange={(secretaria) => setFilters(prev => ({ ...prev, secretaria }))}
          onSearchChange={(search) => setFilters(prev => ({ ...prev, search }))}
          selectedYear={filters.year}
          selectedConcelho={filters.concelho}
          selectedFreguesia={filters.freguesia}
          selectedArea={filters.area}
          selectedSecretaria={filters.secretaria}
          searchTerm={filters.search}
          onGeneratePDF={handleGeneratePDF}
        />

        {/* Results Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-2">
          <div>
            <h2 className="font-montserrat text-title text-foreground">
              Informações Registadas
            </h2>
            <p className="font-montserrat text-body text-muted-foreground">
              {filters.search || filters.year !== "all" || filters.concelho !== "Todos os Concelhos" || filters.area !== "Todas as Áreas" || filters.secretaria !== "Todas as Secretarias"
                ? "Resultados filtrados" 
                : "Todas as informações disponíveis (inclui dados de exemplo de Machico)"}
            </p>
          </div>
          <div className="font-montserrat text-sm text-muted-foreground">
            {records.length + 8} registos encontrados
          </div>
        </div>

        {/* Information Table */}
        <InformationTable records={records} filters={filters} />
      </div>

      {/* PDF Generation Modal */}
      {showPDFModal && (
        <PDFGenerationModal 
          records={records} 
          onClose={() => setShowPDFModal(false)} 
        />
      )}
    </div>
  );
};

export default Index;