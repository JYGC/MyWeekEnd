<script lang="ts">
  import { DatePicker, DatePickerInput, SelectItem, TextArea, TextInput, TimePicker, TimePickerSelect } from "carbon-components-svelte";
	import type { ITodoDetailDTO } from "../../dtos/todos";

  export let todo: ITodoDetailDTO;
</script>

<div class="todo-details">
  <TextInput labelText="Name" placeholder="Todo name..." bind:value={todo.name} />
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