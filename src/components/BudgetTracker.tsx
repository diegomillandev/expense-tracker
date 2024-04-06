import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import { AmountDisplay } from '.';
import { calculateAmount } from '../helpers';
import { useBudget } from '../hooks/useBudget';

export const BudgetTracker = () => {
    const { state, dispatch } = useBudget();
    const budget = state.budget;
    const spent = calculateAmount(state.expenses);
    const available = state.budget - spent;
    const percentage = +((spent / budget) * 100).toFixed(2);
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <CircularProgressbar
                    value={percentage}
                    text={`${percentage}%`}
                    styles={buildStyles({
                        pathColor:
                            percentage === 100
                                ? '#f4354b'
                                : percentage >= 65
                                ? '#f46235'
                                : '#3b82f6',
                        trailColor: '#e9e9e9',
                        textSize: 8,
                        textColor: '#3b82f6',
                    })}
                />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-red-500 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-red-700"
                    onClick={() =>
                        dispatch({
                            type: 'reset-app',
                        })
                    }
                >
                    Reset App
                </button>
                <AmountDisplay label="Budget" amount={budget} />
                <AmountDisplay label="Available" amount={available} />
                <AmountDisplay label="Spent" amount={spent} />
            </div>
        </div>
    );
};
