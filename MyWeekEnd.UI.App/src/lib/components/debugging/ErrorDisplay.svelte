<script lang="ts">
	import { migrateTodos } from "$lib/services/todos";
	import { onMount } from "svelte";

  let result: any = null;
  let errors: any = null;
  
  onMount(() => {
    migrateTodos().then(() => {
      result = true;
    }).catch((error) => {
      errors = error.stack;
    });
  });
</script>

Result:<br />
{result}<br />
<br />
Errors:<br />
{errors}<br />