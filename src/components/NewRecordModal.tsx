import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, X, ExternalLink, Trash2, Upload, Link } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { ConfirmDialog } from "@/components/ConfirmDialog";

interface News {
  title: string;
  content: string;
  link?: string;
  date: string;
}

interface NewRecordModalProps {
  onAddRecord: (record: any) => void;
}

export function NewRecordModal({ onAddRecord }: NewRecordModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    area: "",
    concelho: "",
    freguesia: "",
    assessor: "",
    secretaria: "",
    value: "",
    conclusionDate: ""
  });
  const [news, setNews] = useState<News[]>([]);
  const [newNews, setNewNews] = useState<{title: string; content: string; link: string}>({
    title: '', 
    content: '', 
    link: ''
  });
  const [attachments, setAttachments] = useState<File[]>([]);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [pendingAction, setPendingAction] = useState<'close' | 'clear' | null>(null);

  const resetForm = () => {
    setFormData({
      title: "",
      description: "",
      area: "",
      concelho: "",
      freguesia: "",
      assessor: "",
      secretaria: "",
      value: "",
      conclusionDate: ""
    });
    setNews([]);
    setNewNews({title: '', content: '', link: ''});
    setAttachments([]);
  };

  const handleConfirmAction = () => {
    if (pendingAction === 'close') {
      setOpen(false);
      resetForm();
    } else if (pendingAction === 'clear') {
      resetForm();
    }
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const handleCancelAction = () => {
    setShowConfirmDialog(false);
    setPendingAction(null);
  };

  const checkForChanges = () => {
    const hasFormData = Object.values(formData).some(value => value.trim() !== '');
    const hasNews = news.length > 0;
    const hasAttachments = attachments.length > 0;
    return hasFormData || hasNews || hasAttachments;
  };

  const handleClose = () => {
    if (checkForChanges()) {
      setPendingAction('close');
      setShowConfirmDialog(true);
    } else {
      setOpen(false);
    }
  };

  const handleClear = () => {
    if (checkForChanges()) {
      setPendingAction('clear');
      setShowConfirmDialog(true);
    } else {
      resetForm();
    }
  };

  const addNews = () => {
    if (newNews.title && newNews.content) {
      setNews(prev => [...prev, { 
        ...newNews, 
        date: new Date().toISOString().split('T')[0] 
      }]);
      setNewNews({title: '', content: '', link: ''});
    }
  };

  const removeNews = (index: number) => {
    setNews(prev => prev.filter((_, i) => i !== index));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachments(prev => [...prev, ...Array.from(files)]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.area || 
        !formData.concelho || !formData.freguesia || !formData.assessor || 
        !formData.secretaria) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive",
      });
      return;
    }

    onAddRecord({ ...formData, news, attachments });
    toast({
      title: "Registo criado",
      description: "O novo registo foi adicionado com sucesso.",
    });
    setOpen(false);
    resetForm();
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleClose}>
        <DialogTrigger asChild>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Novo Registo
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Criar Novo Registo</DialogTitle>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Título *</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Ex: Construção de nova estrada..."
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição *</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  placeholder="Descreva detalhadamente o projeto..."
                  rows={4}
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Área *</Label>
                  <Select value={formData.area} onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a área" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label>Secretaria *</Label>
                  <Select value={formData.secretaria} onValueChange={(value) => setFormData(prev => ({ ...prev, secretaria: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione a secretaria" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Agricultura e Pescas">Agricultura e Pescas</SelectItem>
                      <SelectItem value="Infraestruturas">Infraestruturas</SelectItem>
                      <SelectItem value="Saude e Protecao Civil">Saúde e Proteção Civil</SelectItem>
                      <SelectItem value="Economia">Economia</SelectItem>
                      <SelectItem value="Finanças">Finanças</SelectItem>
                      <SelectItem value="Turismo Cultura e Ambiente">Turismo Cultura e Ambiente</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Concelho *</Label>
                  <Select value={formData.concelho} onValueChange={(value) => setFormData(prev => ({ ...prev, concelho: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o concelho" />
                    </SelectTrigger>
                    <SelectContent>
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
                  <Label htmlFor="freguesia">Freguesia *</Label>
                  <Input
                    id="freguesia"
                    value={formData.freguesia}
                    onChange={(e) => setFormData(prev => ({ ...prev, freguesia: e.target.value }))}
                    placeholder="Ex: São Pedro"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="assessor">Assessor *</Label>
                <Input
                  id="assessor"
                  value={formData.assessor}
                  onChange={(e) => setFormData(prev => ({ ...prev, assessor: e.target.value }))}
                  placeholder="Nome do responsável"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="value">Valor</Label>
                  <Input
                    id="value"
                    value={formData.value}
                    onChange={(e) => setFormData(prev => ({ ...prev, value: e.target.value }))}
                    placeholder="Ex: 1.500.000 euros"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="conclusionDate">Data de Conclusão</Label>
                  <Input
                    id="conclusionDate"
                    type="date"
                    value={formData.conclusionDate}
                    onChange={(e) => setFormData(prev => ({ ...prev, conclusionDate: e.target.value }))}
                  />
                </div>
              </div>
            </div>

            {/* Attachments Section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Anexos</Label>
              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <div className="flex gap-2">
                  <Input
                    type="file"
                    multiple
                    onChange={handleFileUpload}
                    className="flex-1"
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.txt"
                  />
                  <Button type="button" size="sm" onClick={() => (document.querySelector('input[type="file"]') as HTMLInputElement)?.click()}>
                    <Upload className="h-4 w-4 mr-1" />
                    Upload
                  </Button>
                </div>
                
                {/* Display uploaded files */}
                {attachments.length > 0 && (
                  <div className="space-y-2">
                    <Label className="text-sm font-medium">Ficheiros anexados:</Label>
                    {attachments.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-background rounded border">
                        <span className="text-sm truncate">{file.name}</span>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeAttachment(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* News Section */}
            <div className="space-y-4">
              <Label className="text-base font-medium">Notícias Relacionadas</Label>
              
              {/* Add new news */}
              <div className="space-y-3 p-4 border rounded-lg bg-muted/30">
                <Input
                  placeholder="Título da notícia"
                  value={newNews.title}
                  onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
                />
                <Textarea
                  placeholder="Conteúdo da notícia"
                  value={newNews.content}
                  onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))}
                  rows={3}
                />
                <div className="flex gap-2">
                  <Input
                    placeholder="Link da notícia (opcional)"
                    value={newNews.link}
                    onChange={(e) => setNewNews(prev => ({ ...prev, link: e.target.value }))}
                    className="flex-1"
                  />
                  <Button 
                    type="button" 
                    onClick={addNews} 
                    size="sm"
                    disabled={!newNews.title || !newNews.content}
                  >
                    <Plus className="h-4 w-4 mr-1" />
                    Adicionar
                  </Button>
                </div>
              </div>

              {/* Existing news */}
              {news.length > 0 && (
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Notícias existentes:</Label>
                  {news.map((newsItem, index) => (
                    <div key={index} className="p-3 border rounded-lg space-y-2">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <h4 className="font-medium text-sm">{newsItem.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{newsItem.content}</p>
                          {newsItem.link && (
                            <a 
                              href={newsItem.link} 
                              target="_blank" 
                              rel="noopener noreferrer" 
                              className="text-xs text-primary hover:underline flex items-center gap-1 mt-2"
                            >
                              <ExternalLink className="h-3 w-3" />
                              Ver notícia
                            </a>
                          )}
                          <div className="text-xs text-muted-foreground mt-2">
                            {new Date(newsItem.date).toLocaleDateString('pt-PT')}
                          </div>
                        </div>
                        <Button 
                          type="button" 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeNews(index)}
                          className="ml-2"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleClear}
              >
                <X className="h-4 w-4 mr-2" />
                Limpar
              </Button>
              <Button type="submit">
                Criar Registo
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        title="Confirmar Ação"
        description={
          pendingAction === 'close' 
            ? "Tem a certeza que pretende sair? Todas as alterações não guardadas serão perdidas."
            : "Tem a certeza que pretende limpar todos os campos? Todas as informações inseridas serão perdidas."
        }
        onConfirm={handleConfirmAction}
        onCancel={handleCancelAction}
        confirmText={pendingAction === 'close' ? "Sair" : "Limpar"}
        cancelText="Cancelar"
      />
    </>
  );
}
