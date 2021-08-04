import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "./store";
import App from "./App";

test('should test App existence', () => {

  const { queryByTestId } = render(
    <Provider store={appStore}>
      <App />
    </Provider>
  );

  expect(queryByTestId("app-test")).toBeTruthy();

});
