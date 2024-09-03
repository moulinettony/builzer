// components/LoadingSpinner.tsx
import React from 'react';
import ReactLoading from 'react-loading';

const LoadingSpinner = () => (
  <div className="flex justify-center items-center min-h-screen">
    <ReactLoading type="spin" color="#000" />
  </div>
);

export default LoadingSpinner;
