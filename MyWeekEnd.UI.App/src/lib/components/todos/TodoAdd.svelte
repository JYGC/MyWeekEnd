<script lang="ts">
	import type { ITodoDTO } from '../../dtos/todos';
	const { default: TodoDetails } = require("./TodoDetails.svelte");

  let todo: ITodoDTO;
</script>
<TodoDetails bind:todo />