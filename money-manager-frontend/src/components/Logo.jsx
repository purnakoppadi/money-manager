import React from 'react';
import { WalletCards } from 'lucide-react';

const Logo = ({ showText = true, subtitle = false, size = 'md', lightText = false }) => {
  const sizeMap = {
    sm: { iconContainer: 'w-8 h-8 rounded-lg', icon: 16, text: 'text-base', subText: 'text-[9px]' },
    md: { iconContainer: 'w-10 h-10 rounded-xl', icon: 20, text: 'text-lg', subText: 'text-[10px]' },
    lg: { iconContainer: 'w-12 h-12 rounded-xl', icon: 24, text: 'text-xl', subText: 'text-[11px]' },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className="flex items-center gap-3">
      <div className={`${currentSize.iconContainer} flex items-center justify-center shrink-0 shadow-sm bg-purple-700 text-white`}>
        <WalletCards size={currentSize.icon} strokeWidth={2.5} />
      </div>
      
      {showText && (
        <div className="flex flex-col justify-center leading-tight">
          <span 
            className={`${currentSize.text} font-bold tracking-tight`}
            style={{ color: lightText ? '#ffffff' : 'var(--color-dark)' }}
          >
            Money Manager
          </span>
          {subtitle && (
            <span 
              className={`${currentSize.subText} font-bold uppercase tracking-widest mt-0.5`}
              style={{ color: lightText ? '#e9d5ff' : 'var(--color-primary)' }}
            >
              Personal Finance
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
