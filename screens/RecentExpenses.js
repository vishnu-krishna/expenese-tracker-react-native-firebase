import React, { useContext, useEffect, useState } from 'react';
import ExpensesOutput from '../components/ExpensesOutput/ExpensesOutput';
import { ExpensesContext } from '../store/expenses-context';
import { fetchExpenses } from '../util/http';
import ErrorOverlay from '../components/UI/ErrorOverlay';
import { getDateMinusDays } from '../util/date';

const RecentExpenses = () => {
    const [ isFetching, setIsFetching ] = useState(true);
    const [ error, setError ] = useState('');

    const expensesCtx = useContext(ExpensesContext);

    useEffect(() => {
        async function getExpenses() {
            setIsFetching(true);
            try {
                const expenses = await fetchExpenses();
                expensesCtx.setExpenses(expenses);
            } catch (error) {
                setError('Could not fetch expenses!');
            }
            setIsFetching(false);
        }

        getExpenses();
    }, []);

    const recentExpenses = expensesCtx.expenses.filter((expense) => {
        const today = new Date();
        const date7DaysAgo = getDateMinusDays(today, 7);

        return expense.date >= date7DaysAgo && expense.date <= today;
    });

    if (error && !isFetching) {
        return <ErrorOverlay message={error}/>;
    }

    return (
        <ExpensesOutput expensesPeriod={'Last 7 Days'} expenses={recentExpenses} fallbackText={'No Recent Expenses'}/>

    );
};

export default RecentExpenses;
