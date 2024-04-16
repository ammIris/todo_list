import React from "react";
import { useState, useEffect } from "react";
import styles from "./todo.module.css";
import AddForm from "./add-form";
import List from "./list/index";
import CompletedBtn from "./completed-btn";
export default function TodoIndex() {
  // 代辦事項狀態
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "Reading: before the coffee gets cold",
      completed: true,
      editing: false,
    },
    {
      id: 2,
      text: "BSS",
      completed: false,
      editing: false,
    },
  ]);

  // 勾選框, 改變狀態 --> completed: true/false
  const toggleCompleted = (todos, id) => {
    return todos.map((v) => {
      if (v.id === id) return { ...v, completed: !v.completed };
      else return { ...v };
    });
  };
  const handleToggleCompleted = (id) => {
    setTodos(toggleCompleted(todos, id));
  };

  // 刪除功能
  const remove = (todos, id) => {
    return todos.filter((v) => v.id !== id);
  };
  const handleRemove = (id) => {
    setTodos(remove(todos, id));
  };

  // 新增todo功能
  const add = (todos, text) => {
    const newTodo = { id: Date.now(), text, completed: false, editing: false };
    return [...todos, newTodo];
  };
  const handleAdd = (text) => {
    setTodos(add(todos, text));
  };

  // Move done things - btn
  const [sort, setSort] = useState(false);
  const sortTodo = (todos) => {
    const uncompletedTodos = todos.filter((v) => !v.completed);
    const completedTodos = todos.filter((v) => v.completed);
    const origin = todos.slice().sort((a, b) => a.id - b.id);
    return sort ? [...uncompletedTodos, ...completedTodos] : origin;
  };
  const handleSort = () => {
    setSort((sort) => !sort);
  };

  useEffect(() => {
    setTodos(sortTodo(todos));
  }, [sort]);

  // ----------- 進度條 -----------
  // 計算總代辦事項
  const totalCount = todos.length;
  // 計算已完成事項
  const completedCount = todos.filter((v) => {
    return v.completed;
  }).length;
  // 計算待完成事項
  const progress =
    totalCount === 0 ? 0 : Math.floor((completedCount / totalCount) * 100);

  // ----------- 編輯功能 -----------
  // edit - 處理狀態改變
  const toggleEditing = (todos, id) => {
    return todos.map((v, i) => {
      if (v.id === id) return { ...v, editing: !v.editing };
      // 此時其他id的編輯狀態都要是false
      else return { ...v, editing: false };
    });
  };
  const handleToggleEditing = (id) => {
    setTodos(toggleEditing(todos, id));
  };

  //edit - 處理文字修改
  const updateText = (todos, id, text) => {
    return todos.map((v) => {
      //修改文字 + 關閉編輯狀態，恢復未編輯狀態
      if (v.id === id) return { ...v, text: text, editing: false };
      else return { ...v };
    });
  };
  // 輸入框編輯完畢的儲存
  const handleSave = (id, text) => {
    setTodos(updateText(todos, id, text));
  };

  return (
    <>
      <div className={styles.app}>
        <div className={styles.container}>
          {/* 包在一起 */}
          <div className={styles.sec1}>
            {/* 標題 */}
            <div className={styles.title_box}>
              <h1 className={styles.title}>Todo List</h1>
              <p className={styles.sub_title}>Add things to do</p>
            </div>

            {/* 進度條 */}
            <div className={styles.progress_container}>
              <span className={styles.progress_percent}>{progress}%</span>
              <progress
                value={progress}
                max={100}
                className={styles.progress_bar}
              ></progress>
            </div>

            {/* 待辦清單 */}
            <List
              todos={todos}
              handleToggleCompleted={handleToggleCompleted}
              handleRemove={handleRemove}
              handleToggleEditing={handleToggleEditing}
              handleSave={handleSave}
            />

            {/* completed btn */}
            <CompletedBtn handleSort={handleSort} sort={sort} />
          </div>

          {/* 新增待辦事項入框 */}
          <AddForm handleAdd={handleAdd} />
        </div>
      </div>
    </>
  );
}
