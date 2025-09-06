import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Save, X, Paperclip, Trash2, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

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

interface NewRecordData {
  title: string;
  description: string;
  area: string;
  concelho: string;
  freguesia: string;
  secretaria: string;
  assessor: string;
  attachments: Attachment[];
  news: News[];
  value?: string;
  conclusionDate?: string;
}

interface NewRecordModalProps {
  onAddRecord: (record: NewRecordData) => void;
}

const concelhos = [
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
  "Secretaria Regional da Agricultura e Pescas",
  "Secretaria Regional das Infraestruturas",
  "Secretaria Regional da Saúde e Proteção Civil", 
  "Secretaria Regional da Economia",
  "Secretaria Regional das Finanças",
  "Secretaria Regional do Turismo",
  "Secretaria Regional da Cultura",
  "Secretaria Regional do Ambiente"
];

export function NewRecordModal({ onAddRecord }: NewRecordModalProps) {
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState<NewRecordData>({
    title: "",
    description: "",
    area: "",
    concelho: "",
    freguesia: "",
    secretaria: "",
    assessor: "",
    attachments: [],
    news: [],
    value: "",
    conclusionDate: ""
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [newAttachment, setNewAttachment] = useState<{name: string; url: string; type: 'file' | 'link'}>({name: '', url: '', type: 'file'});
  const [newNews, setNewNews] = useState<{title: string; content: string; link: string}>({title: '', content: '', link: ''});

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Título é obrigatório";
    }
    if (!formData.description.trim()) {
      newErrors.description = "Descrição é obrigatória";
    }
    if (!formData.area) {
      newErrors.area = "Área é obrigatória";
    }
    if (!formData.concelho) {
      newErrors.concelho = "Concelho é obrigatório";
    }
    if (!formData.freguesia.trim()) {
      newErrors.freguesia = "Freguesia é obrigatória";
    }
    if (!formData.secretaria) {
      newErrors.secretaria = "Secretaria é obrigatória";
    }
    if (!formData.assessor.trim()) {
      newErrors.assessor = "Nome do assessor é obrigatório";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast({
        title: "Erro na validação",
        description: "Por favor, preencha todos os campos obrigatórios.",
        variant: "destructive"
      });
      return;
    }

    onAddRecord(formData);
    
    // Reset form
    setFormData({
      title: "",
      description: "",
      area: "",
      concelho: "",
      freguesia: "",
      secretaria: "",
      assessor: "",
      attachments: [],
      news: [],
      value: "",
      conclusionDate: ""
    });
    
    setErrors({});
    setOpen(false);
    
    toast({
      title: "Registo criado com sucesso!",
      description: "A nova informação foi adicionada ao sistema.",
    });
  };

  const handleReset = () => {
    setFormData({
      title: "",
      description: "",
      area: "",
      concelho: "",
      freguesia: "",
      secretaria: "",
      assessor: "",
      attachments: [],
      news: [],
      value: "",
      conclusionDate: ""
    });
    setErrors({});
    setNewAttachment({name: '', url: '', type: 'file'});
    setNewNews({title: '', content: '', link: ''});
  };

  const addAttachment = () => {
    if (newAttachment.name && newAttachment.url) {
      setFormData(prev => ({
        ...prev,
        attachments: [...prev.attachments, newAttachment]
      }));
      setNewAttachment({name: '', url: '', type: 'file'});
    }
  };

  const removeAttachment = (index: number) => {
    setFormData(prev => ({
      ...prev,
      attachments: prev.attachments.filter((_, i) => i !== index)
    }));
  };

  const addNews = () => {
    if (newNews.title && newNews.content) {
      setFormData(prev => ({
        ...prev,
        news: [...prev.news, { ...newNews, date: new Date().toISOString().split('T')[0] }]
      }));
      setNewNews({title: '', content: '', link: ''});
    }
  };

  const removeNews = (index: number) => {
    setFormData(prev => ({
      ...prev,
      news: prev.news.filter((_, i) => i !== index)
    }));
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-white text-primary hover:bg-blue-50">
          <Plus className="h-4 w-4 mr-2" />
          Novo Registo
        </Button>
      </DialogTrigger>
      
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Criar Novo Registo</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <Label htmlFor="title">
              Título <span className="text-red-500">*</span>
            </Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
              placeholder="Ex: Construção de nova estrada em..."
              className={errors.title ? "border-red-500" : ""}
            />
            {errors.title && <p className="text-sm text-red-500">{errors.title}</p>}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">
              Descrição <span className="text-red-500">*</span>
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              placeholder="Descreva detalhadamente a informação..."
              rows={4}
              className={errors.description ? "border-red-500" : ""}
            />
            {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
          </div>

          {/* Area and Secretaria */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Área <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.area} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, area: value }))}
              >
                <SelectTrigger className={errors.area ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione a área" />
                </SelectTrigger>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area} value={area}>
                      {area}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.area && <p className="text-sm text-red-500">{errors.area}</p>}
            </div>

            <div className="space-y-2">
              <Label>
                Secretaria <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.secretaria} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, secretaria: value }))}
              >
                <SelectTrigger className={errors.secretaria ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione a secretaria" />
                </SelectTrigger>
                <SelectContent>
                  {secretarias.map((secretaria) => (
                    <SelectItem key={secretaria} value={secretaria}>
                      {secretaria}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.secretaria && <p className="text-sm text-red-500">{errors.secretaria}</p>}
            </div>
          </div>

          {/* Location */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>
                Concelho <span className="text-red-500">*</span>
              </Label>
              <Select 
                value={formData.concelho} 
                onValueChange={(value) => setFormData(prev => ({ ...prev, concelho: value }))}
              >
                <SelectTrigger className={errors.concelho ? "border-red-500" : ""}>
                  <SelectValue placeholder="Selecione o concelho" />
                </SelectTrigger>
                <SelectContent>
                  {concelhos.map((concelho) => (
                    <SelectItem key={concelho} value={concelho}>
                      {concelho}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              {errors.concelho && <p className="text-sm text-red-500">{errors.concelho}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="freguesia">
                Freguesia <span className="text-red-500">*</span>
              </Label>
              <Input
                id="freguesia"
                value={formData.freguesia}
                onChange={(e) => setFormData(prev => ({ ...prev, freguesia: e.target.value }))}
                placeholder="Ex: São Pedro"
                className={errors.freguesia ? "border-red-500" : ""}
              />
              {errors.freguesia && <p className="text-sm text-red-500">{errors.freguesia}</p>}
            </div>
          </div>

          {/* Assessor */}
          <div className="space-y-2">
            <Label htmlFor="assessor">
              Nome do Assessor <span className="text-red-500">*</span>
            </Label>
            <Input
              id="assessor"
              value={formData.assessor}
              onChange={(e) => setFormData(prev => ({ ...prev, assessor: e.target.value }))}
              placeholder="Seu nome completo"
              className={errors.assessor ? "border-red-500" : ""}
            />
            {errors.assessor && <p className="text-sm text-red-500">{errors.assessor}</p>}
          </div>

          {/* Additional Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="value">Valor da Obra</Label>
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

          {/* Attachments */}
          <div className="space-y-4">
            <Label>Anexos</Label>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
              <Input
                placeholder="Nome do anexo"
                value={newAttachment.name}
                onChange={(e) => setNewAttachment(prev => ({ ...prev, name: e.target.value }))}
              />
              <Input
                placeholder="URL/Link do anexo"
                value={newAttachment.url}
                onChange={(e) => setNewAttachment(prev => ({ ...prev, url: e.target.value }))}
              />
              <Select
                value={newAttachment.type}
                onValueChange={(value: 'file' | 'link') => setNewAttachment(prev => ({ ...prev, type: value }))}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="file">Ficheiro</SelectItem>
                  <SelectItem value="link">Link</SelectItem>
                </SelectContent>
              </Select>
              <Button type="button" onClick={addAttachment} size="sm">
                <Plus className="h-4 w-4 mr-1" />
                Adicionar
              </Button>
            </div>
            {formData.attachments.length > 0 && (
              <div className="space-y-2">
                {formData.attachments.map((attachment, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-muted rounded">
                    <div className="flex items-center gap-2">
                      {attachment.type === 'file' ? <Paperclip className="h-4 w-4" /> : <ExternalLink className="h-4 w-4" />}
                      <span className="text-sm">{attachment.name}</span>
                    </div>
                    <Button type="button" variant="ghost" size="sm" onClick={() => removeAttachment(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* News */}
          <div className="space-y-4">
            <Label>Notícias Relacionadas</Label>
            <div className="space-y-2">
              <Input
                placeholder="Título da notícia"
                value={newNews.title}
                onChange={(e) => setNewNews(prev => ({ ...prev, title: e.target.value }))}
              />
              <Textarea
                placeholder="Conteúdo da notícia"
                value={newNews.content}
                onChange={(e) => setNewNews(prev => ({ ...prev, content: e.target.value }))}
                rows={2}
              />
              <div className="flex gap-2">
                <Input
                  placeholder="Link da notícia (opcional)"
                  value={newNews.link}
                  onChange={(e) => setNewNews(prev => ({ ...prev, link: e.target.value }))}
                  className="flex-1"
                />
                <Button type="button" onClick={addNews} size="sm">
                  <Plus className="h-4 w-4 mr-1" />
                  Adicionar
                </Button>
              </div>
            </div>
            {formData.news.length > 0 && (
              <div className="space-y-2">
                {formData.news.map((news, index) => (
                  <div key={index} className="p-3 bg-muted rounded space-y-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm">{news.title}</h4>
                      <Button type="button" variant="ghost" size="sm" onClick={() => removeNews(index)}>
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-muted-foreground">{news.content}</p>
                    {news.link && (
                      <a href={news.link} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
                        <ExternalLink className="h-3 w-3" />
                        Ver notícia
                      </a>
                    )}
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
              onClick={handleReset}
            >
              <X className="h-4 w-4 mr-2" />
              Limpar
            </Button>
            <Button type="submit">
              <Save className="h-4 w-4 mr-2" />
              Salvar Registo
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}