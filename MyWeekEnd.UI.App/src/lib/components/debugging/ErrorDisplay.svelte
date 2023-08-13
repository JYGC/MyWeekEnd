<script lang="ts">
	import { onMount } from "svelte";
	import { initDatabase } from "../../database/mobile";

  let result: any = null;
  let errors: any = null;

  onMount(() => {
    (async () => {
      [result, errors] = await initDatabase();
    })();
  });
</script>

Result:<br />
{result}<br />
<br />
Errors:<br />
{errors}<br />