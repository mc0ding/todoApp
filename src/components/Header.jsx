import React, { useContext } from 'react';
import { ImSun } from 'react-icons/im';
import { BsMoonFill } from 'react-icons/bs';
import { DarkModeContext, TodoActionsContext, TodoStateContext } from '../context/TodoContext';

export default function Header() {
  const stateList = ['All', 'Active', 'Completed'];
  const { actions } = useContext(TodoActionsContext);
  const handleState = (e) => { actions.tab(e.target.value) }
  const { darkMode, toggleDarkMode } = useContext(DarkModeContext);

  return (
    <div className={darkMode ? 'w-80 h-10 bg-[#23233F] rounded-xl rounded-b-none flex justify-between' : 'w-80 h-10 bg-white rounded-xl rounded-b-none flex justify-between'}>
      <button onClick={() => toggleDarkMode()}>{darkMode ? <ImSun className='ml-4 text-white' /> : <BsMoonFill className='ml-4 text-[#EE7112]'/>}</button>
      <span className='translate-y-[20%]'>
        <Tab onClick={handleState} value={stateList[0]} darkMode={darkMode}>All</Tab>
        <Tab onClick={handleState} value={stateList[1]} darkMode={darkMode}>Active</Tab>
        <Tab onClick={handleState} value={stateList[2]} darkMode={darkMode}>Completed</Tab>
      </span>
    </div>
  );
}

function Tab({ children, onClick, value, darkMode }) {
  const { state } =useContext(TodoStateContext);

  return <button className={
                  state === value
                  ? (darkMode
                      ? 'text-[#D3914E] mr-4 font-bold underline underline-offset-4 decoration-white'
                      : 'text-[#D3914E] mr-4 font-bold underline underline-offset-4 decoration-slate-500')
                  : (darkMode
                      ? 'text-[#D3914E] mr-4 font-bold hover:underline underline-offset-4 decoration-white'
                      : 'text-[#D3914E] mr-4 font-bold hover:underline underline-offset-4 decoration-slate-500')}
                onClick={onClick} value={value}>{children}</button>;
}