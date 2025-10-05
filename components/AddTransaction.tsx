 'use client';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';
import Spinner from './Spinner';
import CATEGORIES, { CATEGORY_COLORS } from '@/lib/categories';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [customCategory, setCustomCategory] = useState<string>('');

  const clientAction = async (formData: FormData) => {
    setIsSubmitting(true);
    try {
      const { data, error } = await addTransaction(formData);

      if (error) {
        toast.error(error);
      } else {
        toast.success('Transaction added');
        formRef.current?.reset();
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Set submitting state synchronously before the native form action runs so
  // the spinner appears immediately on click.
  const handleFormSubmit = (_e: FormEvent<HTMLFormElement>) => {
    setIsSubmitting(true);
    // do not call preventDefault so server action (form action) proceeds
  };

  return (
    <>
      <h3>Add transaction</h3>
  <form ref={formRef} action={clientAction} onSubmit={handleFormSubmit}>
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            id='text'
            name='text'
            placeholder='Enter text...'
            disabled={isSubmitting}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br /> (negative - expense, positive - income)
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Enter amount...'
            step='0.01'
            disabled={isSubmitting}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>Category</label>
          <select
            id='category'
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            disabled={isSubmitting}
          >
            <option value=''>Select category (optional)</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
            <option value='__other'>Other (custom)...</option>
          </select>

          {selectedCategory === '__other' ? (
            <input
              type='text'
              id='category-custom'
              placeholder='Enter custom category'
              value={customCategory}
              onChange={(e) => setCustomCategory(e.target.value)}
              disabled={isSubmitting}
              style={{ marginTop: 8 }}
            />
          ) : null}

          {/* Hidden input holds the final category value submitted with the form */}
          <input
            type='hidden'
            name='category'
            value={
              selectedCategory === ''
                ? ''
                : selectedCategory === '__other'
                ? customCategory
                : selectedCategory
            }
          />
          {/* Compact legend under the category select to show color hints */}
          <div style={{ marginTop: 8 }} className='category-legend' aria-hidden>
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
        <button className='btn' disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <Spinner /> <span style={{ marginLeft: 8 }}>Adding...</span>
            </>
          ) : (
            'Add transaction'
          )}
        </button>
      </form>
    </>
  );
};

export default AddTransaction;
