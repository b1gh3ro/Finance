import { useState } from 'react';
import { format } from 'date-fns';
import { Plus, Search, Trash2 } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CURRENT_USER } from '../data/mockData';
import type { Transaction } from '../data/mockData';
import styles from './TransactionsTable.module.css';

export function TransactionsTable() {
  const { deleteTransaction, addTransaction, searchQuery, setSearchQuery } = useStore();
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);
  
  const isAdmin = role === 'Admin';
  
  const [isAdding, setIsAdding] = useState(false);
  const [newTx, setNewTx] = useState<Partial<Transaction>>({
    type: 'Expense',
    category: '',
    description: '',
    amount: 0,
    date: format(new Date(), 'yyyy-MM-dd')
  });

  const visibleTransactions = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  const filteredTransactions = visibleTransactions.filter(t => 
    t.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    t.userName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTx.description || !newTx.amount || !newTx.category) return;
    
    addTransaction({
      ...newTx,
      id: `tx-${Math.random().toString(36).substr(2, 9)}`,
      userName: isAdmin ? 'Added by Admin' : CURRENT_USER,
    } as Transaction);
    
    setIsAdding(false);
    setNewTx({ ...newTx, description: '', amount: 0, category: '' });
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h3 className={styles.title}>
          {isAdmin ? 'Global Company Transactions' : 'Your Personal Spends'}
        </h3>
        
        <div className={styles.actions}>
          <div className={styles.searchBox}>
            <Search size={16} className={styles.searchIcon} />
            <input 
              type="text" 
              placeholder="Search..." 
              className={styles.searchInput}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <button className={styles.addButton} onClick={() => setIsAdding(!isAdding)}>
            <Plus size={16} />
            <span>New</span>
          </button>
        </div>
      </div>

      {isAdding && (
        <form className={styles.addForm} onSubmit={handleAdd} style={ {gridTemplateColumns: isAdmin ? '1fr 2fr 1fr 1fr 1fr 1fr auto' : undefined} }>
          <input type="date" value={newTx.date} onChange={e => setNewTx({...newTx, date: e.target.value})} className={styles.input} required />
          <input type="text" placeholder="Description" value={newTx.description} onChange={e => setNewTx({...newTx, description: e.target.value})} className={styles.input} required />
          <input type="text" placeholder="Category" value={newTx.category} onChange={e => setNewTx({...newTx, category: e.target.value})} className={styles.input} required />
          <select value={newTx.type} onChange={e => setNewTx({...newTx, type: e.target.value as 'Income' | 'Expense'})} className={styles.input}>
            <option value="Income">Income</option>
            <option value="Expense">Expense</option>
          </select>
          <input type="number" placeholder="Amount" value={newTx.amount || ''} onChange={e => setNewTx({...newTx, amount: parseFloat(e.target.value)})} className={styles.input} required />
          <button type="submit" className={styles.saveButton}>Save</button>
        </form>
      )}

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Description</th>
              {isAdmin && <th>Employee</th>}
              <th>Category</th>
              <th>Type</th>
              <th className={styles.alignRight}>Amount</th>
              {isAdmin && <th className={styles.alignRight}>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.length > 0 ? (
              filteredTransactions.map((tx) => (
                <tr key={tx.id}>
                  <td className={styles.dateCell}>{format(new Date(tx.date), 'MMM dd, yyyy')}</td>
                  <td className={styles.descCell}>{tx.description}</td>
                  {isAdmin && (
                    <td>
                      <span className={styles.categoryBadge} style={{backgroundColor: 'var(--accent-light)', color: 'var(--accent-primary)'}}>
                        {tx.userName}
                      </span>
                    </td>
                  )}
                  <td>
                    <span className={styles.categoryBadge}>{tx.category}</span>
                  </td>
                  <td>
                    <span className={`${styles.typeBadge} ${tx.type === 'Income' ? styles.bgSuccess : styles.bgDanger}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td className={`${styles.alignRight} ${styles.amountCell}`}>
                    {tx.type === 'Income' ? '+' : '-'}${tx.amount.toLocaleString(undefined, {minimumFractionDigits: 2})}
                  </td>
                  {isAdmin && (
                    <td className={styles.alignRight}>
                      <button className={styles.deleteBtn} onClick={() => deleteTransaction(tx.id)} title="Delete">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={isAdmin ? 7 : 5} className={styles.emptyState}>
                  No transactions found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
