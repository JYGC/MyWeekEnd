<script lang="ts">
	import TodoDetails from './TodoDetails.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import type { ITodoDTO } from '../../dtos/todos';
	import { addTodo, newTodoDTO } from '$lib/services/todos';

  let todo: ITodoDTO = newTodoDTO('', '');

  const dispatch = createEventDispatcher();

  const backToTodoListClick = () => {
    dispatch('backToTodoListClick');
  };

  const saveChangesClick = async () => {
    await addTodo(todo);
    dispatch('backToTodoListClick');
  };
</script>

<div class="add-todo-tab">
  <Button on:click={backToTodoListClick} kind="secondary">Back to your todo list</Button>
  <Button class="save-todo" on:click={saveChangesClick}>Save</Button>
</div>
<div class="todo-details">
	<TodoDetails bind:todo={todo} />
</div>

<style lang="scss">
  .add-todo-tab {
    position: fixed;
    top: 0;
    width:100%;
    z-index:100;
    background-color: rgb(31, 31, 31);
  }
  
  .add-todo-tab {
    > :global(.save-todo) {
      float: right;
    }
  }

  .todo-details {
    margin-top: 80px;
  }
</style>