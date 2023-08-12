<script lang="ts">
	import TodoDetails from './TodoDetails.svelte';
	import type { ITodoDTO } from './../../dtos/todos';
	import { createEventDispatcher } from "svelte";
	import { Button } from 'carbon-components-svelte';

  let todo: ITodoDTO;

  const dispatch = createEventDispatcher();

  const backToTodoListClick = () => {
    dispatch('backToTodoListClick');
  };
</script>

<Button on:click={backToTodoListClick}>Back to your todo list</Button>
<TodoDetails bind:todo={todo} />