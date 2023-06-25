import axios from "axios";

const todosApi = axios.create({
    baseURL: "http://localhost:3500"
})

export const getTodos =  async () => {
    const response = await todosApi.get("/todos")
    return response.data
}

export const addToDo = async (todo) => {
    return await todosApi.post("/todos", todo)
}

export const updateToDo = async (todo) => {
    return await todosApi.patch(`/todos/${todo.id}`, todo)
}

export const deleteToDo = async ({id}) => {
    return await todosApi.delete(`/todos/${id}`, id)
}

export default todosApi