import { useState } from "react";
import { FilterBar } from "@/components/FilterBar";
import { StatsCards } from "@/components/StatsCards";
import { InformationGrid } from "@/components/InformationGrid";
import { Button } from "@/components/ui/button";
import { Plus, Database } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    year: "all",
    concelho: "Todos os Concelhos",
    freguesia: "all",
    area: "Todas as Áreas",
    search: ""
  });

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

  const handleAddRecord = () => {
    toast({
      title: "Funcionalidade em Desenvolvimento",
      description: "A funcionalidade de adicionar registos estará disponível em breve.",
    });
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
            <Button 
              onClick={handleAddRecord}
              className="bg-white text-primary hover:bg-blue-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              Novo Registo
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Statistics Cards */}
        <StatsCards 
          totalRecords={1247}
          totalAssessors={28}
          totalConcelhos={11}
          monthlyGrowth={12}
        />

        {/* Filters */}
        <FilterBar
          onYearChange={(year) => setFilters(prev => ({ ...prev, year }))}
          onConcelhoChange={(concelho) => setFilters(prev => ({ ...prev, concelho }))}
          onFreguesiaChange={(freguesia) => setFilters(prev => ({ ...prev, freguesia }))}
          onAreaChange={(area) => setFilters(prev => ({ ...prev, area }))}
          onSearchChange={(search) => setFilters(prev => ({ ...prev, search }))}
          selectedYear={filters.year}
          selectedConcelho={filters.concelho}
          selectedFreguesia={filters.freguesia}
          selectedArea={filters.area}
          searchTerm={filters.search}
        />

        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-foreground">
              Informações Registadas
            </h2>
            <p className="text-muted-foreground">
              {filters.search || filters.year !== "all" || filters.concelho !== "Todos os Concelhos" || filters.area !== "Todas as Áreas" 
                ? "Resultados filtrados" 
                : "Todas as informações disponíveis"}
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            4 registos encontrados
          </div>
        </div>

        {/* Information Grid */}
        <InformationGrid 
          records={[]} // Will use mock data from component
          onViewRecord={handleViewRecord}
          onDownloadRecord={handleDownloadRecord}
        />
      </div>
    </div>
  );
};

export default Index;