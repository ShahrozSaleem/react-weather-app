import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import appStore from "../../store";
import WeatherReport from "./index";

test('should test daily-weather report (chart) existence', () => {

    const { queryByTestId } = render(
        <Provider store={appStore}>
            <WeatherReport />
        </Provider>
    );

    expect(queryByTestId("weather-report-test")).toBeTruthy();

})
