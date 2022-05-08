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

function MyComponent({ name }) {
  const time = new Date().getTime();

  return (
    <div>
      Hello {name} the time is {time}
    </div>
  );
}
const container = document.getElementById("container");
render(container, <MyComponent name="RJ" />);
