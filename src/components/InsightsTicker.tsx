import { Lightbulb, Users } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CURRENT_USER } from '../data/mockData';
import styles from './InsightsTicker.module.css';

export function InsightsTicker() {
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);

  const visibleTx = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  // Find max category dynamically!
  const categoryMap = visibleTx
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const topCategoryStr = Object.keys(categoryMap).length > 0 
    ? Object.keys(categoryMap).reduce((a, b) => categoryMap[a] > categoryMap[b] ? a : b)
    : 'None';

  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        {role === 'Admin' ? (
          <Users size={16} className={styles.icon} />
        ) : (
          <Lightbulb size={16} className={styles.icon} />
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.label}>{role === 'Admin' ? 'Global Insight' : 'Personal Insight'}</span>
        <p className={styles.text}>
          {role === 'Admin' 
            ? <>Company-wide top spending category is currently <strong>{topCategoryStr}</strong>.</> 
            : <>Your highest personal spending category is <strong>{topCategoryStr}</strong>.</>
          }
        </p>
      </div>
    </div>
  );
}
