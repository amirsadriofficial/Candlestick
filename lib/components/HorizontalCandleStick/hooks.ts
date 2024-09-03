import { useMemo } from "react";
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
  // calculate
  const rangeTotal = upperThreshold - lowerThreshold;
  // calculate
  const candleWidth = useMemo(() => {
    return (Math.abs(lastPrice - firstPrice) / rangeTotal) * 100;
  }, [lastPrice, firstPrice, rangeTotal]);
  // calculate
  const candleX = useMemo(() => {
    return (
      ((Math.min(lastPrice, firstPrice) - lowerThreshold) / rangeTotal) * 100
    );
  }, [lastPrice, firstPrice, lowerThreshold, rangeTotal]);
  // calculate
  const wickWidth = useMemo(() => {
    return ((highestPrice - lowestPrice) / rangeTotal) * 100;
  }, [highestPrice, lowestPrice, rangeTotal]);
  // calculate
  const wickX = useMemo(() => {
    return ((lowestPrice - lowerThreshold) / rangeTotal) * 100;
  }, [lowestPrice, lowerThreshold, rangeTotal]);
  // calculate
  const upPosition = useMemo(() => {
    return ((highestPrice - lowerThreshold) / rangeTotal) * 100;
  }, [highestPrice, lowerThreshold, rangeTotal]);
  // calculate
  const downPosition = useMemo(() => {
    return ((closingPrice - lowerThreshold) / rangeTotal) * 100;
  }, [closingPrice, lowerThreshold, rangeTotal]);
  // calculate
  const middlePosition = useMemo(() => {
    return ((prevDayPrice - lowerThreshold) / rangeTotal) * 100;
  }, [prevDayPrice, lowerThreshold, rangeTotal]);

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
