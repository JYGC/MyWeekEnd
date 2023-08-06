<script lang="ts">
  import { newTodoDTO, type ITodoDTO } from "../../dtos/todo-dtos";
  import { addTodo, deleteTodo, getTodos } from "../../services/todo-service";

  let newTodo = '';
  let todos: Array<ITodoDTO> = [];

  const putTodosOntoPage = async () => {
    todos = await getTodos();
  };

  const addNewTodoButton = async () => {
    if (isNewTodoWhitespaceOrEmpty) return;
    addTodo(newTodoDTO(newTodo, newTodo));
    putTodosOntoPage();
    newTodo = '';
  };

  const deleteTodoConfirmation = (todo: ITodoDTO) =>{
    if (!confirm(`Are you sure you want to delete todo item: '${todo._id}'?`)) return;
    putTodosOntoPage();
    deleteTodo(todo);
  }

  $: isNewTodoWhitespaceOrEmpty = typeof newTodo === 'undefined' || newTodo === null || newTodo.trim() === '';

  putTodosOntoPage();
</script>

Todos:
<table>
  <thead>
    <tr>
      <th>Todo</th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each todos as todo}
    <tr>
      <td>{todo.title} - {todo.body}</td>
      <td><button on:click={() => deleteTodoConfirmation(todo)}>Remove</button></td>
    </tr>
    {/each}
  </tbody>
</table>

Enter new todo: <br />
<textarea bind:value={newTodo} /> <!-- bind:value cause blank page in android -->
<button on:click={addNewTodoButton} disabled={isNewTodoWhitespaceOrEmpty}>Add</button>