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
 * Captures unhandled promise rejections for better diagnostics.
 */
export class ErrorBoundary extends Component<Props, State> {
  private errorHandler: ((event: ErrorEvent) => void) | null = null;
  private rejectionHandler: ((event: PromiseRejectionEvent) => void) | null = null;

  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: { componentStack: string }) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
    this.reportError(error);
  }

  componentDidMount() {
    // Global runtime errors
    this.errorHandler = (event: ErrorEvent) => {
      console.error("Global error caught:", event.error, event.message);
      this.reportError(event.error || new Error(event.message));
    };
    window.addEventListener("error", this.errorHandler);

    // Unhandled promise rejections
    this.rejectionHandler = (event: PromiseRejectionEvent) => {
      console.error("Unhandled promise rejection:", event.reason);
      this.reportError(
        event.reason instanceof Error
          ? event.reason
          : new Error(String(event.reason))
      );
    };
    window.addEventListener("unhandledrejection", this.rejectionHandler);
  }

  componentWillUnmount() {
    if (this.errorHandler) {
      window.removeEventListener("error", this.errorHandler);
      this.errorHandler = null;
    }
    if (this.rejectionHandler) {
      window.removeEventListener("unhandledrejection", this.rejectionHandler);
      this.rejectionHandler = null;
    }
  }

  /**
   * Report an error to a monitoring service.
   * Replace the console.info with Sentry, LogRocket, or your server endpoint.
   */
  private reportError(error: Error) {
    // Include route context
    const routeContext = window.location.pathname;

    // Send to backend endpoint
    fetch("/api/log-error", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: error.message,
        stack: error.stack,
        route: routeContext,
        timestamp: new Date().toISOString(),
      }),
    }).catch((fetchError) => {
      console.error("Failed to report error:", fetchError);
    });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-black text-white">
          <div className="max-w-md text-center px-6">
            <div className="text-6xl mb-4">⚠️</div>
            <h1 className="text-2xl font-bold mb-2">Something went wrong</h1>
            <p className="text-gray-300 mb-6">
              We encountered an unexpected error. Don&apos;t worry—this is usually
              temporary.
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
