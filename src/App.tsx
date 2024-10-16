import { ErrorBoundary, useErrorBoundary } from "react-error-boundary";
import useManualErrorHandling from "@ptolemy2002/react-manual-error-handling";

function errorDelay(ms: number): Promise<never> {
    return new Promise((_, reject) => {
        setTimeout(() => reject(new Error("Random error")), ms);
    });
}

function App() {
    return (
      <div className="App">
        <ErrorBoundary fallback={<ErrorNotice />}>
            <Main />
        </ErrorBoundary>
      </div>
    );
}

export default App;

function Main() {
    const [_try] = useManualErrorHandling<never>();
    const handleClick = () => _try(() => errorDelay(1000));

    return (
        <button onClick={handleClick}>Click to throw an error after 1 second</button>
    );
}

function ErrorNotice() {
    const {resetBoundary} = useErrorBoundary();
  
    return (
        <div className="alert alert-danger">
            <p>An error occurred.</p>
            <button onClick={resetBoundary}>Try again</button>
        </div>
    );
}