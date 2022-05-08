import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  jsx,
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

function render() {}

const ReReact = (function () {
  let state;

  return {
    useState<T>(initialState: T): [T, (newState: T) => void] {
      state = state || initialState;
      function setState(newState: T) {
        state = newState;
        patch(cur, <MyComponent name="RJ" />);
      }

      return [state, setState];
    },
  };
})();

const { useState } = ReReact;
let cur = <MyComponent name="RJ" />;

function MyComponent({ name }) {
  const [goodbye, setGoodbye] = useState(false);

  return (
    <div>
      <button on={{ click: () => setGoodbye(true) }}>Goodbye</button>
      <div>
        {goodbye ? "Goodbye" : "Hello"} {name}
      </div>
    </div>
  );
}

const container = document.getElementById("container");
patch(container, cur);
