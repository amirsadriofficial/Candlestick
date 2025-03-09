import { useMemo, useCallback } from "react";
import { HorizontalCandleStickProps } from "./types";

const usePriceCalculations = ({
  firstPrice,
  lastPrice,
  highestPrice,
  lowestPrice,
  upperThreshold,
  lowerThreshold,
  closingPrice,
  prevDayPrice,
}: HorizontalCandleStickProps) => {
  // Calculate the total price range allowed for changes
  const rangeTotal = upperThreshold - lowerThreshold;

  // Memoized percentage calculation function
  const calculatePercentage = useCallback(
    (value: number) => (value / rangeTotal) * 100,
    [rangeTotal]
  );

  // Calculate the candle body width as a percentage of the total range
  const candleWidth = useMemo(
    () => calculatePercentage(Math.abs(lastPrice - firstPrice)),
    [lastPrice, firstPrice, calculatePercentage]
  );

  // Calculate the X position of the candle body (starting point)
  const candleX = useMemo(
    () => calculatePercentage(Math.min(lastPrice, firstPrice) - lowerThreshold),
    [lastPrice, firstPrice, lowerThreshold, calculatePercentage]
  );

  // Calculate the total width of the candle including the wicks
  const wickWidth = useMemo(
    () => calculatePercentage(highestPrice - lowestPrice),
    [highestPrice, lowestPrice, calculatePercentage]
  );

  // Calculate the X position of the lowest point (starting point of the wick)
  const wickX = useMemo(
    () => calculatePercentage(lowestPrice - lowerThreshold),
    [lowestPrice, lowerThreshold, calculatePercentage]
  );

  // Calculate the tooltip position for the highest price (top of the wick)
  const upPosition = useMemo(
    () => calculatePercentage(highestPrice - lowerThreshold),
    [highestPrice, lowerThreshold, calculatePercentage]
  );

  // Calculate the tooltip position for the closing price (bottom of the candle)
  const downPosition = useMemo(
    () => calculatePercentage(closingPrice - lowerThreshold),
    [closingPrice, lowerThreshold, calculatePercentage]
  );

  // Calculate the middle line to determine the range of changes
  const middlePosition = useMemo(
    () => calculatePercentage(prevDayPrice - lowerThreshold),
    [prevDayPrice, lowerThreshold, calculatePercentage]
  );

  return {
    rangeTotal,
    candleWidth,
    candleX,
    wickWidth,
    wickX,
    upPosition,
    downPosition,
    middlePosition,
  };
};

export default usePriceCalculations;
