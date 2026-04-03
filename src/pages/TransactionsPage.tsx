import { TransactionsTable } from '../components/TransactionsTable';
import styles from '../App.module.css';

export function TransactionsPage() {
  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Transactions Ledger</h1>
          <p className={styles.pageSubtitle}>Detailed view of all financial activity.</p>
        </div>
      </div>
      
      <div className={styles.dashboardGrid}>
        <TransactionsTable />
      </div>
    </>
  );
}
