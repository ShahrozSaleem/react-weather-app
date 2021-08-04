import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store";
import Home from "./index";

test('should test Home page existence', () => {

    const { queryByTestId } = render(
        <Provider store={appStore}>
            <Home />
        </Provider>
    );

    expect(queryByTestId("home-test")).toBeTruthy();

});
