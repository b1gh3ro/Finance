import { TrendingUp, TrendingDown, DollarSign, Wallet, CreditCard } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CURRENT_USER } from '../data/mockData';
import styles from './SummaryCards.module.css';

export function SummaryCards() {
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);

  const visibleTx = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  // Dynamic calculations based strictly on what the store says this user can see.
  const totalIncome = visibleTx.filter(t => t.type === 'Income').reduce((acc, t) => acc + t.amount, 0);
  const totalExpenses = visibleTx.filter(t => t.type === 'Expense').reduce((acc, t) => acc + t.amount, 0);
  const totalBalance = totalIncome - totalExpenses; 

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  const metrics = [
    {
      title: 'Calculated Balance',
      amount: formatter.format(totalBalance),
      trend: totalBalance >= 0 ? 'Positive' : 'Deficit',
      trendUp: totalBalance >= 0,
      icon: <Wallet size={20} className={styles.icon} />
    },
    {
      title: 'Total Income',
      amount: formatter.format(totalIncome),
      trend: 'Aggregated',
      trendUp: true,
      icon: <DollarSign size={20} className={styles.icon} />
    },
    {
      title: 'Total Expenses',
      amount: formatter.format(totalExpenses),
      trend: 'Aggregated',
      trendUp: false,
      icon: <CreditCard size={20} className={styles.icon} />
    }
  ];

  return (
    <div className={styles.cardsRow}>
      {metrics.map((metric, idx) => (
        <div key={idx} className={styles.card}>
          <div className={styles.cardHeader}>
            <span className={styles.cardTitle}>{metric.title}</span>
            <div className={styles.iconWrapper}>{metric.icon}</div>
          </div>
          <div className={styles.cardBody}>
            <span className={styles.amount}>
              {metric.amount}
            </span>
            
            <div className={`${styles.trend} ${metric.trendUp ? styles.trendUp : styles.trendDown}`}>
              {metric.trendUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
              <span>{metric.trend}</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
