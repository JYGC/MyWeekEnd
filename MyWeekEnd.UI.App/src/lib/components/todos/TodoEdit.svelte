<script lang="ts">
	import TodoDetails from './TodoDetails.svelte';
	import type { ITodoListDTO } from './../../dtos/todos';
	import { createEventDispatcher } from "svelte";
	import { addTodo, deleteTodo } from './../../services/todos';
	import { Button } from 'carbon-components-svelte';
  import TrashCan from 'carbon-icons-svelte/lib/TrashCan.svelte';
	import Catalog from 'carbon-icons-svelte/lib/Catalog.svelte';
	import Save from 'carbon-icons-svelte/lib/Save.svelte';

  export let todo: ITodoListDTO;

  const dispatch = createEventDispatcher();

  const backToTodoListClick = () => {
    dispatch('backToTodoListClick');
  };

  const saveChangesClick = async () => {
    await addTodo(todo);
    dispatch('backToTodoListClick');
  };

const deleteTodoConfirmationClick = async () => {
  if (!confirm(`Are you sure you want to delete todo item: '${todo.id}'?`)) return;
  await deleteTodo(todo);
  dispatch('backToTodoListClick');
}
</script>

<div class="edit-todo-bar">
  <Button class="back" on:click={backToTodoListClick} kind="secondary" icon={Catalog}>Todo list</Button>
  <Button class="save-todo" on:click={saveChangesClick} icon={Save}>Save</Button>
</div>
<div class="todo-details">
  <TodoDetails bind:todo={todo} />
</div>
<div class="todo-delete">
  <Button on:click={deleteTodoConfirmationClick} kind="danger-tertiary" tooltipPosition="right" iconDescription="Delete this Todo" icon={TrashCan} />
</div>

<style lang="scss">
  .edit-todo-bar {
    position: fixed;
    top: 0;
    width:100%;
    z-index:100;
  }
  
  .edit-todo-bar {
    :global(.save-todo) {
      float: right;
    }

    :global(.save-todo),
    :global(.back) {
      width: 50vw;
    }
  }

  .todo-details, .todo-delete {
    margin-top: 80px;
  }
</style>