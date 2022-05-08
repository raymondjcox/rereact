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
  let state: any[] = [];
  let global: {
    component?: () => VNode;
    instance?: VNode;
  } = {};
  let index = 0;

  return {
    render(component: () => VNode, container?: HTMLElement): void {
      index = 0;
      const instance = component();
      if (container) {
        patch(container, instance);
      } else {
        patch(global.instance, instance);
      }
      global.instance = instance;
      global.component = component;
    },

    useState<T>(initialState: T): [T, (newState: T) => void] {
      const currentState = state[index] || initialState;
      state[index] = currentState;

      const setState = (function () {
        let currentIndex = index;
        return function (newState: T) {
          state[currentIndex] = newState;
          ReReact.render(global.component);
        };
      })();

      index++;

      return [currentState, setState];
    },
  };
})();

const { useState } = ReReact;

function MyComponent({ name }): VNode {
  const [goodbye, setGoodbye] = useState(false);

  return (
    <div>
      <button on={{ click: () => setGoodbye(!goodbye) }}>
        {goodbye ? `Goodbye ${name}` : `Hello ${name}`}
      </button>
      <div>{goodbye ? `Goodbye ${name}` : `Hello ${name}`}</div>
      <MyOtherComponent />
    </div>
  );
}

function MyOtherComponent(): VNode {
  const [text, setText] = useState("THIS IS COOL");
  return <div on={{ click: () => setText("I clicked this") }}>{text}</div>;
}

const container = document.getElementById("container");

ReReact.render(() => <MyComponent name="RJ" />, container);
