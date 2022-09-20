import { Header } from './components/Header';
import { Task } from './components/Task';
import './App.module.css';
import './global.css';

export default function App() {
  return (
    <div className="App">
      <Header/>
      <Task/>
    </div>
  )
}
