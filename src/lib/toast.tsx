import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

export type ToastKind = 'error' | 'info' | 'success';

export type Toast = {
  id: number;
  kind: ToastKind;
  title: string;
  detail?: string;
};

type ToastApi = {
  toasts: Toast[];
  push: (t: Omit<Toast, 'id'>) => void;
  dismiss: (id: number) => void;
  error: (title: string, detail?: string) => void;
  info: (title: string, detail?: string) => void;
};

const ToastContext = createContext<ToastApi | null>(null);

let nextId = 1;

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((t) => t.filter((x) => x.id !== id));
  }, []);

  const push = useCallback(
    (t: Omit<Toast, 'id'>) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { ...t, id }]);
      window.setTimeout(() => dismiss(id), 8000);
    },
    [dismiss],
  );

  const api = useMemo<ToastApi>(
    () => ({
      toasts,
      push,
      dismiss,
      error: (title, detail) => push({ kind: 'error', title, detail }),
      info: (title, detail) => push({ kind: 'info', title, detail }),
    }),
    [toasts, push, dismiss],
  );

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="toast toast-end toast-bottom z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`alert max-w-md shadow-lg ${
              t.kind === 'error'
                ? 'alert-error'
                : t.kind === 'success'
                  ? 'alert-success'
                  : 'alert-info'
            }`}
          >
            <div className="min-w-0">
              <div className="font-medium">{t.title}</div>
              {t.detail ? (
                <div className="text-sm opacity-90 whitespace-pre-wrap break-words">
                  {t.detail}
                </div>
              ) : null}
            </div>
            <button
              type="button"
              className="btn btn-sm btn-ghost"
              onClick={() => dismiss(t.id)}
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastApi {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast outside ToastProvider');
  return ctx;
}
