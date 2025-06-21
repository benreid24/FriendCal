import type { PropsWithChildren, ReactNode } from 'react';
import { ButtonGhost } from './ButtonGhost';
import CloseIcon from '../icons/CloseIcon';

interface Props {
  open: boolean;
  onRequestClose: () => void;
}

type ModalProps = PropsWithChildren<Props>;

function ModalRoot({ children, open, onRequestClose }: ModalProps) {
  if (!open) {
    return null;
  }
  return (
    <>
      <div className="modal-backdrop" onClick={onRequestClose}>
        <div className="modal" onClick={e => e.stopPropagation()}>
          <div className="close-button-container-wrapper">
            <div className="close-button-container">
              <ButtonGhost onClick={onRequestClose}>
                <CloseIcon size={24} />
              </ButtonGhost>
            </div>
          </div>
          {children}
        </div>
      </div>
      <style jsx>{`
        .modal-backdrop {
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        .modal {
          min-width: 488px;
          background-color: var(--background-accent);
          border-radius: 16px;
          padding: 24px;
          border: 2px solid var(--border);
          box-shadow: 0px 0px 10px 2px var(--border);
          display: flex;
          flex-direction: column;
          align-items: left;
          justify-content: flex-start;
        }
        .close-button-container-wrapper {
          position: relative;
        }
        .close-button-container {
          position: absolute;
          right: -4px;
          top: -4px;
        }
      `}</style>
    </>
  );
}

function ModalTitle({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="modal-title">{children}</div>
      <style jsx>{`
        .modal-title {
          font-size: var(--font-size-large);
          font-weight: var(--font-weight-semibold);
          margin-top: -8px;
          margin-bottom: 8px;
          max-width: 85%;
          text-overflow: ellipsis;
          overflow: hidden;
          text-wrap: nowrap;
        }
      `}</style>
    </>
  );
}

function ModalContent({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="modal-content">{children}</div>
      <style jsx>{`
        .modal-content {
          flex-grow: 1;
          margin-bottom: 8px;
          max-height: 300px;
          overflow: auto;
        }
      `}</style>
    </>
  );
}

function ModalActions({ children }: { children: ReactNode }) {
  return (
    <>
      <div className="modal-actions">{children}</div>
      <style jsx>{`
        .modal-actions {
          display: flex;
          flex-direction: row;
          justify-content: flex-end;
          align-items: center;
          gap: 8px;
          margin-top: 4px;
          margin-bottom: -8px;
        }
      `}</style>
    </>
  );
}

const Modal = Object.assign(ModalRoot, {
  Title: ModalTitle,
  Content: ModalContent,
  Actions: ModalActions,
});

export default Modal;
