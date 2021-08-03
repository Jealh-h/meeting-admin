import { init } from "@rematch/core";
import * as models from "./models";
import loadingPlugin from "@rematch/loading";
const store = init({
  models,
  plugins: [loadingPlugin()],
});
export default store;
