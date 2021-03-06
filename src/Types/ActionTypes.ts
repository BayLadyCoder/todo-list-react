import {
  ADD_TODO,
  UPDATE_TODO,
  DELETE_TODO,
  COMPLETE_TODO,
  REORDER_TODO_LIST,
} from "../redux/todoActions";

import { TodoType } from "./Types";

export type IdAndNewTodoData = {
  id: string;
  data: string;
};

export interface AddTodo {
  type: typeof ADD_TODO;
  payload: TodoType;
}
export interface UpdateTodo {
  type: typeof UPDATE_TODO;
  payload: IdAndNewTodoData;
}
export interface DeleteTodo {
  type: typeof DELETE_TODO;
  payload: { id: string };
}
export interface CompleteTodo {
  type: typeof COMPLETE_TODO;
  payload: { id: string };
}
export interface ReorderTodoList {
  type: typeof REORDER_TODO_LIST;
  payload: TodoType[];
}

export type TodoDispatchType =
  | AddTodo
  | UpdateTodo
  | DeleteTodo
  | CompleteTodo
  | ReorderTodoList;
