<script lang="ts">
  import { DatePicker, DatePickerInput, SelectItem, TextArea, TextInput, TimePicker, TimePickerSelect } from "carbon-components-svelte";
	import { newTodoDTO } from "$lib/services/todos";
	import type { ITodoDTO } from "../../dtos/todos";

  export let todo: ITodoDTO = newTodoDTO('', '');
</script>

<TextInput labelText="Title" placeholder="Todo title..." bind:value={todo.title} />
<TextArea labelText="Description" placeholder="Description..." bind:value={todo.description} />
<div>
  <DatePicker datePickerType="single" on:change>
    <DatePickerInput labelText="Due date" placeholder="mm/dd/yyyy" />
  </DatePicker>
  <TimePicker labelText="Due time" placeholder="hh:mm">
    <TimePickerSelect value="pm">
      <SelectItem value="am" text="AM" />
      <SelectItem value="pm" text="PM" />
    </TimePickerSelect>
  </TimePicker>
</div>
