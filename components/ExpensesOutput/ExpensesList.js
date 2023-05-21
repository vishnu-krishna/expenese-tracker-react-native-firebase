import { FlatList } from 'react-native';
import ExpenseItem from '../../components/ExpensesOutput/ExpenseItem';

function renderExpenseItem(itemData) {
    return <ExpenseItem {...itemData.item} />;
}

function ExpensesList({ expenses }) {
    return (
        <FlatList
            data={expenses}
            renderItem={renderExpenseItem}
            keyExtractor={(item) => item.id}
        />

    );
}

export default ExpensesList;
