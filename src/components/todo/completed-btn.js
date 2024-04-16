import styles from "./todo.module.css";
export default function CompletedBtn({ handleSort, sort }) {
  return (
    <>
      <div className={styles.done_sec}>
        <label className={styles.done_box}>
          <span className={styles.done_text}>Move done things to end?</span>
          <input
            type="checkbox"
            className={styles.checkbox}
            checked={sort}
            onChange={handleSort}
          />
          <span className={styles.btnbox}>
            <span className={styles.btn}></span>
          </span>
        </label>
      </div>
    </>
  );
}
