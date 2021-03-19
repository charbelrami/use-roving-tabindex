# use-roving-tabindex

> Roving tabindex as a tiny (601B) react hook

## Examples

[codesandbox](https://codesandbox.io/s/use-roving-tabindex-examples-oh058?file=/src/index.js)

## Installation

```bash
npm install use-roving-tabindex
```

## Usage

```js
import { useRovingTabindex } from "use-roving-tabindex";
```

```js
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
```
