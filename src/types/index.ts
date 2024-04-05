type ValuePiece = Date | null;
export type Value = ValuePiece | [ValuePiece, ValuePiece];

export type Expense = {
    id: string;
    amount: number;
    name: string;
    category: number;
    date: Value;
};

export type DraftExpense = Omit<Expense, 'id'>;

export type Category = {
    id: number;
    name: string;
    icon: string;
};
