import { currentUser } from '@clerk/nextjs/server';
import Guest from '@/components/Guest';
import AddTransaction from '@/components/AddTransaction';
import Balance from '@/components/Balance';
import IncomeExpense from '@/components/IncomeExpense';
import TransactionList from '@/components/TransactionList';
import { Suspense } from 'react';
import DashboardLoading from '@/components/DashboardLoading';

const HomePage = async () => {
  const user = await currentUser();

  if (!user) {
    return <Guest />;
  }

  return (
    <main>
      <h2>Welcome, {user.firstName}</h2>
      <Suspense fallback={<DashboardLoading />}>
        <Balance />
        <IncomeExpense />
        <AddTransaction />
        <TransactionList />
      </Suspense>
    </main>
  );
};

export default HomePage;
