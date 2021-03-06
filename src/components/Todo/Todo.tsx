import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { MdEdit } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { BsTrash } from "react-icons/bs";
import { Draggable } from "react-beautiful-dnd";
import { deleteTodo, completeTodo, updateTodo } from "../../redux/todoActions";
import { TodoType } from "../../Types/Types";
interface Props {
  todo: TodoType;
  index: number;
}

const Todo: React.FC<Props> = ({ todo, index }) => {
  const [isOnEdit, setIsOnEdit] = useState(false);
  const dispatch = useDispatch();

  const handleDeleteTodo = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleTodoCheckbox = (id: string) => {
    dispatch(completeTodo(id));
  };

  const handleOnClickEdit = () => {
    setIsOnEdit(true);
  };

  const handleOnChangeToDo = (
    e: React.ChangeEvent<HTMLInputElement>,
    id: string
  ): void => {
    dispatch(updateTodo(id, e.target.value));
  };

  const handleKeyPressEnter = (
    e: React.KeyboardEvent<HTMLInputElement>
  ): void => {
    if (e.key === "Enter") setIsOnEdit(false);
  };

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => {
    return {
      background: isDragging ? "#a8ffbd" : null,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      borderBottom: "1px solid #ededed",
      padding: "0 20px",

      // styles we need to apply on draggables
      ...draggableStyle,
    };
  };

  return (
    <Draggable draggableId={todo.id} index={index}>
      {(provided, snapshot) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          style={getItemStyle(
            snapshot.isDragging,
            provided.draggableProps.style
          )}
        >
          <input
            style={styles.checkbox}
            type="checkbox"
            name="task1"
            value={todo.data}
            checked={todo.isChecked}
            onChange={() => handleTodoCheckbox(todo.id)}
          />
          <div style={styles.todoDataContainer}>
            {isOnEdit ? (
              <div style={styles.todoTextContainer}>
                <input
                  style={styles.textInput}
                  type="text"
                  value={todo.data}
                  onChange={(e) => handleOnChangeToDo(e, todo.id)}
                  onKeyDown={(e) => handleKeyPressEnter(e)}
                />
                <FaCheck
                  onClick={() => setIsOnEdit(false)}
                  style={styles.checkIcon}
                />
              </div>
            ) : (
              <div style={styles.todoTextContainer}>
                <p
                  style={{
                    ...styles.todoData,
                    textDecoration: todo.isChecked ? "line-through" : "none",
                  }}
                >
                  {todo.data}
                </p>
                <MdEdit
                  onClick={() => handleOnClickEdit()}
                  style={styles.editIcon}
                />
              </div>
            )}
          </div>
          {!isOnEdit && (
            <BsTrash
              onClick={() => handleDeleteTodo(todo.id)}
              style={styles.trashIcon}
            />
          )}
        </div>
      )}
    </Draggable>
  );
};

const styles = {
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "0px 30px",
    borderBottom: "1px solid #ededed",
  },
  textInput: {
    color: "#2e2e2e",

    padding: "5px",
    width: "90%",
    fontSize: "16px",
    border: "2px solid #70e8a9",
    borderRadius: "5px",
  },
  checkbox: {
    backgroundColor: "pink",
    fontSize: "20px",
  },
  todoDataContainer: {
    width: "100%",
    padding: "15px",
  },
  todoTextContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 0,
    cursor: "pointer",
  },
  todoData: {
    fontSize: "18px",
    color: "#2e2e2e",
  },
  trashIcon: {
    color: "#FD8C7E",
    fontSize: "20px",
    cursor: "pointer",
  },
  checkIcon: {
    fontSize: "20px",
    cursor: "pointer",
    color: "#3ddf8a",
  },
  editIcon: {
    color: "#8c7efd",

    fontSize: "22px",
    cursor: "pointer",
  },
};

export default Todo;
