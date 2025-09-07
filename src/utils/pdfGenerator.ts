import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

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
  
  // Table data
  const tableData = records.map(record => [
    record.title,
    record.area,
    `${record.concelho} - ${record.freguesia}`,
    record.assessor,
    record.value || 'N/A',
    record.conclusionDate ? new Date(record.conclusionDate).toLocaleDateString('pt-PT') : 'N/A',
    record.status === 'ativo' ? 'Ativo' : 
    record.status === 'em_revisao' ? 'Em Revisão' : 'Arquivado'
  ]);
  
  // Create table
  autoTable(doc, {
    head: [['Projeto', 'Área', 'Localização', 'Assessor', 'Valor', 'Conclusão', 'Estado']],
    body: tableData,
    startY: yPos + 20,
    styles: {
      fontSize: 8,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [41, 128, 185],
      textColor: 255,
      fontSize: 9,
      fontStyle: 'bold'
    },
    alternateRowStyles: {
      fillColor: [245, 245, 245]
    },
    columnStyles: {
      0: { cellWidth: 40 },
      1: { cellWidth: 25 },
      2: { cellWidth: 35 },
      3: { cellWidth: 30 },
      4: { cellWidth: 25 },
      5: { cellWidth: 20 },
      6: { cellWidth: 15 }
    },
    margin: { left: 10, right: 10 }
  });
  
  // Save the PDF
  const filename = `relatorio-sig-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}