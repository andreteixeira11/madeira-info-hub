import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { StatsCards } from "@/components/StatsCards";
import { InformationGrid } from "@/components/InformationGrid";
import { NewRecordModal } from "@/components/NewRecordModal";
import { Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-gradient-government shadow-government">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center gap-3">
              <Database className="h-8 w-8 text-white" />
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Sistema de Informação Governamental
                </h1>
                <p className="text-blue-100">
                  Governo Regional da Madeira
                </p>
              </div>
            </div>
            <NewRecordModal onAddRecord={handleAddRecord} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <StatsCards 
          totalRecords={1847}
          totalAssessors={34}
          totalConcelhos={11}
          monthlyGrowth={15}
        />

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
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Informações Registadas
            </h2>
            <p className="text-muted-foreground">
              {filters.search || filters.year !== "all" || filters.concelho !== "Todos os Concelhos" || filters.area !== "Todas as Áreas" || filters.secretaria !== "Todas as Secretarias"
                ? "Resultados filtrados" 
                : "Todas as informações disponíveis"}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            {records.length + 6} registos encontrados
          </div>
        </div>

        {/* Information Grid */}
        <InformationGrid 
          records={records}
          onViewRecord={handleViewRecord}
          onDownloadRecord={handleDownloadRecord}
        />
      </div>
    </div>
  );
};

export default Index;