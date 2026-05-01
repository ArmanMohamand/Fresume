import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 bg-red-200 text-red-800 rounded">
          Something went wrong while loading candidate details.
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
