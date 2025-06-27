   import styles from './Buttons.module.css'

    const ButtonsContainer = function({onButtonClick}){
      const BtnNames = ['C' ,'1' , '2' ,'+', '3' , '4','-','5','6','*','7','8','/','=','9','0','(', ')','.' ];
      return (
            <div className={styles.btncontainer}>
              {BtnNames.map(function(btnname){
                return <button className={styles.button} onClick={()=>onButtonClick(btnname)}>{btnname}</button>
              })}

        </div>
      )
    };

    
    export default ButtonsContainer;
