import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Search, Filter, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FilterBarProps {
  onYearChange: (year: string) => void;
  onConcelhoChange: (concelho: string) => void;
  onFreguesiaChange: (freguesia: string) => void;
  onAreaChange: (area: string) => void;
  onSecretariaChange: (secretaria: string) => void;
  onSearchChange: (search: string) => void;
  selectedYear: string;
  selectedConcelho: string;
  selectedFreguesia: string;
  selectedArea: string;
  selectedSecretaria: string;
  searchTerm: string;
  onGeneratePDF: () => void;
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
  "Infraestruturas",
  "Saúde e Proteção Civil",
  "Economia",
  "Finanças",
  "Turismo",
  "Cultura",
  "Ambiente"
];

const secretarias = [
  "Todas as Secretarias",
  "Secretaria Regional da Agricultura e Pescas",
  "Secretaria Regional das Infraestruturas",
  "Secretaria Regional da Saúde e Proteção Civil",
  "Secretaria Regional da Economia",
  "Secretaria Regional das Finanças",
  "Secretaria Regional do Turismo",
  "Secretaria Regional da Cultura",
  "Secretaria Regional do Ambiente"
];

export function FilterBar({
  onYearChange,
  onConcelhoChange,
  onFreguesiaChange,
  onAreaChange,
  onSecretariaChange,
  onSearchChange,
  selectedYear,
  selectedConcelho,
  selectedFreguesia,
  selectedArea,
  selectedSecretaria,
  searchTerm,
  onGeneratePDF
}: FilterBarProps) {
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  return (
    <div className="bg-card shadow-card-soft rounded-lg mb-6">
      <Accordion type="single" collapsible defaultValue="">
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="px-4 sm:px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="font-montserrat text-title text-foreground">Filtros de Pesquisa</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 sm:px-6 pb-6">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar informações..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9 font-montserrat"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
              {/* Year Filter */}
              <Select value={selectedYear} onValueChange={onYearChange}>
                <SelectTrigger className="font-montserrat">
                  <SelectValue placeholder="Ano" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todos os Anos</SelectItem>
                  {years.map((year) => (
                    <SelectItem key={year} value={year} className="font-montserrat">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Concelho Filter */}
              <Select value={selectedConcelho} onValueChange={onConcelhoChange}>
                <SelectTrigger className="font-montserrat">
                  <SelectValue placeholder="Concelho" />
                </SelectTrigger>
                <SelectContent>
                  {concelhos.map((concelho) => (
                    <SelectItem key={concelho} value={concelho} className="font-montserrat">
                      {concelho}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Area Filter */}
              <Select value={selectedArea} onValueChange={onAreaChange}>
                <SelectTrigger className="font-montserrat">
                  <SelectValue placeholder="Área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area} className="font-montserrat">
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Secretaria Filter */}
              <Select value={selectedSecretaria} onValueChange={onSecretariaChange}>
                <SelectTrigger className="font-montserrat">
                  <SelectValue placeholder="Secretaria" />
                </SelectTrigger>
                <SelectContent>
                  {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria} value={secretaria} className="font-montserrat">
                      {secretaria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              {/* Freguesia Filter */}
              <Select value={selectedFreguesia} onValueChange={onFreguesiaChange}>
                <SelectTrigger className="font-montserrat">
                  <SelectValue placeholder="Freguesia" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="font-montserrat">Todas as Freguesias</SelectItem>
                  <SelectItem value="Machico" className="font-montserrat">Machico</SelectItem>
                  <SelectItem value="Porto da Cruz" className="font-montserrat">Porto da Cruz</SelectItem>
                  <SelectItem value="Caniçal" className="font-montserrat">Caniçal</SelectItem>
                  <SelectItem value="Santo António da Serra" className="font-montserrat">Santo António da Serra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
              <Button 
                variant="outline" 
                className="font-montserrat"
                onClick={() => {
                  onYearChange("all");
                  onConcelhoChange("Todos os Concelhos");
                  onFreguesiaChange("all");
                  onAreaChange("Todas as Áreas");
                  onSecretariaChange("Todas as Secretarias");
                  onSearchChange("");
                }}
              >
                Limpar Filtros
              </Button>
              
              <Button 
                onClick={onGeneratePDF} 
                className="bg-button-yellow text-black hover:bg-button-yellow/90 border-0 font-montserrat"
              >
                <FileDown className="h-4 w-4 mr-2" />
                Gerar PDF
              </Button>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}