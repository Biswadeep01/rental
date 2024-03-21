import React, { useState, useEffect } from "react";
import Router from "./routes";
import { useAppStore } from "./store";

const App = () => {
  const { fetchCars } = useAppStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCars();
  }, [fetchCars]);

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
          <span class="loader"></span>
        </div>
      ) : (
        <Router />
      )}
    </div>
  );
};

export default App;
