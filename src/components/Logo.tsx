import React, { useState } from 'react';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
  isDarkTheme?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  size = 'md',
  showText = false,
  className = '',
  isDarkTheme = true,
}) => {
  const [imgError, setImgError] = useState(false);

  // Height configurations maintaining exact natural 1:1 circular aspect ratio
  const sizeClasses = {
    sm: 'h-10 w-10 sm:h-11 sm:w-11',
    md: 'h-14 w-14 sm:h-16 sm:w-16',
    lg: 'h-24 w-24',
    xl: 'h-36 w-36 md:h-48 md:w-48',
  };

  // Use the white badge version on dark navy backgrounds for perfect contrast
  const logoSrc = isDarkTheme
    ? '/assets/logo/sms-logo-white-badge.svg'
    : '/assets/logo/sms-logo-transparent.svg';

  const fallbackSrc = '/assets/logo/sms-logo-transparent-2048.png';

  return (
    <div className={`flex items-center gap-3 shrink-0 ${className}`}>
      <img
        src={!imgError ? logoSrc : fallbackSrc}
        onError={() => setImgError(true)}
        alt="Safety Management Solutions (SMS)"
        className={`${sizeClasses[size]} object-contain shrink-0 rounded-full shadow-sm`}
        loading="eager"
      />

      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <span className={`text-base sm:text-lg font-bold tracking-tight ${isDarkTheme ? 'text-white' : 'text-[#0F2C47]'}`}>
            SMS
          </span>
          <span className="text-[11px] font-semibold tracking-wider text-[#62B5DA] uppercase mt-0.5">
            Safety Management Solutions
          </span>
        </div>
      )}
    </div>
  );
};
