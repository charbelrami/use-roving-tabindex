import React from "react";
import ReactDom from "react-dom";
import { useRovingTabindex } from "./index";

function BasicExample() {
  const [compositeRef] = useRovingTabindex();

  return (
    <div ref={compositeRef}>
      <button>item 0</button>
      <button>item 1</button>
      <button>item 2</button>
    </div>
  );
}

function SelectorExample() {
  const [compositeRef] = useRovingTabindex({
    direction: "vertical",
    selector: ":scope > li > button",
  });

  return (
    <ul ref={compositeRef}>
      <li>
        <button>item 0</button>
      </li>
      <li>
        <button>item 1</button>
      </li>
      <li>
        <button>item 2</button>
      </li>
    </ul>
  );
}

function App() {
  return (
    <React.StrictMode>
      <BasicExample />
      <SelectorExample />
    </React.StrictMode>
  );
}

const root = document.getElementById("root");

ReactDom.render(<App />, root);
