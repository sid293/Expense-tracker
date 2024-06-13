import styles from './modal.module.css';
import {useRef,useState,useContext} from 'react';
import {MyContext} from './../../pages/Dashbaord';
import { enqueueSnackbar } from 'notistack';

export default function Modal({input1,input2="",input3="",input4="",title, selectedTransactionTitle="", closeModal}){
    let handleReload = useContext(MyContext);
    let [inputs, setInputs] = useState({});
    let incomeAmount = useRef();
    let titleref = useRef();
    let price = useRef();
    let category = useRef();
    let date = useRef();

    let yesButtonHandler = ()=>{
        if(title === "Add Balance"){
            let income = parseInt(inputs.income);
            let originalAmount = JSON.parse(localStorage.getItem("walletBalance")).Amount;
            let newAmount = income+originalAmount;
            console.log(newAmount);
            localStorage.setItem("walletBalance",JSON.stringify({Amount:newAmount}));
            enqueueSnackbar("Balance added",{variant:"success"});
        }else if(title === "Add Expenses"){
            // create a new object with data 
            let dataObject = {title:inputs.title,price:inputs.price,category:inputs.category,date:new Date(inputs.date)};
            let Amount = JSON.parse(localStorage.getItem("walletBalance")).Amount;
            Amount = Amount - inputs.price;
            if(Amount < 0){
                //notify you don't have enough balance
                enqueueSnackbar("You don't have enough balance",{variant:"error"});
                return;
            }
            // push it to the existing array
            let transactionsList = JSON.parse(localStorage.getItem("Transactions"));
            if(!transactionsList){
                transactionsList = [];
            }
            transactionsList.push(dataObject);
            localStorage.setItem("Transactions",JSON.stringify(transactionsList));
            localStorage.setItem("walletBalance",JSON.stringify({Amount:Amount}));
            enqueueSnackbar("Expense Added",{variant:"success"});
        }else{
            let Transactions = JSON.parse(localStorage.getItem("Transactions"));
            let index = Transactions.findIndex((obj)=> obj.title === selectedTransactionTitle);
            if(index !== -1){
                let previousAmount = Transactions[index].price;
                let newAmount = inputs.price;
                let Amount = JSON.parse(localStorage.getItem("walletBalance")).Amount;
                // debugger;
                if(newAmount > previousAmount){
                    Amount -= (newAmount - previousAmount);
                }
                if(newAmount < previousAmount){
                    Amount += (previousAmount - newAmount);
                }
                localStorage.setItem("walletBalance",JSON.stringify({Amount:Amount}));
                let newTransactions = [...Transactions.slice(0,index),{...inputs},...Transactions.slice(index+1)];
                localStorage.setItem("Transactions",JSON.stringify(newTransactions));
                enqueueSnackbar("Expense Edited",{variant:"success"});
            }
        }
        handleReload();
        closeModal();
    }

    return(
        <div className={styles.wrapper}> 
            <h1>{title}</h1>
            {title === "Add Balance"? 
                <div className={styles.form}>
                    <input ref={incomeAmount} type="number" onChange={(event)=>{setInputs((prev)=>({...prev,income:event.target.value}))}} name={input1} placeholder='Income Amount' className={styles.inputfield} />
                    <button onClick={yesButtonHandler} className={styles.yesbutton} >{title}</button>
                    <button onClick={closeModal} >Cancel</button>
                </div>
            :
                <div className={styles.form2}>
                    <input ref={titleref} onChange={(event)=>{setInputs((prev)=>({...prev,title:event.target.value}))}} type="text" name={input1} placeholder='Title' className={styles.inputfield} />
                    <input ref={price} onChange={(event)=>{setInputs((prev)=>({...prev,price:parseInt(event.target.value)}))}} type="number" name={input2} placeholder='Price'  className={styles.inputfield} />
                    {/* <input ref={category} onChange={(event)=>{setInputs((prev)=>({...prev,category:event.target.value}))}} type="text" name={input3} placeholder='Select Category' className={styles.inputfield} /> */}
                    <select className={styles.inputfield} id="cetegory" ref={category} onChange={(event)=>{setInputs((prev)=>({...prev,category:event.target.value}))}}>
                        <option value="" disabled selected hidden>Select your category</option>
                        <option value="food">Food</option>
                        <option value="travel">Travel</option>
                        <option value="entertainment">Entertainment</option>
                    </select>
                    <input ref={date} onChange={(event)=>{setInputs((prev)=>({...prev,date:event.target.value}))}} type="date" name={input4} placeholder='dd/mm/yyyy' className={styles.inputfield} />
                    <button onClick={yesButtonHandler} className={styles.yesbutton} style={{width:"217px"}} >{title}</button>
                    <button onClick={closeModal}>Cancel</button>
                </div>
            }
        </div>
    )
}