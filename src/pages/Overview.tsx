import { SummaryCards } from '../components/SummaryCards';
import { InsightsTicker } from '../components/InsightsTicker';
import { TrendChart } from '../components/charts/TrendChart';
import { CategoryChart } from '../components/charts/CategoryChart';
import styles from '../App.module.css';

export function Overview() {
  return (
    <>
      <div className={styles.header}>
        <div>
          <h1 className={styles.pageTitle}>Dashboard Overview</h1>
          <p className={styles.pageSubtitle}>Welcome back. Here's your financial summary.</p>
        </div>
      </div>
      
      <InsightsTicker />
      
      <div className={styles.dashboardGrid}>
        <SummaryCards />
        
        <div className={styles.chartsRow}>
          <TrendChart />
          <CategoryChart />
        </div>
      </div>
    </>
  );
}
