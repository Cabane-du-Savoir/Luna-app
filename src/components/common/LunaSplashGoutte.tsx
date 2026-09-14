import React from 'react';

interface LunaSplashGoutteProps {
  size?: number;
  className?: string;
}

/**
 * LUNA V1 OFFICIELLE - Splash screen
 * Goutte #4A1C2A seule au centre sur fond #FFF8F9
 * Règles strictes :
 * - Pas d'ombre portée
 * - Pas de dégradé
 * - Pas d'étirement de la goutte
 */
export const LunaSplashGoutte: React.FC<LunaSplashGoutteProps> = ({
  size = 72,
  className = '',
}) => {
  const gouttePath =
    'M 504 578 C 504 578 574 660 574 728 C 574 767 543 798 504 798 C 465 798 434 767 434 728 C 434 660 504 578 504 578 Z';

  return (
    <svg
      viewBox="420 560 170 260"
      width={size}
      height={(size * 260) / 170}
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Goutte Luna officielle"
    >
      <path d={gouttePath} fill="#4A1C2A" />
    </svg>
  );
};

export default LunaSplashGoutte;
