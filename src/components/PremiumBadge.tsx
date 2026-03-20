import React from 'react';

export const PremiumBadge: React.FC<{ size?: 'sm' | 'md' }> = ({ size = 'md' }) => {
  const sizeClasses = size === 'sm' ? 'px-1.5 py-0.5 text-[8px]' : 'px-2 py-0.5 text-[10px]';
  const iconSize = size === 'sm' ? 'w-2 h-2' : 'w-2.5 h-2.5';

  return (
    <span className={`bg-[#f1c40f] text-black font-black uppercase rounded-full inline-flex items-center gap-1 shadow-sm ${sizeClasses}`}>
      <svg className={iconSize} fill="currentColor" viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
      </svg>
      Premium
    </span>
  );
};

export const AdFreeIndicator: React.FC = () => {
  return (
    <div className="flex items-center gap-2 text-[#2ecc71] font-semibold text-sm">
      <div className="bg-[#2ecc71]/10 p-1 rounded-full">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      Ad-free Mode Active
    </div>
  );
};
