import React, { useState, useRef, useEffect, useCallback, type CSSProperties } from 'react';
import { ButtonGhost } from './ButtonGhost';

export interface DropdownItem {
  key: string;
  disabled?: boolean;
  element: string | React.ReactNode;
}

interface DropdownProps {
  items: DropdownItem[];
  trigger: React.ReactNode;
  onSelect?: (key: string) => void;
  className?: string;
  menuClassName?: string;
  itemClassName?: string;
  disabledItemClassName?: string;
  closeOnSelect?: boolean;
  dropdownStyle?: CSSProperties;
}

export const Dropdown: React.FC<DropdownProps> = ({
  items,
  trigger,
  onSelect,
  className = '',
  menuClassName = '',
  itemClassName = '',
  disabledItemClassName = '',
  closeOnSelect = true,
  dropdownStyle,
}) => {
  const [open, setOpen] = useState(false);
  const triggerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [menuStyles, setMenuStyles] = useState<React.CSSProperties>({});

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, dropdownRef]);

  useEffect(() => {
    if (open && triggerRef.current && dropdownRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();

      setMenuStyles({
        position: 'absolute',
        top: triggerRect.bottom,
        left: triggerRect.left,
        zIndex: 1000,
      });
    }
  }, [open]);

  const handleSelect = useCallback(
    (item: DropdownItem) => {
      if (!item.disabled) {
        onSelect?.(item.key);
        if (closeOnSelect) {
          setOpen(false);
        }
      }
    },
    [onSelect, closeOnSelect, setOpen]
  );

  return (
    <>
      <div className={`${className}`} ref={triggerRef}>
        <div onClick={() => setOpen(prev => !prev)}>{trigger}</div>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className={`dropdown-container ${menuClassName}`}
          style={{ ...menuStyles, ...dropdownStyle }}
        >
          {items.map(item => (
            <div
              key={item.key}
              onClick={() => handleSelect(item)}
              className={`${item.disabled ? disabledItemClassName : itemClassName}`}
            >
              {typeof item.element === 'string' ? (
                <ButtonGhost disabled={item.disabled}>{item.element}</ButtonGhost>
              ) : (
                item.element
              )}
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .dropdown-container {
          background-color: var(--background);
          padding: 8px;
          border-radius: 8px;
          box-shadow: 0px 0px 10px 2px var(--border);
          border: 1px solid var(--border);
          overflow: auto;
        }
      `}</style>
    </>
  );
};
