<script lang="ts">
	import type { ITodoDTO } from "$lib/dtos/todos";
	import TodoAdd from "./TodoAdd.svelte";
	import TodoEdit from "./TodoEdit.svelte";
	import TodoList from "./TodoList.svelte";

	type ROUTE = 'List' | 'Add' | 'Edit';
	let currentRoute: ROUTE = 'List';

	let selectedTodo: ITodoDTO;

	const gotoList = () => { currentRoute = 'List'; };
	const gotoAdd = () => { currentRoute = 'Add'; };
	const gotoEdit = (event: CustomEvent) => {
		selectedTodo = event.detail.todo;
		currentRoute = 'Edit';
	};
</script>

{#if currentRoute === 'List'}
<TodoList on:editTodoButtonClick={gotoEdit} />
{/if}

{#if currentRoute === 'Add'}
<TodoAdd />
{/if}

{#if currentRoute === 'Edit'}
<TodoEdit on:backToTodoListClick={gotoList} todo={selectedTodo} />
{/if}