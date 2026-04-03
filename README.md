# Nexus Fin - Premium Finance Dashboard 

Link: https://finance-psi-puce.vercel.app/

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
[View Live Demo](https://finance-psi-puce.vercel.app/) 

## Screenshots & How it Works

**1. Dashboard & Data Visualization**
<img width="1911" height="1027" alt="image" src="https://github.com/user-attachments/assets/5fafae37-3f93-45a6-b819-5ae44661064b" /><img width="1909" height="1022" alt="image" src="https://github.com/user-attachments/assets/4e8a1fef-aad4-4eca-9845-84a6c5966a8f" />
<img width="1916" height="1027" alt="image" src="https://github.com/user-attachments/assets/5cd36e1a-f424-4348-90d3-99783d0cc23b" />


*The main view presents aggregate financial metrics and an interactive Recharts balance graph. The UI reacts instantly to window resizing and Dark/Light mode toggling.*

**2. Transactions & Search**
<img width="1899" height="1032" alt="image" src="https://github.com/user-attachments/assets/fc6c190f-d578-4557-b5e6-0ad03593c59f" /><img width="1893" height="1030" alt="image" src="https://github.com/user-attachments/assets/70dd09dd-5a76-4a84-a634-d3af10bbbc64" />

<img width="1916" height="1037" alt="image" src="https://github.com/user-attachments/assets/a12e7332-0f55-4e81-9b83-c84b638cf91f" />


*Users can search past transactions dynamically. Filtering state is handled responsively.*

**3. Role-Based Access Control (Admin vs Viewer)**
<img width="1890" height="1022" alt="image" src="https://github.com/user-attachments/assets/b62f02aa-60f6-4414-83b8-a44b34f6d7ea" />

*When switched to the "Admin" role via the persistent sidebar, new privileged controls (like the 'Delete' and 'Add Transaction' buttons) smoothly animate into the DOM, governed by pure Zustand global state.*

---
