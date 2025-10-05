"use client";
import React, { useMemo, useState } from 'react';
import { Transaction } from '@/types/Transaction';
import TransactionItem from './TransactionItem';
import CATEGORIES, { CATEGORY_COLORS } from '@/lib/categories';

const ALL = 'All';

const TransactionListClient = ({ transactions }: { transactions: Transaction[] }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>(ALL);

  const categories = useMemo(() => {
    // Start with preset categories, then add any extra categories from transactions
    const set = new Set<string>(CATEGORIES.filter(Boolean));
    transactions.forEach((t) => {
      if (t.category && !set.has(t.category)) set.add(t.category);
    });
    return [ALL, ...Array.from(set).sort()];
  }, [transactions]);

  const filtered = useMemo(() => {
    if (selectedCategory === ALL) return transactions;
    return transactions.filter((t) => t.category === selectedCategory);
  }, [transactions, selectedCategory]);

  return (
    <>
      <div style={{ marginBottom: 12 }} className='filter-row'>
        <label htmlFor='category-filter' style={{ marginRight: 8 }}>
          Filter by category:
        </label>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
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

          {/* show a small color chip for selected category (not coloring the whole select) */}
          {selectedCategory && selectedCategory !== ALL ? (
            <span
              aria-hidden
              className='filter-chip'
              style={{
                background: CATEGORY_COLORS[selectedCategory] || 'rgba(0,0,0,0.12)'
              }}
              title={selectedCategory}
            />
          ) : null}
        </div>

        {/* Legend: show preset categories with their colors in a compact row */}
        <div style={{ marginLeft: 16 }} className='category-legend' aria-hidden>
          {CATEGORIES.map((c) => (
            <div key={c} className='legend-item' title={c}>
              <span
                className='legend-chip'
                style={{ background: CATEGORY_COLORS[c] || 'rgba(0,0,0,0.12)' }}
              />
              <span className='legend-label'>{c}</span>
            </div>
          ))}
        </div>
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
