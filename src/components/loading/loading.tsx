import styles from './loading.module.css';

export type LoadingSize = 'sm' | 'md' | 'lg' | 'xl';
export interface LoadingProps {
  size?: LoadingSize;
  text?: string;
}

export function Loading({ size = 'md', text = '' }: LoadingProps) {
  const px = { sm: 60, md: 90, lg: 140, xl: 200 }[size];
  const letters = text.split('');

  return (
    <div className="animate-pulse flex flex-col justify-center items-center h-full w-full">
      <svg
        className={styles.loader}
        style={{ width: px, height: px }}
        viewBox="0 0 120 120"
        role="img"
        aria-label="Loading"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g filter="url(#glow)" className={styles.spin}>
          <path
            stroke="oklch(78.9% 0.154 211.53)"
            strokeWidth="3"
            fill="#9810fa"
            d="M30 30 L90 30 L90 30 L90 90 L90 90 L30 90 L30 90 L30 30 Z"
          >
            <animate
              attributeName="d"
              dur="4s"
              repeatCount="indefinite"
              values="
                M30 30 L90 30 L90 30 L90 90 L90 90 L30 90 L30 90 L30 30 Z;
                M60 20 L100 60 L100 60 L60 100 L60 100 L20 60 L20 60 L60 20 Z;
                M40 25 L100 35 L100 35 L80 95 L80 95 L20 85 L20 85 L40 25 Z;
                M45 25 L85 25 L100 60 L85 95 L45 95 L10 60 L10 60 L45 25 Z;
                M30 30 L90 30 L90 30 L90 90 L90 90 L30 90 L30 90 L30 30 Z
              "
            />
            <animate
              attributeName="fill"
              dur="4s"
              repeatCount="indefinite"
              values="#9810fa;#c214b6;#9810fa"
            />
          </path>
        </g>
      </svg>

      <div
        className="text-2xl tracking-widest font-mono text-cyan-400 select-none"
        aria-hidden="true"
      >
        {letters.map((char, i) => (
          <span
            key={i}
            style={{ animationDelay: `${i * 0.12}s` }}
            className={styles.letter}
          >
            {char}
          </span>
        ))}
      </div>
    </div>
  );
}
