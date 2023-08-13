import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ExpensesContainer = () => {
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const currentDate = new Date();
    const startOfMonthDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const defaultFromDate = startOfMonthDate.toISOString().substring(0, 10);
    const defaultToDate = currentDate.toISOString().substring(0, 10);

    useEffect(() => {
            const fetchExpenses = async () => {
                try {
                    await axios.get('http://localhost:5251/api/expense', {
                        params: {
                            startDate: defaultFromDate,
                            endDate: defaultToDate
                        }
                    })
                        .then(response => {
                            const total: number = response.data.total;
                            setTotalExpense(total);
                        });
                } catch (error) {
                    console.error('Error fetching expenses:', error);
                }
            };
            fetchExpenses().then();
        },
        [defaultFromDate, defaultToDate]);


    return (
        <div>
            <h1>Expenses from {startOfMonthDate.toDateString()} to {currentDate.toDateString()}</h1>
            <p>Total Expenses: ${totalExpense.toFixed(2)}</p>
        </div>
    );
};

export default ExpensesContainer;
