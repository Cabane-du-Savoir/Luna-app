import React from 'react';

interface LunaLogoProps {
  size?: number;
  className?: string;
  showBackground?: boolean;
  shape?: 'circle' | 'square' | 'none';
}

/**
 * LUNA V1 OFFICIELLE - BRAND GUIDELINE
 * Logo retenu : Lune + Goutte
 * - Fond: #FFE6EA (Blush)
 * - Lune: #E8A0B0 (Rose poussiéreux)
 * - Goutte: #4A1C2A (Prune - couleur principale)
 * Règles strictes :
 * - Pas d'ombre portée
 * - Pas de dégradé
 * - Pas d'étirement
 * - Pas de blush fluo
 */
export const LunaLogo: React.FC<LunaLogoProps> = ({
  size = 40,
  className = '',
  showBackground = true,
  shape = 'circle',
}) => {
  const lunePath =
    'M 412 215 C 642 208 748 355 748 490 C 748 570 710 638 658 678 C 625 635 540 600 540 600 C 662 520 660 380 540 290 C 475 240 435 225 412 215 Z';
  const tailPath =
    'M 270 536 C 322 610 405 650 490 645 C 465 675 425 680 400 675 C 330 655 285 595 270 536 Z';
  const gouttePath =
    'M 504 578 C 504 578 574 660 574 728 C 574 767 543 798 504 798 C 465 798 434 767 434 728 C 434 660 504 578 504 578 Z';

  return (
    <svg
      viewBox="0 0 1024 1024"
      width={size}
      height={size}
      className={`shrink-0 select-none ${className}`}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Luna Logo officiel"
    >
      {showBackground && (
        <>
          {shape === 'circle' ? (
            <circle cx="512" cy="512" r="512" fill="#FFE6EA" />
          ) : (
            <rect width="1024" height="1024" rx={shape === 'square' ? '220' : '0'} fill="#FFE6EA" />
          )}
        </>
      )}
      {/* Lune: #E8A0B0 (Rose poussiéreux) */}
      <path d={lunePath} fill="#E8A0B0" />
      {/* Base / corne inférieure: #4A1C2A (Prune) */}
      <path d={tailPath} fill="#4A1C2A" />
      {/* Goutte: #4A1C2A (Prune) */}
      <path d={gouttePath} fill="#4A1C2A" />
    </svg>
  );
};

export default LunaLogo;
