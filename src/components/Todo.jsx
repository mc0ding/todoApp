import { useContext } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { DarkModeContext, TodoActionsContext, TodoStateContext, TodoValueContext } from '../context/TodoContext';

export default function Todo() {
  const { todo } = useContext(TodoValueContext);
  const { state } = useContext(TodoStateContext);
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'w-80 h-56 bg-[#2C2D45] text-white p-5' : 'w-80 h-56 bg-white p-5'}>
      {state === 'All' && todo.length === 0 && 
      <div className={darkMode ? 'text-center translate-y-14 text-white font-bold' : 'text-center translate-y-14 font-bold'}>Todo List를 작성해보세요.</div>}
      {state === 'All' && todo.map((todo) => (
        <List key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} darkMode={darkMode} />
      ))}
      {state === 'Active' &&
        todo.filter((todo) => todo.done === false)
            .map((todo) => (
              <List key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} darkMode={darkMode} />
      ))}
      {state === 'Completed' &&
        todo.filter((todo) => todo.done === true)
            .map((todo) => (
              <List key={todo.id} id={todo.id} todo={todo.todo} done={todo.done} darkMode={darkMode} />
      ))}
    </div>
  );
}

function List({ id, todo, done, darkMode }) {
  const { actions } = useContext(TodoActionsContext);
  const handleChecked = () => { actions.checked(id) };
  const handleRemove = () => { actions.remove(id) };
  return (
    <div className='flex justify-between mb-2'>
      <p>
        <input id='checkbox' type='checkbox' onChange={handleChecked} checked={done}
                className='mr-2 accent-[#D88F43]' />
        <label htmlFor='checkbox' className={done && 'text-[#ADADB7] line-through decoration-[#ADADB7]'}>{todo}</label>
      </p>
      <button onClick={handleRemove} className='w-6 h-6 bg-[#59595B] rounded-xl flex justify-center'>
        <FaTrashAlt size='0.9rem' className={darkMode ? 'translate-y-1' : 'text-white translate-y-1'} />
      </button>
    </div>
  );
}

