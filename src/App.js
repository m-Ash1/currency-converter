import { useEffect, useState } from "react";

export default function App() {
  const [input, setInput] = useState(1);
  const [source, setSource] = useState("EUR");
  const [target, setTarget] = useState("USD");
  const [output, setOutput] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    async function convert() {
      if (source === target) {
        setOutput(() => input);
        return;
      }
      setIsLoading(true);
      const response = await fetch(
        `https://api.frankfurter.app/latest?amount=${input}&from=${source}&to=${target}`
      );
      const data = await response.json();
      setOutput(() => data.rates[target]);
      setIsLoading(false);
    }
    convert();
  }, [input, source, target]);
  return (
    <div>
      <input
        value={input}
        type="text"
        onChange={(e) => setInput(e.target.value)}
      />
      <select value={source} onChange={(e) => setSource(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      <select value={target} onChange={(e) => setTarget(e.target.value)}>
        <option value="USD">USD</option>
        <option value="EUR">EUR</option>
        <option value="CAD">CAD</option>
        <option value="INR">INR</option>
      </select>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {output} {target}
        </p>
      )}
    </div>
  );
}
