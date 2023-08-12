<script lang="ts">
	import TodoDetails from './TodoDetails.svelte';
	import type { ITodoDTO } from './../../dtos/todos';
	import { createEventDispatcher } from "svelte";
	import { addTodo, deleteTodo } from './../../services/todos';
	import { Button } from 'carbon-components-svelte';
  import TrashCan from "carbon-icons-svelte/lib/TrashCan.svelte";

  export let todo: ITodoDTO;

  const dispatch = createEventDispatcher();

  const backToTodoListClick = () => {
    dispatch('backToTodoListClick');
  };

  const saveChangesClick = async () => {
    await addTodo(todo);
    dispatch('backToTodoListClick');
  };

const deleteTodoConfirmationClick = async () => {
  if (!confirm(`Are you sure you want to delete todo item: '${todo._id}'?`)) return;
  await deleteTodo(todo);
  dispatch('backToTodoListClick');
}
</script>

<div class="edit-todo-tab">
  <Button on:click={backToTodoListClick} kind="secondary">Back to your todo list</Button>
  <Button class="save-todo" on:click={deleteTodoConfirmationClick}>Save</Button>
</div>
<div class="todo-details">
  <TodoDetails bind:todo={todo} />
</div>
<div class="todo-delete">
  <Button on:click={saveChangesClick} kind="danger-tertiary" iconDescription="Delete this Todo" icon={TrashCan} />
</div>

<style lang="scss">
  .edit-todo-tab {
    position: fixed;
    top: 0;
    width:100%;
    z-index:100;
    background-color: rgb(31, 31, 31);
  }
  
  .edit-todo-tab {
    > :global(.save-todo) {
      float: right;
    }
  }

  .todo-details, .todo-delete {
    margin-top: 80px;
  }
</style>