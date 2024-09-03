import "./App.css";
import { HorizontalCandleStick } from "../lib/main";
// import { VerticalCandleStick } from "../lib/main";

function App() {
  return (
    <div style={{ padding: "16px" }}>
      <HorizontalCandleStick
        firstPrice={150.00}
        lastPrice={160.00}
        highestPrice={162.00}
        lowestPrice={145.00}
        upperThreshold={165.00}
        lowerThreshold={140.00}
        closingPrice={155.00}
        prevDayPrice={148.00}
      />
      {/* <VerticalCandleStick /> */}
    </div>
  );
}

export default App;
