import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format, parseISO } from 'date-fns';
import styles from './Charts.module.css';
import { useStore } from '../../store/useStore';
import { CURRENT_USER } from '../../data/mockData';

export function TrendChart() {
  const theme = useStore((state) => state.theme);
  const role = useStore(state => state.role);
  const transactions = useStore(state => state.transactions);
  const isDark = theme === 'dark';
  
  const textColor = isDark ? '#94A3B8' : '#64748B';
  const gridColor = isDark ? '#334155' : '#E2E8F0';
  const chartColor = '#0A5C36'; 

  const visibleTx = role === 'Viewer' 
    ? transactions.filter(t => t.userName === CURRENT_USER) 
    : transactions;

  // Dynamically compute cumulative balance chronologically
  const sortedTx = [...visibleTx].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  
  let currentBalance = 0;
  const dynamicTimeline = sortedTx.map(tx => {
    currentBalance += (tx.type === 'Income' ? tx.amount : -tx.amount);
    return {
      date: format(parseISO(tx.date), 'MMM dd'),
      balance: currentBalance,
    };
  });

  return (
    <div className={styles.chartCard} >
      <div className={styles.chartHeader}>
        <h3 className={styles.chartTitle}>Balance Trend</h3>
        <span className={styles.chartSubtitle}>Computed from Activity</span>
      </div>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dynamicTimeline.length > 0 ? dynamicTimeline : [{date: 'N/A', balance: 0}]}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor={chartColor} stopOpacity={isDark ? 0.3 : 0.1}/>
                <stop offset="95%" stopColor={chartColor} stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
            <XAxis 
              dataKey="date" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }} 
              dy={10} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: textColor, fontSize: 12 }}
              tickFormatter={(value) => `$${value}`}
              dx={-10}
            />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: isDark ? '#1E1E1E' : '#FFFFFF',
                border: `1px solid ${gridColor}`,
                borderRadius: '8px',
                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: isDark ? '#F8FAFC' : '#0B132B' }}
              formatter={(value: any) => [`$${Number(value).toLocaleString()}`, 'Balance']}
            />
            <Area 
              type="monotone" 
              dataKey="balance" 
              stroke={chartColor} 
              strokeWidth={3}
              fillOpacity={1} 
              fill="url(#colorBalance)" 
              activeDot={{ r: 6, strokeWidth: 0, fill: chartColor }}
              isAnimationActive={false} // Disable to avoid flash on re-render
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
