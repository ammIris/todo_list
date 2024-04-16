import React from "react";
import { useState, useEffect } from "react";
import styles from "../todo.module.css";

export default function EditForm({
  id = 0,
  text = "",
  completed = false,
  handleSave = () => {},
}) {
  // 文字輸入框用的狀態
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (text) {
      setInputText(text);
    }
  }, [text]);
  return (
    <>
      <li className={styles.list}>
        <div>
          <input type="checkbox" className={styles.check_box} />
          <input
            className={styles.edit_list}
            type="text"
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            // 按下Enter, 儲存編輯的文字
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSave(id, inputText);
              }
            }}
            autoFocus
          />
        </div>
      </li>
    </>
  );
}
