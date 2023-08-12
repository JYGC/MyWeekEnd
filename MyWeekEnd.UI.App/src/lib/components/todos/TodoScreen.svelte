<script lang="ts">
	import TodoAdd from "./TodoAdd.svelte";
	import TodoEdit from "./TodoEdit.svelte";
	import TodoList from "./TodoList.svelte";

	type ROUTE = 'List' | 'Add' | 'Edit';
	let currentRoute: ROUTE = 'List';

	const gotoList = () => { currentRoute = 'List'; };
	const gotoAdd = () => { currentRoute = 'Add'; };
	const gotoEdit = () => { currentRoute = 'Edit'; };
</script>

{#if currentRoute === 'List'}
<TodoList on:editTodoButtonClick={gotoEdit} />
{/if}

{#if currentRoute === 'Add'}
<TodoAdd />
{/if}

{#if currentRoute === 'Edit'}
<TodoEdit on:backToTodoListClick={gotoList} />
{/if}