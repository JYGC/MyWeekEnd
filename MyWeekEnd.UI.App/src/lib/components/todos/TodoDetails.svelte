<script lang="ts">
  import { DatePicker, DatePickerInput, SelectItem, TextArea, TextInput, TimePicker, TimePickerSelect } from "carbon-components-svelte";
	import { newTodoDTO } from "$lib/services/todos";
	import type { ITodoListDTO } from "../../dtos/todos";

  export let todo: ITodoListDTO = newTodoDTO('', '');
</script>

<div class="todo-details">
  <TextInput labelText="Title" placeholder="Todo title..." bind:value={todo.title} />
  <TextArea labelText="Description" placeholder="Description..." bind:value={todo.description} />
  <DatePicker datePickerType="single" on:change class="test">
    <DatePickerInput labelText="Due date" placeholder="dd/mm/yyyy" />
  </DatePicker>
  <TimePicker labelText="Due time" placeholder="hh:mm">
    <TimePickerSelect value="pm">
      <SelectItem value="am" text="AM" />
      <SelectItem value="pm" text="PM" />
    </TimePickerSelect>
  </TimePicker>
</div>

<style lang="scss">
  .todo-details > :global(*) {
    margin-top: 20px;
  }
</style>