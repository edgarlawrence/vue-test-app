// utils/excelUtils.js
import XLSX from 'xlsx';
import { saveAs } from 'file-saver';

export const exportToExcel = (jsonData, fileName) => {
  const worksheet = XLSX.utils.json_to_sheet(jsonData);
  const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
  const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
  saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), fileName + '.xlsx');
};
