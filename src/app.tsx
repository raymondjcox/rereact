import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  jsx,
} from "snabbdom";

const render = init([
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
]);

function useState<T>(initialState: T): [T, (newState: T) => void] {
  let state = initialState;
  let setState = (newState: T) => {
    state = newState;
  };

  return [state, setState];
}

function MyComponent({ name }) {
  const time = new Date().getTime();
  const [goodbye, setGoodbye] = useState(false);

  return (
    <div>
      <button on={{ click: () => setGoodbye(true) }}>Goodbye</button>
      <div>
        {goodbye ? "Goodbye" : "Hello"} {name} the time is {time}
      </div>
    </div>
  );
}

const container = document.getElementById("container");
render(container, <MyComponent name="RJ" />);
