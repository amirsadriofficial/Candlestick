import { useState } from "react";
import { HorizontalCandleStickProps } from "./types";
import usePriceCalculations from "./hooks";
// import DynamicTooltip from '../customize-tooltip';

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
    middlePosition,
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
    const value = Math.round(
      (x / rect.width) * rangeTotal + lowerThreshold
    );
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
  console.log("candleX", wickWidth, wickX);

  return (
    <div
      style={{
        height: "2.5rem",
        position: "relative",
        zIndex: 1000,
        width: 1000,
      }}
    >
      <div
        style={{
          position: "relative",
          height: "0.125rem",
          border: `0.0625rem solid #ddd`,
          background: "lightgray",
          margin: "1.25rem 0",
          cursor: "pointer",
          zIndex: 1200,
          // overflow: "hidden",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* candle body */}
        <div
          style={{
            top: "50%",
            width: `${candleWidth}%`,
            left: `${candleX}%`,
            transform: "translateY(-50%)",
            backgroundColor: lastPrice > firstPrice ? "green" : "red",
            position: "absolute",
            borderRadius: "0.625rem",
            height: "16px",
            zIndex: 1400,
            transition: "width 0.5s ease, left 0.5s ease",
          }}
        />
        {/* candle dome */}
        <div
          style={{
            position: "absolute",
            top: "50%",
            height: "0.5rem",
            borderRadius: "0.625rem",
            width: `${wickWidth}%`,
            left: `${wickX > 0 ? wickX : 0}%`,
            transform: "translateY(-50%)",
            backgroundColor: lastPrice > firstPrice ? "green" : "red",
            zIndex: 1900,
            transition: "width 0.5s ease, left 0.5s ease",
          }}
        />
      </div>
      {/* Middle Line */}
      <div
        style={{
          width: "0.0625rem",
          borderLeft: `0.0625rem dashed #000`,
          height: "80%",
          position: "absolute",
          transform: ` translateX(-50%)`,
          top: "20%",
          left: `${middlePosition}%`,
          transformOrigin: "center center",
        }}
      />
      {/* Hover */}
      {hoverValue !== null && percentageValue !== null && (
        <div
          style={{
            left: `${tooltipPosition.x}px`,
            top: `${tooltipPosition.y - 30}px`,
            position: "absolute",
            background: "#999",
            padding: "0.1875rem 0.4375rem",
            borderRadius: "0.4375rem",
            color: "black",
            display: "flex",
            gap: "0.3125rem",
            zIndex: 30000,
          }}
        >
          <p
            style={{
              fontSize: "0.875rem",
              direction: "ltr",
              color: `${percentageValue < 0 ? "red" : "green"}`,
            }}
          >
            ({percentageValue.toFixed(2)}%)
          </p>
          <p style={{ fontSize: "0.875rem" }}>{hoverValue}</p>
        </div>
      )}
      {/* <DynamicTooltip
        title={`اخرین: ${LastTradePrice}`}
        position={upPosition}
        iconName={'chevron-down-full'}
        placement="top"
      />
      <DynamicTooltip
        title={`پایانی: ${data.downPointer}`}
        position={downPosition}
        iconName={'chevron-down-full'}
        placement="bottom"
        rotate={true}
      /> */}
    </div>
  );
}

// import styles from "./styles.module.css";
// export function HorizontalCandleStick(
//   props: React.HTMLAttributes<HTMLElement>
// ) {
//   const { className, ...restProps } = props;
//   return (
//     <div className={`${className} ${styles.container}`} {...restProps}>
//       Hello Horizontal
//     </div>
//   );
// }
