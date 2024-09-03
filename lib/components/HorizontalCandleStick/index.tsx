import { useState } from "react";
import { HorizontalCandleStickProps } from "./types";
import usePriceCalculations from "./hooks";
import styles from "./styles.module.css";

export function HorizontalCandleStick({
  firstPrice,
  lastPrice,
  highestPrice,
  lowestPrice,
  upperThreshold,
  lowerThreshold,
  closingPrice,
  prevDayPrice,
}: HorizontalCandleStickProps) {
  const [hoverValue, setHoverValue] = useState<number | null>(null);
  const [percentageValue, setPercentageValue] = useState<number | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const {
    rangeTotal,
    candleWidth,
    candleX,
    wickWidth,
    wickX,
    upPosition,
    downPosition,
  } = usePriceCalculations({
    firstPrice,
    lastPrice,
    highestPrice,
    lowestPrice,
    upperThreshold,
    lowerThreshold,
    closingPrice,
    prevDayPrice,
  });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const value = Math.round((x / rect.width) * rangeTotal + lowerThreshold);
    const percentageValue: number | string =
      ((value - prevDayPrice) / prevDayPrice) * 100;
    setHoverValue(value);
    setPercentageValue(percentageValue);
    setTooltipPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };
  const handleMouseLeave = () => {
    setHoverValue(null);
    setPercentageValue(null);
  };
  console.log("position", upPosition, downPosition);

  return (
    <div className={styles.container}>
      <div
        className={styles.candle_container}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* DESC: Candle body */}
        <div
          style={{
            width: `${candleWidth}%`,
            left: `${candleX}%`,
            backgroundColor: lastPrice > firstPrice ? "green" : "red",
          }}
          className={styles.candle_body}
        />
        {/* DESC: Candle shadow: wick and tail */}
        <div
          style={{
            width: `${wickWidth}%`,
            left: `${wickX > 0 ? wickX : 0}%`,
            backgroundColor: lastPrice > firstPrice ? "green" : "red",
          }}
          className={styles.candle_shadow}
        />
      </div>
      {/* DESC: Middle line */}
      <div className={styles.container_middle_line} />
      {/* DESC: Hover */}
      {hoverValue !== null && percentageValue !== null && (
        <div
          dir="ltr"
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 30}px`,
          }}
          className={styles.tooltip}
        >
          <p
            style={{
              color: `${percentageValue < 0 ? "red" : "green"}`,
            }}
          >
            ({percentageValue?.toFixed(2)}%)
          </p>
          <p>{hoverValue}</p>
        </div>
      )}
    </div>
  );
}
