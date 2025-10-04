"use client";
import React, { useMemo, useState } from 'react';
import { Transaction } from '@/types/Transaction';
import TransactionItem from './TransactionItem';

const ALL = 'All';

const TransactionListClient = ({ transactions }: { transactions: Transaction[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    const set = new Set<string>();
    transactions.forEach((t) => {
      if (t.category) set.add(t.category);
    });
    return [ALL, ...Array.from(set).sort()];
  }, [transactions]);

  const filtered = useMemo(() => {
    if (selectedCategory === ALL) return transactions;
    return transactions.filter((t) => t.category === selectedCategory);
  }, [transactions, selectedCategory]);

  return (
    <>
      <div style={{ marginBottom: 12 }}>
        <label htmlFor='category-filter' style={{ marginRight: 8 }}>
          Filter by category:
        </label>
        <select
          id='category-filter'
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <ul className='list'>
        {filtered.map((transaction) => (
          <TransactionItem key={transaction.id} transaction={transaction} />
        ))}
      </ul>
    </>
  );
};

export default TransactionListClient;
