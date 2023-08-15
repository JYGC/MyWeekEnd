<script lang="ts">
	import type { ITodoListDTO } from "$lib/dtos/todos";
	import TodoAdd from "./TodoAdd.svelte";
	import TodoEdit from "./TodoEdit.svelte";
	import TodoList from "./TodoList.svelte";

	type ROUTE = 'List' | 'Add' | 'Edit';
	let currentRoute: ROUTE = 'List';

	let selectedTodo: ITodoListDTO;

	const gotoList = () => { currentRoute = 'List'; };
	const gotoAdd = () => { currentRoute = 'Add'; };
	const gotoEdit = (event: CustomEvent) => {
		selectedTodo = event.detail.todo;
		currentRoute = 'Edit';
	};
</script>

{#if currentRoute === 'List'}
<TodoList on:editTodoButtonClick={gotoEdit} on:addTodoButtonClick={gotoAdd} />
{/if}

{#if currentRoute === 'Add'}
<TodoAdd on:backToTodoListClick={gotoList} />
{/if}

{#if currentRoute === 'Edit'}
<TodoEdit on:backToTodoListClick={gotoList} todo={selectedTodo} />
{/if}