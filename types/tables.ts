export type TableStatus = 'LIBRE' | 'OCCUPEE' | 'EN_SERVICE';

export interface Table {
  id: string; // ex: "T1"
  name: string; // ex: "Table 1", "VIP"
  status: TableStatus;
  activeOrderId?: string; // ticket ouvert
}
