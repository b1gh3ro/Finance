export type TransactionType = 'Income' | 'Expense';

export interface Transaction {
  id: string;
  userName: string;
  date: string;
  description: string;
  category: string;
  type: TransactionType;
  amount: number;
}

export const CURRENT_USER = 'John Doe';

export const initialTransactions: Transaction[] = [
  // John's Data (Viewer sees only this)
  { id: 'tx-001', userName: 'John Doe', date: '2023-10-24', description: 'Stripe Payout', category: 'Revenue', type: 'Income', amount: 450.00 },
  { id: 'tx-002', userName: 'John Doe', date: '2023-10-23', description: 'AWS Services', category: 'Cloud Infrastructure', type: 'Expense', amount: 120.50 },
  { id: 'tx-003', userName: 'John Doe', date: '2023-09-15', description: 'Figma Subscription', category: 'Software Subscriptions', type: 'Expense', amount: 45.00 },
  { id: 'tx-004', userName: 'John Doe', date: '2023-08-10', description: 'Client Retainer', category: 'Revenue', type: 'Income', amount: 800.00 },
  { id: 'tx-005', userName: 'John Doe', date: '2023-08-05', description: 'Office Supplies', category: 'Supplies', type: 'Expense', amount: 35.00 },

  // Sarah's Data (Admin sees everything)
  { id: 'tx-006', userName: 'Sarah Smith', date: '2023-10-21', description: 'WeWork Office Rent', category: 'Real Estate', type: 'Expense', amount: 2100.00 },
  { id: 'tx-007', userName: 'Sarah Smith', date: '2023-10-18', description: 'Enterprise Retainer', category: 'Revenue', type: 'Income', amount: 15800.00 },
  { id: 'tx-008', userName: 'Sarah Smith', date: '2023-09-02', description: 'Travel & Dining', category: 'Travel', type: 'Expense', amount: 640.00 },
  { id: 'tx-009', userName: 'Sarah Smith', date: '2023-07-20', description: 'Legal Counsel', category: 'Legal', type: 'Expense', amount: 1500.00 },

  // Mike's Data
  { id: 'tx-010', userName: 'Mike Ross', date: '2023-09-12', description: 'Sales Bonus', category: 'Revenue', type: 'Income', amount: 3200.00 },
  { id: 'tx-011', userName: 'Mike Ross', date: '2023-08-25', description: 'Client Lunch', category: 'Travel', type: 'Expense', amount: 180.00 },
  { id: 'tx-012', userName: 'Mike Ross', date: '2023-07-15', description: 'Salesforce License', category: 'Software Subscriptions', type: 'Expense', amount: 450.00 },
];
