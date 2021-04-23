export interface Bill {
  id: string;
  title: string;
  description: string;
  amount: number;
  date: Date;
  paid: boolean;
  type: BillType;
}

export enum BillType {
  UNCATEGORIZED = 'UNCATEGORIZED',
  ENTERTAINMENT = 'ENTERTAINMENT',
  FOOD_AND_DRINK = 'FOOD_AND_DRINK',
  HOME = 'HOME',
  LIFE = 'LIFE',
  TRANSPORTATION = 'TRANSPORTATION',
  UTILITIES = 'UTILITIES',
}
