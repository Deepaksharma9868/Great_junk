import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'light' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  showTagline?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  variant = 'light',
  size = 'md',
  showText = true,
  showTagline = true,
}) => {
  const isDark = variant === 'dark';

  const imgHeight =
    size === 'sm' ? 'h-9 sm:h-10' : size === 'lg' ? 'h-14 sm:h-16' : 'h-11 sm:h-12 md:h-13';
  const mainTextSize =
    size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-lg sm:text-xl';
  const subTextSize =
    size === 'sm' ? 'text-[9px]' : size === 'lg' ? 'text-xs' : 'text-[10px] sm:text-[11px]';
  const taglineSize =
    size === 'sm' ? 'text-[7px]' : size === 'lg' ? 'text-[9px]' : 'text-[8px] sm:text-[8.5px]';

  return (
    <div
      className={`inline-flex items-center gap-2.5 sm:gap-3 group select-none ${className}`}
      id="brand-logo"
      aria-label="Great Junk Removalist Melbourne"
    >
      {/* Official Uploaded Great Junk Removalist Truck Logo Graphic */}
      <div className="relative shrink-0 flex items-center justify-center transition-transform duration-200 group-hover:scale-105">
        <img
          src="/images/logo.png"
          alt="Great Junk Removalist Logo"
          className={`${imgHeight} w-auto object-contain drop-shadow-sm filter`}
          loading="eager"
        />
      </div>

      {/* Brand Name Typography matching uploaded truck branding */}
      {showText && (
        <div className="flex flex-col justify-center leading-none">
          <div className="flex items-baseline gap-1">
            <span
              className={`font-black tracking-tight ${mainTextSize} ${
                isDark ? 'text-white' : 'text-[#091b2f]'
              }`}
            >
              GREAT
            </span>
            <span className={`font-black tracking-tight ${mainTextSize} text-[#84d800]`}>
              JUNK
            </span>
          </div>

          <span
            className={`font-extrabold tracking-[0.24em] ${subTextSize} ${
              isDark ? 'text-slate-200' : 'text-[#091b2f]'
            } mt-0.5`}
          >
            REMOVALIST
          </span>

          {showTagline && (
            <span
              className={`font-bold tracking-wider uppercase text-slate-400 ${taglineSize} mt-0.5`}
            >
              WE REMOVE. YOU RELAX.
            </span>
          )}
        </div>
      )}
    </div>
  );
};
