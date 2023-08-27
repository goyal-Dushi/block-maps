import React from "react";
import { useRouteError } from "react-router-dom";

interface ErrorProps {}
type Any = any;

const ErrorPageURL: React.FC<ErrorProps> = () => {
    const error: Record<string, Any> = useRouteError() as Record<string, Any>;

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error?.statusText || error?.message}</i>
            </p>
        </div>
    );
}

export default ErrorPageURL;