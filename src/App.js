import Layout from './components/Layout/Layout';
import React, { useState, useEffect } from 'react';

const App = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  return (
    <div>
      {loading ? (
        <div className="loader-container">
            <div className="spinner"></div>
        </div>
      ) : (
        <div> <Layout/></div>)}
    </div>
);
}

export default App;
