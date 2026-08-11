import Greeting from './components/Greeting';
import SkillCard from './components/SkillCard';
import './App.css';

function App() {
  return (
    <div className="app">
      <Greeting name="Marvellous" />
      <div className="skills">
        <SkillCard title="HTML & CSS" description="Semantic markup, responsive layouts" />
        <SkillCard title="JavaScript" description="DOM manipulation, async/await, fetch" />
        <SkillCard title="React" description="Just getting started today!" />
      </div>
    </div>
  );
}

export default App;