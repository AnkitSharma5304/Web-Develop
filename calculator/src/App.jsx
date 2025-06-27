import styles from './App.module.css'
import Display from './components/Display'
import ButtonsContainer from './components/ButtonsContainer'
import { useState } from 'react';

function App() {
   const [calval , setcalval] = useState("");
   const onButtonClick = function(event){
     if(event === 'C'){
      setcalval("");
     }
     else if(event === '='){
         try {
      const result = eval(calval);
      setcalval(result.toString());
    } catch (error) {
      setcalval("Error");
    }
     }
     else {
      const newDisplayValue = calval + event;
      setcalval(newDisplayValue);
     }
   }

  return (
    <div className={styles.appWrapper}>
      <div className={styles.calculator}>
        <Display displayval={calval} ></Display>
        <ButtonsContainer onButtonClick={onButtonClick} />
      </div>
    </div>
  )
}

export default App
