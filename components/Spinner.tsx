"use client";
import { ClipLoader } from 'react-spinners';

const Spinner = ({ size = 18 }: { size?: number }) => {
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center' }}>
      <ClipLoader size={size} color="#fff" />
    </span>
  );
};

export default Spinner;
