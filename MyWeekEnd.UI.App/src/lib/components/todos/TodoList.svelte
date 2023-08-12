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

  const addNewTodoButton = async () => {
    if (isNewTodoWhitespaceOrEmpty) return;
    addTodo(newTodoDTO(newTodo, newTodo));
    listAllTodos();
    newTodo = '';
  };

  const dispatch = createEventDispatcher();

  const editTodoButtonClick = (todo: ITodoDTO) => {
    dispatch('editTodoButtonClick', {todo});
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

<Tile >Todos:</Tile>
{#each todos as todo}
<ClickableTile on:click={() => editTodoButtonClick(todo)}>{todo.title}</ClickableTile>
{/each}
Enter new todo: <br />
<textarea bind:value={newTodo} />
<Button on:click={addNewTodoButton} disabled={isNewTodoWhitespaceOrEmpty} icon={Add} />
