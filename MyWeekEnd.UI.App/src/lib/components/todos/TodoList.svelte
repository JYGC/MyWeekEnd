<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
  import type { ITodoDTO } from "../../dtos/todos";
  import { addTodo, deleteTodo, getAllTodos, newTodoDTO } from "../../services/todos";
  import { Button, ClickableTile, Tile } from "carbon-components-svelte";
  import Add from "carbon-icons-svelte/lib/Add.svelte";

  let newTodo = '';
  let todos: Array<ITodoDTO> = [];

  const listAllTodos = async () => {
    todos = await getAllTodos();
    console.log(todos);
  };

  const dispatch = createEventDispatcher();

  const addTodoButtonClick = async () => {
    dispatch('addTodoButtonClick');
  };

  const editTodoButtonClick = (todo: ITodoDTO) => {
    dispatch('editTodoButtonClick', {todo});
  };

  onMount(() => {
    listAllTodos();
  });
</script>

<h4>Your Todo List</h4>
{#each todos as todo}
<ClickableTile on:click={() => editTodoButtonClick(todo)}>{todo.title}</ClickableTile>
{/each}
<Button on:click={addTodoButtonClick} iconDescription='Add new Todo' icon={Add} />

<style lang="scss">
  h4 {
    background-color: #1c2c4b;
    font-weight: bold;
    padding: 15px;
  }
</style>