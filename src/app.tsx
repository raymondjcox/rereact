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

const ReReact = (function () {
  let state;

  return {
    useState<T>(initialState: T): [T, (newState: T) => void] {
      state = state || initialState;
      function setState(newState: T) {
        state = newState;
        const newCur = <MyComponent name="RJ" />;
        patch(cur, newCur);
        cur = newCur;
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
      <button on={{ click: () => setGoodbye(!goodbye) }}>
        {goodbye ? "Goodbye" : "Hello"}
      </button>
      <div>
        {goodbye ? "Goodbye" : "Hello"} {name}
      </div>
    </div>
  );
}

const container = document.getElementById("container");
patch(container, cur);
