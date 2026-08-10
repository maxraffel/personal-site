import styles from "./Tooltip.module.css";

type TooltipProps = {
  content: string;
};

export function Tooltip({ content }: TooltipProps) {
  return (
    <span className={styles.root}>
      <span className={styles.icon} aria-label="More info" tabIndex={0}>
        ?
      </span>
      <span className={styles.tip} role="tooltip">
        {content}
      </span>
    </span>
  );
}
