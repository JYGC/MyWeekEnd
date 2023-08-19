<script lang="ts">
	import TodoDetails from './TodoDetails.svelte';
	import { createEventDispatcher } from 'svelte';
	import { Button } from 'carbon-components-svelte';
	import type { ITodoDetailDTO } from '../../dtos/todos';
	import { addTodo2, newTodoDetailDTO } from '../../services/todos';
	import Catalog from 'carbon-icons-svelte/lib/Catalog.svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';

  let todoDetailDTO: ITodoDetailDTO = newTodoDetailDTO();

  const dispatch = createEventDispatcher();

  const backToTodoListClick = () => {
    dispatch('backToTodoListClick');
  };

  const saveChangesClick = async () => {
    await addTodo2(todoDetailDTO);
    dispatch('backToTodoListClick');
  };
</script>

<div class="add-todo-bar">
  <Button class="back" on:click={backToTodoListClick} kind="secondary" icon={Catalog}>Todo list</Button>
  <Button class="save-todo" on:click={saveChangesClick} icon={Save}>Save</Button>
</div>
<div class="todo-details">
	<TodoDetails bind:todo={todoDetailDTO} />
</div>

<style lang="scss">
  .add-todo-bar {
    position: fixed;
    top: 0;
    width:100%;
    z-index:100;
  }
  
  .add-todo-bar {
    :global(.save-todo) {
      float: right;
    }

    :global(.save-todo),
    :global(.back) {
      width: 50vw;
    }
  }

  .todo-details {
    margin-top: 80px;
  }
</style>