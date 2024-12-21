import ListGroup from './components/ListGroup'; 
import WelcomePage from './components/WelcomePage';

function App(){
  let ingredientsList = ["Pasta", "Cheese", "Basil"];
  
  const handleSelectItem = (ingredient: string) => {
      console.log(ingredient); 
  }
  return ( 
    <div>
    <WelcomePage />
    </div>
  ); 
}

export default App; 