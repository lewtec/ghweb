import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorBanner } from './ErrorBanner';
import { cn } from '@/lib/cls';

type Props = { children: ReactNode; className?: string };
type State = { error: Error | null };

export class SimpleErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div className={cn('p-4', this.props.className)}>
          <ErrorBanner
            title="Something failed"
            detail={this.state.error.message}
            onRetry={() => this.setState({ error: null })}
          />
        </div>
      );
    }
    // Wrapper preserves flex height chain (h-full / flex-1 min-h-0) for full-viewport pages
    return (
      <div className={cn('min-w-0', this.props.className)}>
        {this.props.children}
      </div>
    );
  }
}
