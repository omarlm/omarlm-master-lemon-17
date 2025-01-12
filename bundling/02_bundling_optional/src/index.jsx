import React from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
    const apiUrl = process.env.REACT_APP_API_URL || 'No API URL';
    const environment = process.env.REACT_APP_ENVIRONMENT || 'Unknown';

    return (
        <div>
            <h1>Hello World!</h1>
            <p>API URL: {apiUrl}</p>
            <p>Current Environment: {environment}</p>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
