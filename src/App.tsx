import { useCallback, useEffect, useMemo, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RouterProvider } from '@tanstack/react-router';
import { LoginScreen } from '@/components/LoginScreen';
import { ToastProvider } from '@/lib/toast';
import { finishMigrationIfNeeded, hasToken } from '@/lib/auth';
import { createRelayEnvironment } from '@/relay/environment';
import { router } from '@/router';

export function App() {
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    void finishMigrationIfNeeded().finally(() => {
      setAuthed(hasToken());
      setReady(true);
    });
  }, []);

  const environment = useMemo(
    () => (authed ? createRelayEnvironment() : null),
    [authed],
  );

  const onSignedIn = useCallback(() => {
    setAuthed(true);
  }, []);

  if (!ready) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-base-200 text-sm opacity-60">
        Loading…
      </div>
    );
  }

  if (!authed || !environment) {
    return (
      <ToastProvider>
        <LoginScreen onSignedIn={onSignedIn} />
      </ToastProvider>
    );
  }

  return (
    <RelayEnvironmentProvider environment={environment}>
      <ToastProvider>
        <RouterProvider router={router} />
      </ToastProvider>
    </RelayEnvironmentProvider>
  );
}
