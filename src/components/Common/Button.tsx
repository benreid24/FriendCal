import type { CSSProperties, PropsWithChildren } from 'react';

export type Variant = 'primary' | 'secondary' | 'destructive';

interface Props {
  onClick?: () => void;
  style?: CSSProperties;
  className?: string;
  variant?: Variant;
}

export type ButtonProps = PropsWithChildren<Props>;

export function Button({
  onClick,
  children,
  className = '',
  style,
  variant = 'primary',
}: ButtonProps) {
  return (
    <>
      <button className={`button ${className}`} style={style} onClick={onClick}>
        {children}
      </button>
      <style jsx>{`
        .button {
          background-color: var(--button-${variant});
          border: 1px solid var(--border);
          border-radius: 8px;
          padding: 6px 8px;
          cursor: pointer;
          transition: background-color 0.2s ease;
          font-size: var(--font-size);
          font-weight: var(--font-weight);
          color: var(--text);
        }
        .button:hover {
          box-shadow: 2px 2px 2px 0px var(--border);
          background-color: color-mix(in srgb, var(--button-${variant}) 80%, #ffffff 20%);
        }
        .button:active {
          box-shadow: 2px 2px 2px 0px var(--border);
          background-color: color-mix(in srgb, var(--button-${variant}) 80%, #000000 20%);
        }
      `}</style>
    </>
  );
}
