import React, { useContext, useState } from 'react';
import { DarkModeContext, TodoActionsContext } from '../context/TodoContext';

export default function Footer() {
  const [todoText, setTodoText] = useState('');
  const { actions } = useContext(TodoActionsContext);
  const handleAdd = () => { actions.add(todoText); setTodoText(''); };
  const { darkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'w-80 h-16 bg-[#23233F] rounded-xl rounded-t-none' : 'w-80 h-16 bg-white rounded-xl rounded-t-none'}>
      <p className='flex justify-center translate-y-[35%]'>
        <input type='text' placeholder='Add Todo' value={todoText} onChange={(e) => setTodoText(e.target.value)}
                className= {darkMode ? ' w-60 h-9 rounded-l-md rounded-r-none pl-3 focus:outline-none' : ' w-60 h-9 rounded-l-md rounded-r-none pl-3 outline outline-1 outline-black focus:outline-1'} />
        <button
          onClick={handleAdd}
          className=' w-16 rounded-r-md rounded-l-none bg-[#DA8F3F] text-white font-bold'>
          Add
        </button>
      </p>
    </div>
  );
}

