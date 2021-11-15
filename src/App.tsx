import { useState } from "react";
import Reports from "./pages/reports";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <header className="App-header">
        <Reports />
      </header>
    </div>
  );
}

export default App;
