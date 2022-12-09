import React, { createContext, useEffect, useMemo, useState } from 'react';

export const TodoStateContext = createContext();
export const TodoValueContext = createContext();
export const TodoActionsContext = createContext();
export const DarkModeContext = createContext();

export function TodoProvider({ children }) {
  const [state, setState] = useState('All');
  const [todo, setTodo] = useState([]);
  useEffect(() => {
    let getTodo = localStorage.getItem('todo')
    getTodo = JSON.parse(getTodo)
    if (getTodo === null) {
      getTodo = new Set(getTodo)
      getTodo = Array.from(getTodo)
      localStorage.setItem('todo', JSON.stringify(getTodo))
    }
    setTodo(getTodo)

    let getDarkMode = localStorage.getItem('darkMode')
    getDarkMode = JSON.parse(getDarkMode)
    if (getDarkMode === null) {
      getDarkMode = new Set(getDarkMode)
      getDarkMode = false
      localStorage.setItem('darkMode', JSON.stringify(getDarkMode))
    }
    setDarkMode(getDarkMode)
  }, [])
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    let getDarkMode = localStorage.getItem('darkMode')
    getDarkMode = JSON.parse(getDarkMode)
    if (getDarkMode === true) {
      getDarkMode = false
      localStorage.setItem('darkMode', JSON.stringify(getDarkMode))
    } else {
      getDarkMode = true
      localStorage.setItem('darkMode', JSON.stringify(getDarkMode))
    }
    setDarkMode((mode) => !mode);};
  const actions = useMemo(() => ({
    add(todo) {
      let id = 0;
      let getTodo = localStorage.getItem('todo')
      getTodo = JSON.parse(getTodo)
      if (getTodo.length === 0) {
        id = 1;
      } else {
        id = parseInt(getTodo[getTodo.length - 1].id) + 1;
        console.log(id)
      }
      getTodo.push({ id, todo, done: false })
      getTodo = new Set(getTodo)
      getTodo = Array.from(getTodo)
      localStorage.setItem('todo', JSON.stringify(getTodo))

      setTodo((prev) => [
        ...prev,
        {
          id,
          todo,
          done: false
        }
      ]);
    },
    remove(id) {
      let getTodo = localStorage.getItem('todo')
      getTodo = JSON.parse(getTodo)
      const idx = getTodo.findIndex((todo) => todo.id === id)
      getTodo.splice(idx, 1)
      getTodo = new Set(getTodo)
      getTodo = Array.from(getTodo)
      localStorage.setItem('todo', JSON.stringify(getTodo))

      setTodo((prev) => prev.filter((todo) => todo.id !== id))
    },
    checked(id) {
      let getTodo = localStorage.getItem('todo')
      getTodo = JSON.parse(getTodo)
      getTodo.map((todo) => 
        parseInt(todo.id) === id ? todo.done = !todo.done : todo)
      getTodo = new Set(getTodo)
      getTodo = Array.from(getTodo)
      localStorage.setItem('todo', JSON.stringify(getTodo))

      setTodo((prev) => 
        prev.map((item) =>
          item.id === id
            ? {
                ...item,
                done: !item.done
              }
              : item
        )
      );
    },
    tab(state) { setState(state) },
  }), []);

  return (
    <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
      <TodoStateContext.Provider value={{ state }}>
        <TodoActionsContext.Provider value={{ actions }}>
          <TodoValueContext.Provider value={{ todo }}>
            {children}
          </TodoValueContext.Provider>
        </TodoActionsContext.Provider>
      </TodoStateContext.Provider>
    </DarkModeContext.Provider>
  );
}