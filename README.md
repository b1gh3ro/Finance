# Nexus Fin - Premium Finance Dashboard

A clean, highly readable, and interactive frontend finance dashboard built to evaluate frontend development, application state handle, and architectural simplicity.

## Approach & Philosophy

The objective was to design a professional, minimalistic web-based interface modeled closely to high-end institutional bank dashboards. It intentionally avoids "SaaS-template" cliches, using strict spacing, sharp lines, and subtle contrasts. 

**Technical Stack Choices**:
- **React (Vite) + TypeScript**: Strict typings ensure a phenomenal and amazing developer experience by preventing silent bugs.
- **Vanilla CSS (CSS Modules)**: Avoiding external heavy CSS frameworks keeps the UI bespoke, performant, and deeply customizable while remaining readable.
- **Zustand**: A much smaller, readable alternative to Redux that still rigorously handles global state for Transactions, UI Themes, and Role-based view switching.
- **Recharts**: For high-quality SVG data visualizations that look extremely professional.

## Features Included

- **Dashboard Overview**: Metrics including Total Balance, Income, and Expenses.
- **Interactive Charts**: A 6-month historical Balance Trend (Line/Area Chart) and a Top Expenses breakdown (Doughnut Chart) with tooltips.
- **Transactions Section**: Contains fully sortable and filterable data via keyword search. Includes "Type" badges and formatting.
- **Simulated Role-Based UI (RBAC)**: Toggling from "Viewer" to "Admin" in the sidebar instantly enables adding new transactions and deleting existing ones via standard forms.
- **Insights & Metrics**: A smart "Insights Ticker" simulating data inferences based on user's highest spending.
- **Dark Mode**: Included a sophisticated Dark Theme (`Moon`/`Sun` toggle) utilizing structural CSS variables.

## Getting Started

1. Ensure you have Node.js installed.
2. Clone or open the repository.
3. Install the dependencies:
   ```bash
   npm install
   ```
4. Start the interactive local development server:
   ```bash
   npm run dev
   ```
5. Navigate to the provided local URL (typically `http://localhost:5173`).

## Live Preview
*(Optional: If hosted, you can include a live deployment link here!)*
[View Live Demo](#) (Link to be added upon deployment)

## Screenshots & How it Works

**1. Dashboard & Data Visualization**
![Dashboard View](https://via.placeholder.com/800x400?text=Dashboard+Overview)
*The main view presents aggregate financial metrics and an interactive Recharts balance graph. The UI reacts instantly to window resizing and Dark/Light mode toggling.*

**2. Transactions & Search**
![Transactions View](https://via.placeholder.com/800x400?text=Transactions+and+Search)
*Users can search past transactions dynamically. Filtering state is handled responsively.*

**3. Role-Based Access Control (Admin vs Viewer)**
![RBAC Tools](https://via.placeholder.com/800x400?text=Admin+Controls)
*When switched to the "Admin" role via the persistent sidebar, new privileged controls (like the 'Delete' and 'Add Transaction' buttons) smoothly animate into the DOM, governed by pure Zustand global state.*

---