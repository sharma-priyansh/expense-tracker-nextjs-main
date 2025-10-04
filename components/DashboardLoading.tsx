"use client";
import Spinner from './Spinner';

const DashboardLoading = () => {
  return (
    <div>
      <h2 style={{ opacity: 0.6 }}>Welcome</h2>
      <div style={{ display: 'grid', gap: 12 }}>
        <div style={{ background: '#eee', height: 36, width: 200, borderRadius: 6 }} />
        <div style={{ background: '#eee', height: 80, borderRadius: 6 }} />
        <div style={{ background: '#eee', height: 200, borderRadius: 6 }} />
      </div>
      <div style={{ marginTop: 12 }}>
        <button className='btn' disabled>
          <Spinner />
        </button>
      </div>
    </div>
  );
};

export default DashboardLoading;
