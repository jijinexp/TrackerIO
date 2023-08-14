import React, {useState, useEffect} from 'react';
import axios from 'axios';

const ExpensesContainer = () => {
    const [totalExpense, setTotalExpense] = useState<number>(0);
    const [totalEarnings, setTotalEarnings] = useState<number>(0);
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
                            const totalExp: number = response.data.expenseTotal;
                            const totalEarn: number = response.data.earningsTotal;
                            setTotalExpense(totalExp);
                            setTotalEarnings(totalEarn)
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
            <p>Total Earnings: ${totalEarnings.toFixed(2)}</p>
        </div>
    );
};

export default ExpensesContainer;
