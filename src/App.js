import './App.css';
import Header from './components/Header';
import { TodoList } from './components/TodoList';
import { TodoOverview } from './components/TodoOverview';

const App = () => {
  return (
    <div>
      <Header />
      <div className='flex'>
        <TodoList />
        <TodoOverview />
      </div>
    </div>
  );
}

export default App;
