'use client';
import { useRef, useState } from 'react';
import type { FormEvent } from 'react';
import addTransaction from '@/app/actions/addTransaction';
import { toast } from 'react-toastify';
import Spinner from './Spinner';

const AddTransaction = () => {
  const formRef = useRef<HTMLFormElement>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);

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
