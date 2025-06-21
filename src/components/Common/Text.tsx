import type { CSSProperties, PropsWithChildren } from 'react';

interface Props {
  size?: 'small' | 'regular' | 'large';
  color?: 'default' | 'secondary' | 'error';
  weight?: 'default' | 'bold' | 'semibold';
  inline?: boolean;
  className?: string;
  style?: CSSProperties;
}

export type TextProps = PropsWithChildren<Props>;

export function Text({
  children,
  inline,
  className,
  style,
  size = 'regular',
  color = 'default',
  weight = 'default',
}: TextProps) {
  const Component = inline ? 'p' : 'span';
  return (
    <Component
      className={className}
      style={{
        fontSize: size === 'regular' ? 'var(--font-size)' : `var(--font-size-${size})`,
        fontWeight:
          weight === 'default'
            ? 'var(--font-weight)'
            : weight === 'bold'
              ? 'var(--font-weight-bold)'
              : 'var(--font-weight-semibold)',
        color: color === 'default' ? 'var(--text)' : `var(--text-${color})`,
        ...style,
      }}
    >
      {children}
    </Component>
  );
}
