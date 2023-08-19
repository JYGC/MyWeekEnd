<script lang="ts">
	import { onMount, createEventDispatcher } from "svelte";
  import type { ITodoDTO, ITodoListDTO } from "../../dtos/todos";
  import { getAllTodos, getTodoList, migrateTodos } from "../../services/todos";
  import { Button, ClickableTile } from "carbon-components-svelte";
  import AddAlt from "carbon-icons-svelte/lib/AddAlt.svelte";
	import { establishDatabase } from "$lib/database";

  let todos: Array<ITodoListDTO> = [];

  const listAllTodos = async () => {
    await establishDatabase();
    todos = await getTodoList();
    console.log(todos);
  };

  const dispatch = createEventDispatcher();

  const addTodoButtonClick = async () => {
    dispatch('addTodoButtonClick');
  };

  const editTodoButtonClick = (todo: ITodoListDTO) => {
    dispatch('editTodoButtonClick', {todo});
  };

  onMount(() => {
    listAllTodos();
  });
</script>

<h4>Your Weekend Todo List</h4>
{#each todos as todo}
<ClickableTile on:click={() => editTodoButtonClick(todo)}>{todo.name}</ClickableTile>
{/each}
<div class="todo-add-container">
  <Button class="todo-add" on:click={addTodoButtonClick} size="xl" icon={AddAlt}>Add new Todo</Button>
</div>

<style lang="scss">
  h4 {
    background-color: #1c2c4b;
    font-weight: bold;
    padding: 15px;
  }

  .todo-add-container {
    position: fixed;
    bottom: 5vh;
    right: 5vh;
    z-index:100;
  }

  .todo-add-container > :global(.todo-add) {
    padding-top: 30px;
    padding-left: 30px;
    padding-right: 50px;
  }
</style>