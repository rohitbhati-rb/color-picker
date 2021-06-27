import Palette from './Palette';
import seedColors from './seedColors';
function App() {
  return (
    <div>
      <Palette {...seedColors[5]}/>
    </div>
  );
}

export default App;
