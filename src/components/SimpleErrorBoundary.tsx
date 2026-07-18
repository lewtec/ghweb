import { Component, type ErrorInfo, type ReactNode } from 'react';
import { ErrorBanner } from './ErrorBanner';

type Props = { children: ReactNode };
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
        <div className="p-4">
          <ErrorBanner
            title="Something failed"
            detail={this.state.error.message}
            onRetry={() => this.setState({ error: null })}
          />
        </div>
      );
    }
    return this.props.children;
  }
}
