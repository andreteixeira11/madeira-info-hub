import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Plus, X, ExternalLink, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface News {
  title: string;
  content: string;
  link?: string;
  date: string;
}

interface EditRecordModalProps {
  record: any;
  onSave: (updatedRecord: any) => void;
  onClose: () => void;
}

export function EditRecordModal({ record, onSave, onClose }: EditRecordModalProps) {
  const { toast } = useToast();
  const [news, setNews] = useState<News[]>(record.news || []);
  const [newNews, setNewNews] = useState<{title: string; content: string; link: string}>({
    title: '', 
    content: '', 
    link: ''
  });

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

  const handleSave = () => {
    onSave({ news });
    toast({
      title: "Registo atualizado",
      description: "As alterações foram guardadas com sucesso.",
    });
    onClose();
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Editar Registo: {record.title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
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
              onClick={onClose}
            >
              <X className="h-4 w-4 mr-2" />
              Cancelar
            </Button>
            <Button onClick={handleSave}>
              Guardar Alterações
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
