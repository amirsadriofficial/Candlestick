import styles from "./styles.module.css";

export function HorizontalCandleStick(
  props: React.HTMLAttributes<HTMLElement>
) {
  const { className, ...restProps } = props;
  return (
    <div className={`${className} ${styles.container}`} {...restProps}>
      Hello Horizontal
    </div>
  );
}
