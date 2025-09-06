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
      <Accordion type="single" collapsible>
        <AccordionItem value="filters" className="border-none">
          <AccordionTrigger className="px-6 py-4 hover:no-underline">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <h2 className="text-lg font-semibold text-foreground">Filtros de Pesquisa</h2>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-6 pb-6">
            {/* Search */}
            <div className="mb-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Pesquisar informações..."
                  value={searchTerm}
                  onChange={(e) => onSearchChange(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
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

              {/* Secretaria Filter */}
              <Select value={selectedSecretaria} onValueChange={onSecretariaChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Secretaria" />
                </SelectTrigger>
                <SelectContent>
                  {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria} value={secretaria}>
                      {secretaria}
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
                  <SelectItem value="Machico">Machico</SelectItem>
                  <SelectItem value="Porto da Cruz">Porto da Cruz</SelectItem>
                  <SelectItem value="Caniçal">Caniçal</SelectItem>
                  <SelectItem value="Santo António da Serra">Santo António da Serra</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex justify-between items-center">
              <Button 
                variant="outline" 
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
              
              <Button onClick={onGeneratePDF} className="bg-government-primary hover:bg-government-primary/90">
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