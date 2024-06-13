import styles from './dashboard.module.css';
import Balance from '../components/balance/Balance';
import {useState, useEffect, createContext} from 'react';
import PieChartExample from '../components/pieChart/PieChart';
import RecentTransactions from '../components/recentTransactions/RecentTransactions';
import TopExpenses from '../components/topExpences/TopExpenses';
import Modal from '../components/modal/Modal';
export const MyContext = createContext();

export default function Dashborad(){
    let [wB, setwB] = useState(0);
    let [TransactionsState, setTransactionsState] = useState([]);
    let [Expenses, setExpenses] = useState(0);
    let [pieProps, setpieProps] = useState([]);
    let [Reload, setReload] = useState(true);

    useEffect(()=>{
        // console.log("useeffect running");
        if(!localStorage.getItem("walletBalance")){
            let walletBalance = {Amount:5000};
            localStorage.setItem("walletBalance",JSON.stringify(walletBalance));
        }
        // let Transactions = [
        //     {title:"title1",price:500,category:"entertainment",date:new Date(2020,1,27)},
        //     {title:"title3",price:400,category:"travel",date:new Date(2020,4,7)},
        //     {title:"title4",price:500,category:"entertainment",date:new Date(2020,1,27)},
        //     {title:"title5",price:400,category:"travel",date:new Date(2020,4,7)},
        //     {title:"title2",price:100,category:"food",date:new Date(2020,1,23)}];
        // localStorage.setItem("Transactions",JSON.stringify(Transactions));
        // let transactions = JSON.parse(localStorage.getItem("Transactions"));
        // let expenses = transactions.reduce((total,transaction)=> total+=transaction.price,0);
        // setExpenses(expenses);
        // setTransactionsState(transactions);
        // filterCategories(transactions);
    },[]);
    useEffect(()=>{
        let transactions = JSON.parse(localStorage.getItem("Transactions"));
        if(transactions){
            let expenses = transactions.reduce((total,transaction)=> total+=transaction.price,0);
            setExpenses(expenses);
            setTransactionsState(transactions);
        }
        setwB(JSON.parse(localStorage.getItem("walletBalance")).Amount);
        filterCategories(transactions);
    },[Reload]);

    let handelReload = ()=>{
        setReload((prev)=>!prev);
    }

    let filterCategories = (transactions)=>{
        if(!transactions){
            return;
        }
        let categorised = {};
        let pieData = [];
        transactions.forEach((transaction)=>{
            let category = transaction.category;
            if(categorised.hasOwnProperty(category)){
                categorised[category] += transaction.price;
            }else{
                categorised[category] = transaction.price;
            }
        });
        Object.entries(categorised).map((category)=>{
            pieData.push({ name:category[0], value:category[1]});
        });
        setpieProps([categorised,pieData]);
    }
    
    return(
        <div className={styles.wrapper}>
            <MyContext.Provider value={handelReload}>
            <h2 className={styles.wrapperHeading}>Expense Tracker</h2>
            <div className={styles.section1}>
                <div className={styles.balance}>
                    <Balance title={"Income"} amount={wB} />
                </div>
                <div className={styles.balance}>
                    <Balance title={"Expense"} amount={Expenses} />
                </div>
                <div className={styles.pieChart}>
                    {pieProps.length > 0? 
                    <PieChartExample walletBalance={wB} categorised={pieProps[0]} pieData={pieProps[1]}/>
                    :
                        <div>No data found</div>
                    }
                </div>
            </div>
            <div className={styles.section2}>
                <div className={styles.section2one}>
                    <h3 className={styles.section2oneTitle1}>Recent Transactions</h3>
                    <div style={{height:"84%"}}>
                        <RecentTransactions Transactions={TransactionsState}/>
                    </div>
                </div>
                <div className={styles.section2two}>
                    <h3>Top Expenses</h3> 
                    <div style={{height:"85%"}}>
                        <TopExpenses transactions={TransactionsState}/>
                    </div>
                </div>
            </div>
            </MyContext.Provider>
        </div>
    )
}