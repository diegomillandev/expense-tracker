import { AmountDisplay } from '.';

export const BudgetTracker = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="flex justify-center">
                <img src="/graph.jpg" alt="image expenses" />
            </div>
            <div className="flex flex-col justify-center items-center gap-8">
                <button
                    type="button"
                    className="bg-red-500 w-full p-2 text-white uppercase font-bold rounded-lg hover:bg-red-700"
                >
                    Reset App
                </button>
                <AmountDisplay label="Budget" amount={300} />
                <AmountDisplay label="Available" amount={300} />
                <AmountDisplay label="Spent" amount={300} />
            </div>
        </div>
    );
};
