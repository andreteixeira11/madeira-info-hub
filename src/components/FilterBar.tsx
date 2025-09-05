import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FilterBarProps {
  onYearChange: (year: string) => void;
  onConcelhoChange: (concelho: string) => void;
  onFreguesiaChange: (freguesia: string) => void;
  onAreaChange: (area: string) => void;
  onSearchChange: (search: string) => void;
  selectedYear: string;
  selectedConcelho: string;
  selectedFreguesia: string;
  selectedArea: string;
  searchTerm: string;
}

const concelhos = [
  "Todos os Concelhos",
  "Funchal",
  "Câmara de Lobos",
  "Ribeira Brava",
  "Ponta do Sol",
  "Calheta",
  "Porto Moniz",
  "São Vicente",
  "Santana",
  "Machico",
  "Santa Cruz",
  "Porto Santo"
];

const areas = [
  "Todas as Áreas",
  "Agricultura e Pescas",
  "Ambiente e Recursos Naturais",
  "Cultura e Turismo", 
  "Economia e Finanças",
  "Educação",
  "Equipamento Social",
  "Infraestruturas",
  "Saúde",
  "Segurança e Proteção Civil",
  "Trabalho e Formação Profissional"
];

export function FilterBar({
  onYearChange,
  onConcelhoChange,
  onFreguesiaChange,
  onAreaChange,
  onSearchChange,
  selectedYear,
  selectedConcelho,
  selectedFreguesia,
  selectedArea,
  searchTerm
}: FilterBarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="bg-card shadow-card-soft rounded-lg p-6 mb-6">
      <div className="flex items-center gap-2 mb-4">
        <Filter className="h-5 w-5 text-primary" />
        <h2 className="text-lg font-semibold text-foreground">Filtros de Pesquisa</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Search */}
        <div className="lg:col-span-2 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Pesquisar informações..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Year Filter */}
        <Select value={selectedYear} onValueChange={onYearChange}>
          <SelectTrigger>
            <SelectValue placeholder="Ano" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos os Anos</SelectItem>
            {years.map((year) => (
              <SelectItem key={year} value={year}>
                {year}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Concelho Filter */}
        <Select value={selectedConcelho} onValueChange={onConcelhoChange}>
          <SelectTrigger>
            <SelectValue placeholder="Concelho" />
          </SelectTrigger>
          <SelectContent>
            {concelhos.map((concelho) => (
              <SelectItem key={concelho} value={concelho}>
                {concelho}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Freguesia Filter */}
        <Select value={selectedFreguesia} onValueChange={onFreguesiaChange}>
          <SelectTrigger>
            <SelectValue placeholder="Freguesia" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas as Freguesias</SelectItem>
            {/* Freguesias seriam carregadas dinamicamente baseadas no concelho */}
            <SelectItem value="freguesia1">Exemplo Freguesia 1</SelectItem>
            <SelectItem value="freguesia2">Exemplo Freguesia 2</SelectItem>
          </SelectContent>
        </Select>

        {/* Area Filter */}
        <Select value={selectedArea} onValueChange={onAreaChange}>
          <SelectTrigger>
            <SelectValue placeholder="Área" />
          </SelectTrigger>
          <SelectContent>
            {areas.map((area) => (
              <SelectItem key={area} value={area}>
                {area}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex justify-end mt-4">
        <Button 
          variant="outline" 
          onClick={() => {
            onYearChange("all");
            onConcelhoChange("Todos os Concelhos");
            onFreguesiaChange("all");
            onAreaChange("Todas as Áreas");
            onSearchChange("");
          }}
        >
          Limpar Filtros
        </Button>
      </div>
    </div>
  );
}