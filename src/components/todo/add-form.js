import { useState } from "react";
import styles from "./todo.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function AddForm({ handleAdd }) {
  // 專門給文字輸入框用的狀態
  const [inputText, setInputText] = useState("");
  // 監聽中文輸入法的組字狀態 (關於文字輸入框的輸入法用的)
  const [isCompositing, setIsCompositing] = useState(false);

  return (
    <>
      {/* 新增待辦事項輸入框 */}
      <div>
        <div className={styles.add_title}> Add to list</div>
        <div className={styles.add_box}>
          <input
            type="text"
            className={styles.add_input}
            value={inputText}
            onChange={(e) => {
              setInputText(e.target.value);
            }}
            // 組字檢查
            onCompositionStart={() => {
              setIsCompositing(true);
            }}
            onCompositionEnd={() => {
              setIsCompositing(false);
            }}
            // 按下enter的事件
            onKeyDown={(e) => {
              // 按下enter鍵做加入
              if (e.key === "Enter" && !isCompositing) {
                // 按下enter鍵, 加入待辦清單中
                handleAdd(e.target.value);

                setTimeout(() => {
                  const listContainer =
                    document.getElementById("listContainer");
                  listContainer.scrollTop =
                    //   計算容器內容的總高度減去容器本身的可見的高度
                    listContainer.scrollHeight - listContainer.clientHeight;
                }, 40);

                // 清空文字輸入框
                setInputText("");
              }
            }}
          />
          <FontAwesomeIcon
            icon={faPlus}
            className={styles.add_btn}
            onClick={(e) => {
              handleAdd(inputText);

              setTimeout(() => {
                const listContainer = document.getElementById("listContainer");
                listContainer.scrollTop =
                  //   計算容器內容的總高度減去容器本身的可見的高度
                  listContainer.scrollHeight - listContainer.clientHeight;
              }, 40);
              setInputText("");
            }}
          />
        </div>
      </div>
    </>
  );
}
