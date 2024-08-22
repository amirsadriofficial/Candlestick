import styles from "./styles.module.css";

export function VerticalCandleStick(props: React.HTMLAttributes<HTMLElement>) {
  const { className, ...restProps } = props;
  return (
    <div className={`${className} ${styles.container}`} {...restProps}>
      Hello Vertical
    </div>
  );
}
