import { ExpenseTrackerApp } from './components';
import { BudgetProvider } from './context/BudgetContext';

export const App = () => {
    return (
        <BudgetProvider>
            <ExpenseTrackerApp />
        </BudgetProvider>
    );
};
