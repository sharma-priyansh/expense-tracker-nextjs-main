"use client";
import { useState } from 'react';
import { Transaction } from '@/types/Transaction';
import { addCommas } from '@/lib/utils';
import { toast } from 'react-toastify';
import deleteTransaction from '@/app/actions/deleteTransaction';
import Spinner from './Spinner';
import { CATEGORY_COLORS } from '@/lib/categories';

const TransactionItem = ({ transaction }: { transaction: Transaction }) => {
  const sign = transaction.amount < 0 ? '-' : '+';

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteTransaction = async (transactionId: string) => {
    const confirmed = window.confirm(
      'Are you sure you want to delete this transaction?'
    );

    if (!confirmed) return;

    setIsDeleting(true);
    try {
      const { message, error } = await deleteTransaction(transactionId);

      if (error) {
        toast.error(error);
      } else {
        toast.success(message);
      }
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <li className={transaction.amount < 0 ? 'minus' : 'plus'}>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span>{transaction.text}</span>
        {transaction.category ? (
          <span
            className='category-badge'
            style={{
              background: 'transparent',
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span
              aria-hidden
              style={{
                width: 10,
                height: 10,
                borderRadius: 999,
                background: CATEGORY_COLORS[transaction.category] || 'rgba(0,0,0,0.12)'}}
            />
            <span style={{ fontSize: 12 }}>{transaction.category}</span>
          </span>
        ) : null}
      </div>
      <span>
        {sign}${addCommas(Math.abs(transaction.amount))}
      </span>
      <button
        onClick={() => handleDeleteTransaction(transaction.id)}
        className='delete-btn'
        disabled={isDeleting}
        aria-label='Delete transaction'
      >
        {isDeleting ? <Spinner size={12} /> : 'x'}
      </button>
    </li>
  );
};

export default TransactionItem;
