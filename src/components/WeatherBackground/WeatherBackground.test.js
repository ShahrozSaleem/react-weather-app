import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store";
import WeatherBackground from "./index";

test('should test WeatherBackground existence', () => {

    const { queryByTestId } = render(
        <Provider store={appStore}>
            <WeatherBackground />
        </Provider>
    );

    expect(queryByTestId("weather-bg-test")).toBeFalsy();

})
