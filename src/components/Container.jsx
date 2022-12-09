import Header from './Header';
import Todo from './Todo';
import Footer from './Footer';
import { TodoProvider } from '../context/TodoContext';

export default function Container() {
  return (
    <TodoProvider>
      <div className='absolute top-16 left-[1.7rem] md:top-[25%] md:left-[40%]'>
        <Header />
        <Todo />
        <Footer />
      </div>
    </TodoProvider>
  );
}

