import { useQuery, useMutation, useQueryClient } from "react-query";
import { getTodos, deleteToDo, addToDo, updateToDo } from "../../api/todosApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faUpload } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

const ToDoList = () => {
  const [newTodo, setNewTodo] = useState("");
  const queryClient = useQueryClient();

  const {
    isLoading,
    isError,
    error,
    data: todos,
  } = useQuery("todos", getTodos);

  const addTodoMutation = useMutation(addToDo, {
    onSuccess: () => {
      // Invalidates cache and refetch
      queryClient.invalidateQueries("todos");
    },
  });

  const updateTodoMutation = useMutation(updateToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });
  const deleteTodoMutation = useMutation(deleteToDo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodoMutation.mutate({ userId: 1, title: newTodo, completed: false });
    setNewTodo("");
  };

  const newItemSection = (
    <form onSubmit={handleSubmit}>
      <label htmlFor="new-todo">Enter a new TODO item</label>
      <div className="new-todo">
        <input
          type="text"
          id="new-todo"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter new todo"
        />
      </div>
      <button className="submit">
        <FontAwesomeIcon icon={faUpload} />
      </button>
    </form>
  );
  let content 
  if(isLoading){
    content = <p>Loading...</p>
  }
  else if(isError){
    content =  <p>{error.message}</p>
  }
  else {
    content = JSON.stringify(todos)
  }
  return ( 
     <main>
        <h1>Todo List</h1>
        {newItemSection}
        {content}
     </main>
    );
};

export default ToDoList;
