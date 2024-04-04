import { BudgetForm, Header } from '.';

export const ExpenseTrackerApp = () => {
    return (
        <>
            <Header />
            <section className=" max-w-3xl mx-auto bg-white shadow-lg rounded-lg mt-10 p-10">
                <BudgetForm />
            </section>
        </>
    );
};
