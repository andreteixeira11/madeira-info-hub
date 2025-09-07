import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download, X } from "lucide-react";
import { generatePDF } from "@/utils/pdfGenerator";
import { useToast } from "@/hooks/use-toast";

interface PDFGenerationModalProps {
  records: any[];
  onClose: () => void;
}

export function PDFGenerationModal({ records, onClose }: PDFGenerationModalProps) {
  const { toast } = useToast();
  const [filters, setFilters] = useState({
    year: "all",
    concelho: "Todos os Concelhos",
    freguesia: "all",
    area: "Todas as Áreas",
    secretaria: "Todas as Secretarias",
    search: ""
  });

  const handleGeneratePDF = () => {
    generatePDF(records, filters);
    
    toast({
      title: "PDF Gerado",
      description: "O relatório foi gerado e está a ser descarregado.",
    });
    
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Download className="h-5 w-5" />
            Gerar Relatório PDF
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="space-y-2">
            <Label>Ano</Label>
            <Select value={filters.year} onValueChange={(value) => setFilters(prev => ({ ...prev, year: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os Anos</SelectItem>
                <SelectItem value="2024">2024</SelectItem>
                <SelectItem value="2023">2023</SelectItem>
                <SelectItem value="2022">2022</SelectItem>
                <SelectItem value="2021">2021</SelectItem>
                <SelectItem value="2020">2020</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Concelho</Label>
            <Select value={filters.concelho} onValueChange={(value) => setFilters(prev => ({ ...prev, concelho: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todos os Concelhos">Todos os Concelhos</SelectItem>
                <SelectItem value="Machico">Machico</SelectItem>
                <SelectItem value="Santana">Santana</SelectItem>
                <SelectItem value="Funchal">Funchal</SelectItem>
                <SelectItem value="Câmara de Lobos">Câmara de Lobos</SelectItem>
                <SelectItem value="Ribeira Brava">Ribeira Brava</SelectItem>
                <SelectItem value="Ponta do Sol">Ponta do Sol</SelectItem>
                <SelectItem value="Calheta">Calheta</SelectItem>
                <SelectItem value="Porto Moniz">Porto Moniz</SelectItem>
                <SelectItem value="São Vicente">São Vicente</SelectItem>
                <SelectItem value="Santa Cruz">Santa Cruz</SelectItem>
                <SelectItem value="Porto Santo">Porto Santo</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Área</Label>
            <Select value={filters.area} onValueChange={(value) => setFilters(prev => ({ ...prev, area: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas as Áreas">Todas as Áreas</SelectItem>
                <SelectItem value="Estradas">Estradas</SelectItem>
                <SelectItem value="Habitação">Habitação</SelectItem>
                <SelectItem value="Educação">Educação</SelectItem>
                <SelectItem value="Saúde">Saúde</SelectItem>
                <SelectItem value="Obras Marítimas">Obras Marítimas</SelectItem>
                <SelectItem value="Água e Resíduos">Água e Resíduos</SelectItem>
                <SelectItem value="Florestas">Florestas</SelectItem>
                <SelectItem value="Energia">Energia</SelectItem>
                <SelectItem value="Social">Social</SelectItem>
                <SelectItem value="Agricultura">Agricultura</SelectItem>
                <SelectItem value="Mar">Mar</SelectItem>
                <SelectItem value="Cultura">Cultura</SelectItem>
                <SelectItem value="Segurança">Segurança</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Secretaria</Label>
            <Select value={filters.secretaria} onValueChange={(value) => setFilters(prev => ({ ...prev, secretaria: value }))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Todas as Secretarias">Todas as Secretarias</SelectItem>
                <SelectItem value="Agricultura e Pescas">Agricultura e Pescas</SelectItem>
                <SelectItem value="Infraestruturas">Infraestruturas</SelectItem>
                <SelectItem value="Saude e Protecao Civil">Saúde e Proteção Civil</SelectItem>
                <SelectItem value="Economia">Economia</SelectItem>
                <SelectItem value="Finanças">Finanças</SelectItem>
                <SelectItem value="Turismo Cultura e Ambiente">Turismo Cultura e Ambiente</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Pesquisa</Label>
            <Input
              placeholder="Pesquisar por título ou descrição..."
              value={filters.search}
              onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button variant="outline" onClick={onClose}>
            <X className="h-4 w-4 mr-2" />
            Cancelar
          </Button>
          <Button onClick={handleGeneratePDF}>
            <Download className="h-4 w-4 mr-2" />
            Gerar PDF
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}