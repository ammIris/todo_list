import styles from "../todo.module.css";
import Item from "./item";
import EditForm from "./edit-form";
// todos=[], 若傳入的物件中沒有 todos 屬性，則 todos 會是默認值『空陣列』
export default function List({ todos = [], ...otherProps }) {
  return (
    <>
      {/* 待辦清單 */}
      <form className={styles.form} id="listContainer">
        {/* 待辦清單內容 */}
        <ul className={styles.list_all}>
          {todos.map((v, i) => {
            const { id, text, completed, editing } = v;

            return editing ? (
              <EditForm
                key={id}
                id={id}
                text={text}
                completed={completed}
                editing={editing}
                {...otherProps}
              />
            ) : (
              <Item
                key={id}
                id={id}
                text={text}
                completed={completed}
                editing={editing}
                {...otherProps}
              />
            );
          })}
        </ul>
      </form>
    </>
  );
}
