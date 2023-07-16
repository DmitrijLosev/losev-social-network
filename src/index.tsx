import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import SocialNetworkApp from "./App";

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(<SocialNetworkApp />);
}