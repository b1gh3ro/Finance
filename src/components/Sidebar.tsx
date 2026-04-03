import { LayoutDashboard, ReceiptText, PieChart, Moon, Sun, ArrowRightLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useStore } from '../store/useStore';
import styles from './Sidebar.module.css';

export function Sidebar() {
  const { role, setRole, theme, toggleTheme } = useStore();

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoMark}></div>
        <span>Nexus Fin</span>
      </div>

      <nav className={styles.nav}>
        <NavLink 
          to="/" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <LayoutDashboard size={18} />
          <span>Overview</span>
        </NavLink>

        <NavLink 
          to="/transactions" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <ReceiptText size={18} />
          <span>Transactions</span>
        </NavLink>

        {/* Dummy route placeholder for layout fidelity */}
        <NavLink 
          to="/insights" 
          className={({ isActive }) => `${styles.navItem} ${isActive ? styles.active : ''}`}
        >
          <PieChart size={18} />
          <span>Insights</span>
        </NavLink>
      </nav>

      <div className={styles.footer}>
        <div className={styles.roleToggle}>
          <div className={styles.roleHeader}>
            <ArrowRightLeft size={14} className={styles.mutedIcon} />
            <span className={styles.roleLabel}>Current Role</span>
          </div>
          <select 
            value={role} 
            onChange={(e) => setRole(e.target.value as 'Viewer' | 'Admin')}
            className={styles.roleSelect}
          >
            <option value="Viewer">Viewer</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button className={styles.themeToggle} onClick={toggleTheme} aria-label="Toggle theme">
          {theme === 'light' ? <Moon size={18} /> : <Sun size={18} />}
          <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
        </button>
      </div>
    </aside>
  );
}
