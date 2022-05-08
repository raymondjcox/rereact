import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  jsx,
  VNode,
} from "snabbdom";

const patch = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

const ReReact = (function () {
  let state: any;
  let global: {
    component?: () => VNode;
    instance?: VNode;
  } = {};

  return {
    setup(container: HTMLElement, component: () => VNode): void {
      global.component = component;
      global.instance = component();
      patch(container, global.instance);
    },

    render(component: () => VNode): void {
      const newInstance = component();
      patch(global.instance, newInstance);
      global.instance = newInstance;
    },

    useState<T>(initialState: T): [T, (newState: T) => void] {
      state = state || initialState;

      function setState(newState: T) {
        state = newState;
        ReReact.render(global.component);
      }

      return [state, setState];
    },
  };
})();

const { useState } = ReReact;

function MyComponent(): VNode {
  const [goodbye, setGoodbye] = useState(false);

  return (
    <div>
      <button on={{ click: () => setGoodbye(!goodbye) }}>
        {goodbye ? "Goodbye" : "Hello"}
      </button>
      <div>{goodbye ? "Goodbye" : "Hello"}</div>
    </div>
  );
}

const container = document.getElementById("container");

ReReact.setup(container, MyComponent);
