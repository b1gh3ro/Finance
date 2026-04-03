import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useStore } from '../../store/useStore';
import { CURRENT_USER } from '../../data/mockData';
import styles from './Charts.module.css';

const COLORS = ['#0A5C36', '#1E7B4C', '#329562', '#4BAF78', '#66C98F', '#8EDBAD']; 

export function CategoryChart() {
  const theme = useStore((state) => state.theme);
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);
  
  const isDark = theme === 'dark';
  const gridColor = isDark ? '#334155' : '#E2E8F0';
  
  const visibleTx = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  // Dynamically compute Expense Categories
  const categoryMap = visibleTx
    .filter(t => t.type === 'Expense')
    .reduce((acc, t) => {
      acc[t.category] = (acc[t.category] || 0) + t.amount;
      return acc;
    }, {} as Record<string, number>);

  const dynamicCategories = Object.entries(categoryMap)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value); // sort largest first

  return (
    <div className={styles.chartCard}>
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Top Expenses</h3>
        <span className={styles.chartSubtitle}>By category</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={dynamicCategories.length > 0 ? dynamicCategories : [{name: 'No data', value: 1}]}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              stroke="none"
              isAnimationActive={false} // Disable animation to prevent visual bugs when swapping data quickly
            >
              {dynamicCategories.length > 0 ? dynamicCategories.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              )) : (
                <Cell fill={isDark ? '#334155' : '#E2E8F0'} />
              )}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                border: `1px solid ${gridColor}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Total Spent']}
            />
            <Legend 
              verticalAlign="bottom" 
              height={36} 
              iconType="circle"
              wrapperStyle={{ fontSize: '12px', color: isDark ? '#94A3B8' : '#64748B' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
