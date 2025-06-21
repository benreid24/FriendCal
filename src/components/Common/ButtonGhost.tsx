import type { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
}

export type ButtonGhostProps = PropsWithChildren<Props>;

export function ButtonGhost({ onClick, children, className = '', style }: ButtonGhostProps) {
  return (
    <>
      <button className={`button-ghost ${className}`} style={style} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        .button-ghost {
          border: none;
          background: inherit;
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          color: var(--text);
          cursor: pointer;
        }
      `}</style>
    </>
  );
}
