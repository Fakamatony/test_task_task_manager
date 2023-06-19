<template>
  <div>
    <h3>{{ editingTask ? 'Edit Task' : 'Add Task' }}</h3>
    <form @submit.prevent="addTask">
      <input type="text" v-model="newTaskTitle" placeholder="Task Title" />
      <input type="text" v-model="newTaskDescription" placeholder="Task Description" />
      <button type="submit">{{ editingTask ? 'Save' : 'Add' }}</button>
    </form>

    <h3>Task List</h3>
    <ol>
      <li v-for="task in tasks" :key="task.id" :class="{ completed: task.completed }">
        <div>
          <input type="checkbox" :checked="task.completed" @change="toggleTaskCompletion(task)" />
          <span :class="{ completed: task.completed }">{{ task.title }}</span>
        </div>
        <div>
          {{ task.description }}
        </div>
        <div>
          <button @click="editTask(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
        <div v-if="task === editingTask">
          <input type="text" v-model="task.title" />
          <input type="text" v-model="task.description" />
          <button @click="saveTask">Save</button>
        </div>
      </li>
    </ol>
  </div>
  <router-link to="/">Go to Task List</router-link>
</template>


<script>
export default {
  data() {
    return {
      tasks: [],
      newTaskTitle: '',
      newTaskDescription: '',
      editingTask: null,
    };
  },
  methods: {
    addTask() {
      if (this.newTaskTitle.trim() === '' || this.newTaskDescription.trim() === '') {
        return;
      }

      const newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        description: this.newTaskDescription,
        completed: false,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
      this.newTaskDescription = '';
      this.saveTasksToLocalStorage();
    },
    editTask(task) {
      this.editingTask = task;
    },
    saveTask() {
      this.editingTask = null;
      this.saveTasksToLocalStorage();
    },
    deleteTask(taskId) {
      this.tasks = this.tasks.filter((task) => task.id !== taskId);
      this.saveTasksToLocalStorage();
    },
    toggleTaskCompletion(task) {
      task.completed = !task.completed;
      this.saveTasksToLocalStorage();
    },
    saveTasksToLocalStorage() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    retrieveTasksFromLocalStorage() {
      const savedTasks = localStorage.getItem('tasks');
      this.tasks = savedTasks ? JSON.parse(savedTasks) : [];
    },
  },
  created() {
    this.retrieveTasksFromLocalStorage();
  },
};
</script>

<style>
.completed {
  text-decoration: line-through;
}
</style>




