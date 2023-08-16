<script lang="ts">
	import { getDatabaseAdapter } from "../../database";
	import { onMount } from "svelte";

  let result: any = null;
  let errors: any = null;

  onMount(() => {
    (async () => {
      try {
        result = getDatabaseAdapter();
      } catch (error) {
        errors = error.stack;
      }
    })();
  });
</script>

Result:<br />
{result}<br />
<br />
Errors:<br />
{errors}<br />