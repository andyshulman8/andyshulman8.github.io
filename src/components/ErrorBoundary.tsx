import { Component } from "react";
import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * ErrorBoundary
 *
 * Catches runtime errors in the component tree and prevents white-screen crashes.
 * Displays a calm fallback UI with recovery suggestions.
 * This is a resilience layer that keeps the app usable even when something goes wrong.
 */
export class ErrorBoundary extends Component<Props, State> {
  private errorHandler: ((event: ErrorEvent) => void) | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so next render shows the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    // Log error details to console for debugging
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  componentDidMount() {
    // Attach global error handler to catch runtime errors outside component tree
    this.errorHandler = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error, event.message);
    };
    window.addEventListener("error", this.errorHandler);
  }

  componentWillUnmount() {
    // Remove the error handler to prevent duplicates in StrictMode
    if (this.errorHandler) {
      window.removeEventListener("error", this.errorHandler);
      this.errorHandler = null;
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="max-w-md text-center px-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Don&apos;t worry—this is usually temporary.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-medium transition-colors"
            >
              Refresh page
            </button>
            <p className="text-xs text-gray-500 mt-6">
              If the problem persists, please clear your cache and try again.
            </p>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
