import { useCallback, useMemo, useState } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { RouterProvider } from '@tanstack/react-router';
import { LoginScreen } from '@/components/LoginScreen';
import { ToastProvider } from '@/lib/toast';
import { hasToken } from '@/lib/auth';
import { createRelayEnvironment } from '@/relay/environment';
import { router } from '@/router';

export function App() {
  const [authed, setAuthed] = useState(() => hasToken());
  const environment = useMemo(
    () => (authed ? createRelayEnvironment() : null),
    [authed],
  );

  const onSignedIn = useCallback(() => {
    setAuthed(true);
  }, []);

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
