import { useCallback, type Ref } from 'react';

interface Props {
  onChange: (value: string) => void;
  value: string;
  ref?: Ref<HTMLInputElement>;
  className?: string;
  onSubmit?: () => void;
}

export type TextInputProps = Props;

export function TextInput({ value, onChange, ref, className, onSubmit }: TextInputProps) {
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit();
      }
    },
    [onSubmit]
  );

  return (
    <input
      ref={ref}
      type="text"
      value={value}
      onChange={ev => onChange(ev.target.value)}
      className={className}
      style={{
        fontSize: 'var(--font-size)',
        fontWeight: 'var(--font-weight)',
        color: 'var(--text)',
      }}
      onKeyDown={handleKeyDown}
    />
  );
}
