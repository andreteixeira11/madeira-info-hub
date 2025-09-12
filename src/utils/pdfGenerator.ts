import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

interface News {
  title: string;
  content: string;
  link?: string;
  date: string;
}

interface InformationRecord {
  id: string;
  title: string;
  description: string;
  area: string;
  concelho: string;
  freguesia: string;
  assessor: string;
  secretaria: string;
  createdAt: string;
  updatedAt: string;
  status: "ativo" | "arquivado" | "em_revisao";
  value?: string;
  conclusionDate?: string;
  news?: News[];
}

interface Filters {
  year: string;
  concelho: string;
  freguesia: string;
  area: string;
  secretaria: string;
  search: string;
}

declare module 'jspdf' {
  interface jsPDF {
    autoTable: (options: any) => jsPDF;
  }
}

export function generatePDF(records: InformationRecord[], filters: Filters) {
  const doc = new jsPDF();
  
  // Header
  doc.setFontSize(18);
  doc.setFont('helvetica', 'bold');
  doc.text('Sistema de Informação Governamental', 20, 20);
  
  doc.setFontSize(14);
  doc.setFont('helvetica', 'normal');
  doc.text('Governo Regional da Madeira', 20, 30);
  
  // Filters applied
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('Filtros Aplicados:', 20, 45);
  
  doc.setFont('helvetica', 'normal');
  let yPos = 52;
  
  if (filters.year !== 'all') {
    doc.text(`Ano: ${filters.year}`, 20, yPos);
    yPos += 7;
  }
  
  if (filters.concelho !== 'Todos os Concelhos') {
    doc.text(`Concelho: ${filters.concelho}`, 20, yPos);
    yPos += 7;
  }
  
  if (filters.freguesia !== 'all') {
    doc.text(`Freguesia: ${filters.freguesia}`, 20, yPos);
    yPos += 7;
  }
  
  if (filters.area !== 'Todas as Áreas') {
    doc.text(`Área: ${filters.area}`, 20, yPos);
    yPos += 7;
  }
  
  if (filters.secretaria !== 'Todas as Secretarias') {
    doc.text(`Secretaria: ${filters.secretaria}`, 20, yPos);
    yPos += 7;
  }
  
  if (filters.search) {
    doc.text(`Pesquisa: "${filters.search}"`, 20, yPos);
    yPos += 7;
  }
  
  yPos += 10;
  
  // Results summary
  doc.setFont('helvetica', 'bold');
  doc.text(`Total de registos: ${records.length}`, 20, yPos);
  doc.text(`Data de geração: ${new Date().toLocaleDateString('pt-PT')}`, 20, yPos + 7);
  
  // Detailed records
  yPos += 25;
  
  records.forEach((record, index) => {
    // Check if we need a new page
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }
    
    // Record title
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text(`${index + 1}. ${record.title}`, 20, yPos);
    yPos += 10;
    
    // Description
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    const descriptionLines = doc.splitTextToSize(record.description, 170);
    doc.text(descriptionLines, 20, yPos);
    yPos += descriptionLines.length * 5 + 5;
    
    // Details
    doc.setFont('helvetica', 'bold');
    doc.text('Detalhes:', 20, yPos);
    yPos += 7;
    
    doc.setFont('helvetica', 'normal');
    doc.text(`• Área: ${record.area}`, 25, yPos);
    yPos += 5;
    doc.text(`• Localização: ${record.concelho} - ${record.freguesia}`, 25, yPos);
    yPos += 5;
    doc.text(`• Adicionado por: ${record.assessor}`, 25, yPos);
    yPos += 5;
    doc.text(`• Valor: ${record.value ? record.value.replace(/euros?/gi, '€') : 'N/A'}`, 25, yPos);
    yPos += 5;
    doc.text(`• Data de conclusão: ${record.conclusionDate ? new Date(record.conclusionDate).toLocaleDateString('pt-PT') : 'N/A'}`, 25, yPos);
    yPos += 10;
    
    // News section
    if (record.news && record.news.length > 0) {
      doc.setFont('helvetica', 'bold');
      doc.text('O que se disse:', 20, yPos);
      yPos += 7;
      
      record.news.forEach((newsItem) => {
        doc.setFont('helvetica', 'bold');
        doc.text(`• ${newsItem.title}`, 25, yPos);
        yPos += 5;
        
        doc.setFont('helvetica', 'normal');
        const contentLines = doc.splitTextToSize(newsItem.content, 165);
        doc.text(contentLines, 27, yPos);
        yPos += contentLines.length * 5;
        
        if (newsItem.link) {
          doc.setFont('helvetica', 'italic');
          doc.text(`Link: ${newsItem.link}`, 27, yPos);
          yPos += 5;
        }
        
        doc.text(`Data: ${new Date(newsItem.date).toLocaleDateString('pt-PT')}`, 27, yPos);
        yPos += 8;
      });
    }
    
    yPos += 10;
  });
  
  // Save the PDF
  const filename = `relatorio-detalhado-sig-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}