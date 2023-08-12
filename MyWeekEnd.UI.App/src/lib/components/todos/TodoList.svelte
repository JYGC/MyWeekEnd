<script lang="ts">
	import { beforeUpdate, onMount } from "svelte";
  import type { ITodoDTO } from "../../dtos/todo-dtos";
  import { addTodo, deleteTodo, getAllTodos, newTodoDTO } from "../../services/todo-service";

  let newTodo = '';
  let todos: Array<ITodoDTO> = [];

  const listAllTodos = async () => {
    todos = await getAllTodos();
    console.log(todos);
  };

  const addNewTodoButton = async () => {
    if (isNewTodoWhitespaceOrEmpty) return;
    addTodo(newTodoDTO(newTodo, newTodo));
    listAllTodos();
    newTodo = '';
  };

  const editTodoButtonClick = async (todo: ITodoDTO) => {
    //
  };

  const deleteTodoConfirmation = (todo: ITodoDTO) =>{
    if (!confirm(`Are you sure you want to delete todo item: '${todo._id}'?`)) return;
    deleteTodo(todo);
    listAllTodos();
  }

  $: isNewTodoWhitespaceOrEmpty = typeof newTodo === 'undefined' || newTodo === null || newTodo.trim() === '';

  onMount(() => {
    listAllTodos();
  });
</script>

Todos:
<table>
  <thead>
    <tr>
      <th>Todo</th>
      <th></th>
      <th></th>
    </tr>
  </thead>
  <tbody>
    {#each todos as todo}
    <tr>
      <td>{todo.body}</td>
      <td><button disabled on:click={() => editTodoButtonClick(todo)}>Edit</button></td>
      <td><button on:click={() => deleteTodoConfirmation(todo)}>Remove</button></td>
    </tr>
    {/each}
  </tbody>
</table>

Enter new todo: <br />
<textarea bind:value={newTodo} />
<button on:click={addNewTodoButton} disabled={isNewTodoWhitespaceOrEmpty}>Add</button>
