import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store";
import Slider from "./index";

test('should test Slider existence', () => {

    const { queryByTestId } = render(
        <Provider store={appStore}>
            <Slider />
        </Provider>
    );

    expect(queryByTestId("slider-test")).toBeTruthy();

})
