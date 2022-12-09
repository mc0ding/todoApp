import Header from './Header';
import Todo from './Todo';
import Footer from './Footer';
import { TodoProvider } from '../context/TodoContext';

export default function Container() {
  return (
    <TodoProvider>
      <div className='absolute top-[50%] translate-y-[-50%] left-[50%] translate-x-[-50%]'>
        <Header />
        <Todo />
        <Footer />
      </div>
    </TodoProvider>
  );
}

