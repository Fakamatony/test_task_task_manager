import { createStore } from 'vuex'

const store = createStore({
  state: {
    tasks: []
  },
  mutations: {
    addTask(state, task) {
      state.tasks.push(task)
    },
    updateTask(state, { index, updatedTask }) {
      state.tasks[index] = updatedTask
    },
    deleteTask(state, index) {
      state.tasks.splice(index, 1)
    }
  },
  actions: {
    addTask({ commit }, task) {
      commit('addTask', task)
    },
    updateTask({ commit, state }, { index, updatedTask }) {
      const task = state.tasks[index]
      if (task) {
        const mergedTask = { ...task, ...updatedTask }
        commit('updateTask', { index, updatedTask: mergedTask })
      }
    },
    deleteTask({ commit, state }, index) {
      const task = state.tasks[index]
      if (task) {
        commit('deleteTask', index)
      }
    }
  },
  getters: {
    getTasks(state) {
      return state.tasks
    }
  }
})

export default store
