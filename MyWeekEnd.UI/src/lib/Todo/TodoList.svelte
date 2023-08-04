<script lang="ts">
  import { v4 as uuidv4 } from 'uuid';
  import { Preferences } from '@capacitor/preferences';

  let newTodo = '';

  const getTodos = async () => {
    const result = await Preferences.get
  };

  const addNewTodo = async () => {
    if (isNewTodoWhitespaceOrEmpty) return;
    todos = [...todos, newTodo];
    newTodo = '';
  };

  const deleteTodoConfirmation = (index: number, todo: string) =>{
    if (confirm(`Are you sure you want to delete todo item: '${todo}'?`))
      deleteTodo(index);
  }

  const deleteTodo = (index: number) => {
    todos.splice(index, 1);
    todos = [...todos];
  }

  $: isNewTodoWhitespaceOrEmpty = typeof newTodo === 'undefined' || newTodo === null || newTodo.trim() === '';

  let todos: Array<string> = [];
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
    {#each todos as todo, index}
    <tr>
      <td>{todo}</td>
      <td><button on:click={() => deleteTodoConfirmation(index, todo)}>Remove</button></td>
    </tr>
    {/each}
  </tbody>
</table>

Enter new todo: <br />
<textarea bind:value={newTodo} /> <!-- bind:value cause blank page in android -->
<button on:click={addNewTodo} disabled={isNewTodoWhitespaceOrEmpty}>Add</button>