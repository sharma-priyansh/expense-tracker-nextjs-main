import React from 'react';
import TransactionListClient from './TransactionListClient';
import { Transaction } from '@/types/Transaction';
import getTransactions from '@/app/actions/getTransactions';

const TransactionList = async () => {
  const { transactions, error } = await getTransactions();

  if (error) {
    return <p className='error'>{error}</p>;
  }

  return (
    <>
      <h3>History</h3>
      {transactions ? (
        // Render a client component that can filter the list by category
        <TransactionListClient transactions={transactions as Transaction[]} />
      ) : (
        <p>No transactions found</p>
      )}
    </>
  );
};

export default TransactionList;
