import React from "react";
import styles from "../todo.module.css";

export default function Item({
  id = 0,
  completed = false,
  text = "",
  handleRemove = () => {},
  handleToggleCompleted = () => {},
  handleToggleEditing = () => {},
}) {
  return (
    <>
      <li className={styles.list}>
        <div>
          <input
            type="checkbox"
            className={styles.check_box}
            checked={completed}
            onChange={() => {
              handleToggleCompleted(id);
            }}
          />
          <span
            className={completed ? styles.completed : text}
            // 編輯功能 : 改變editing狀態並設回todos
            onDoubleClick={() => {
              handleToggleEditing(id);
            }}
          >
            {text}
          </span>
        </div>

        {/* 刪除功能 */}
        <button
          className={styles.delete_btn}
          onClick={() => {
            handleRemove(id);
          }}
        >
          x
        </button>
      </li>
    </>
  );
}
