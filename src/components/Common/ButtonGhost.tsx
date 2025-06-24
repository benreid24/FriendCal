import type { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  disabled?: boolean;
}

export type ButtonGhostProps = PropsWithChildren<Props>;

export function ButtonGhost({
  onClick,
  children,
  className = '',
  style,
  disabled = false,
}: ButtonGhostProps) {
  return (
    <>
      <button
        className={`button-ghost ${className}`}
        style={style}
        onClick={onClick}
        disabled={disabled}
      >
        {children}
      </button>
      <style jsx>{`
        .button-ghost {
          border: none;
          background: inherit;
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          color: var(--text ${disabled ? '-disabled' : ''});
          cursor: ${disabled ? 'default' : 'pointer'};
        }
      `}</style>
    </>
  );
}
