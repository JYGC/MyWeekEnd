<script lang="ts">
	import type { ITodoDTO } from "../../dtos/todos";

  let todo: ITodoDTO;
</script>
<div>
  <label for="title">Title:</label>
  <input type="text" id="title" bind:value={todo.title} />
</div>
<div>
  <label for="description">Description:</label>
  <input type="text" id="title" bind:value={todo.description} />
</div>
<div>
  <label for="title">Due date:</label>
  <input type="text" id="title" bind:value={todo.title} />
</div>