import { AlertCircle, ArrowDownUp, TrendingDown, Target } from 'lucide-react';
import { useStore } from '../store/useStore';
import { CURRENT_USER } from '../data/mockData';
import pageStyles from '../App.module.css';
import styles from './InsightsPage.module.css';

export function InsightsPage() {
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);

  const visibleTx = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  // Computations
  const expenses = visibleTx.filter(t => t.type === 'Expense');
  const incomes = visibleTx.filter(t => t.type === 'Income');
  
  const totalExpenseAmount = expenses.reduce((a, b) => a + b.amount, 0);
  const totalIncomeAmount = incomes.reduce((a, b) => a + b.amount, 0);

  // 1. Largest Single Expense
  const largestExpense = expenses.length > 0 
    ? expenses.reduce((max, tx) => tx.amount > max.amount ? tx : max, expenses[0])
    : null;

  // 2. Average Transaction Size (Expenses)
  const avgExpense = expenses.length > 0 ? totalExpenseAmount / expenses.length : 0;

  // 3. Cash Flow Ratio
  const isPositiveFlow = totalIncomeAmount >= totalExpenseAmount;
  const ratio = totalExpenseAmount > 0 
    ? (totalIncomeAmount / totalExpenseAmount).toFixed(1) 
    : (totalIncomeAmount > 0 ? 'Infinite' : '0.0');

  const formatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

  return (
    <>
      <div className={pageStyles.header}>
        <div>
          <h1 className={pageStyles.pageTitle}>Machine Insights</h1>
          <p className={pageStyles.pageSubtitle}>Advanced calculations derived from ledger patterns.</p>
        </div>
      </div>
      
      <div className={styles.cardGrid}>
        
        <div className={styles.insightCard}>
          <div className={styles.insightHeader}>
            <AlertCircle size={20} className={styles.icon} />
            <span>Largest Single Expense</span>
          </div>
          <div className={styles.value}>
            {largestExpense ? formatter.format(largestExpense.amount) : '$0.00'}
          </div>
          <div className={styles.subtext}>
            {largestExpense ? (
              <>Originated from <span className={styles.highlight}>{largestExpense.category}</span> on {largestExpense.date}.</>
            ) : "No expenses recorded."}
          </div>
        </div>

        <div className={styles.insightCard}>
          <div className={styles.insightHeader}>
            <Target size={20} className={styles.icon} />
            <span>Average Expense Cost</span>
          </div>
          <div className={styles.value}>
            {formatter.format(avgExpense)}
          </div>
          <div className={styles.subtext}>
            Calculated across {expenses.length} total outgoing transactions.
          </div>
        </div>

        <div className={styles.insightCard}>
          <div className={styles.insightHeader}>
            <ArrowDownUp size={20} className={styles.icon} />
            <span>Cash Flow Ratio</span>
          </div>
          <div className={styles.value}>
            {ratio}x
          </div>
          <div className={styles.subtext}>
            For every dollar spent, {ratio} dollars flow in. Status: <span className={styles.highlight} style={{color: isPositiveFlow ? 'var(--status-positive)' : 'var(--status-negative)'}}>{isPositiveFlow ? 'Positive' : 'Negative'}</span>.
          </div>
        </div>

        <div className={styles.insightCard}>
          <div className={styles.insightHeader}>
            <TrendingDown size={20} className={styles.icon} />
            <span>Burn Target Analysis</span>
          </div>
          <div className={styles.value}>
            {totalExpenseAmount > 5000 ? 'High' : 'Stable'}
          </div>
          <div className={styles.subtext}>
            The absolute burn rate computes to {formatter.format(totalExpenseAmount)}. {totalExpenseAmount > 5000 ? 'Monitor heavily.' : 'Operating efficiently.'} 
          </div>
        </div>

      </div>
    </>
  );
}
