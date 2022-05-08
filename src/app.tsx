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

const container = document.getElementById("container");
const v1 = (
  <div style={{ cursor: "pointer" }} on={{ click: () => patch(v1, v2) }}>
    Hello world!
  </div>
);
const v2 = (
  <div>
    Goodbye <b>cruel</b> <i>world!</i>
  </div>
);

patch(container, v1);
