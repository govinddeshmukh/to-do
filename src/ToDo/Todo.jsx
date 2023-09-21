import React, { useEffect, useState } from "react";
import "./Todo.css";
import { BsCheckSquare } from "react-icons/bs";
import { GiCheckMark } from "react-icons/gi";
import { MdAdd } from "react-icons/md";
import { BsListNested } from "react-icons/bs";

const getlocalItems = () => {
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};
export default function Todo(color) {
  const [text, settext] = useState("");
  const [todolist, settodolist] = useState(getlocalItems());

  const addtodolist = () => {
    const task = {
      id: todolist.length === 0 ? 1 : todolist[todolist.length - 1].id + 1,
      taskname: text,
      completed: false,
    };
    settodolist([...todolist, task]);
    settext("");
  };

  const deleteTask = (id) => {
    const newtodolist = todolist.filter((list) => list.id !== id);
    settodolist(newtodolist);
  };
  const complete = (id) => {
    settodolist(
      todolist.map((task) => {
        if (task.id === id) {
          return { ...task, completed: !task.completed };
        } else {
          return task;
        }
      })
    );
  };
  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(todolist));
  }, [todolist]);
  return (
    <div className="section">
      <div className="mainContent">
        <div style={{marginBottom:"2rem"}}>
          <h1 style={{color:"black",fontWeight:"900"}}>My Task</h1>
        </div>
        <div className="inputFiled">
          <button className="left btn">
            <BsListNested />
          </button>
          <input
            value={text}
            onChange={(e) => settext(e.target.value)}
            type="text"
          />
          <button
            disabled={!text}
            onClick={addtodolist}
            className="right add btn"
          >
            <MdAdd />
          </button>
        </div>
        <div className="inputDataFiled">
          <div className="inputData">
            {todolist.length <= 0 && text.length === 0 ? (
              <div className="emptyListDiv">
                <BsCheckSquare className="icon" />
                <h1>No task found</h1>
              </div>
            ) : (
              <div className="tasklist">
                <div>
                  {todolist.map((list) => {
                    return (
                      <div style={{ display: "flex", marginTop: "1rem" }}>
                        <button
                          onClick={() => complete(list.id)}
                          className="complete left btn"
                        >
                          <GiCheckMark />
                        </button>
                        {list.completed ? (
                          <s>{list.taskname}</s>
                        ) : (
                          <div
                            className="task"
                            style={{
                              background: list.completed
                                ? "red"
                                : "rgba(0, 0, 0, 0.356)",
                            }}
                          >
                            {list.taskname}
                          </div>
                        )}

                        <button
                          onClick={() => deleteTask(list.id)}
                          className="delete right btn"
                        >
                          X
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
            <div
              style={{ width: "100%", textAlign: "center", marginTop: "2rem" }}
            >
              {todolist.length >= 1 ? (
                <div>
                  <h3>Clear All</h3>
                  <button
                    className="clearAll"
                    onClick={() => {
                      settodolist([]);
                      settext("");
                    }}
                  >
                    X
                  </button>
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
