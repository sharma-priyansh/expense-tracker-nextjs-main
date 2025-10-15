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
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = (formData: FormData) => {
    const newErrors: Record<string, string> = {};

    const text = formData.get('text')?.toString().trim() || '';
    const amount = formData.get('amount')?.toString().trim() || '';
    const category =
      selectedCategory === '__other'
        ? customCategory.trim()
        : selectedCategory.trim();

    if (!text) {
      newErrors.text = 'Please enter a description for your transaction.';
    }

    if (!amount) {
      newErrors.amount = 'Please enter an amount.';
    } else if (isNaN(Number(amount))) {
      newErrors.amount = 'Amount must be a number.';
    } else if (Number(amount) === 0) {
      newErrors.amount = 'Amount cannot be zero.';
    }

    if (selectedCategory === '__other' && !customCategory.trim()) {
      newErrors.category = 'Please enter a name for your custom category.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const clientAction = async (formData: FormData) => {
    if (!validateForm(formData)) {
      setIsSubmitting(false);
      return;
    }

    setIsSubmitting(true);
    try {
      const { data, error } = await addTransaction(formData);

      if (error) {
        toast.error(error);
      } else {
        toast.success('Transaction added successfully.');
        formRef.current?.reset();
        setSelectedCategory('');
        setCustomCategory('');
        setErrors({});
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    clientAction(formData);
  };

  return (
    <>
      <h3>Add transaction</h3>
      <form ref={formRef} onSubmit={handleFormSubmit}>
        {/* Text input */}
        <div className='form-control'>
          <label htmlFor='text'>Text</label>
          <input
            type='text'
            id='text'
            name='text'
            placeholder='Enter description...'
            disabled={isSubmitting}
          />
          {errors.text && <p className='error-message'>{errors.text}</p>}
        </div>

        {/* Amount input */}
        <div className='form-control'>
          <label htmlFor='amount'>
            Amount <br /> (negative = expense, positive = income)
          </label>
          <input
            type='number'
            name='amount'
            id='amount'
            placeholder='Enter amount...'
            step='0.01'
            disabled={isSubmitting}
          />
          {errors.amount && <p className='error-message'>{errors.amount}</p>}
        </div>

        {/* Category selector */}
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

          {selectedCategory === '__other' && (
            <>
              <input
                type='text'
                id='category-custom'
                placeholder='Enter custom category'
                value={customCategory}
                onChange={(e) => setCustomCategory(e.target.value)}
                disabled={isSubmitting}
                style={{ marginTop: 8 }}
              />
              {errors.category && (
                <p className='error-message'>{errors.category}</p>
              )}
            </>
          )}

          {/* Hidden field for final category value */}
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

          {/* Category color legend */}
          <div style={{ marginTop: 8 }} className='category-legend' aria-hidden>
            {CATEGORIES.map((c) => (
              <div key={c} className='legend-item' title={c}>
                <span
                  className='legend-chip'
                  style={{
                    background: CATEGORY_COLORS[c] || 'rgba(0,0,0,0.12)',
                  }}
                />
                <span className='legend-label'>{c}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Submit button */}
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

      <style jsx>{`
        .error-message {
          color: #d9534f;
          font-size: 0.9rem;
          margin-top: 4px;
        }
      `}</style>
    </>
  );
};

export default AddTransaction;
