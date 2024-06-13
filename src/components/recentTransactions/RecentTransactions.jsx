import styles from './recentTransactions.module.css';
import {useState, useEffect, useContext} from 'react';
import { GoArrowRight } from "react-icons/go";
import { GoArrowLeft } from "react-icons/go";
import crossbutton from './../../assets/cross-button.png';
import editbutton from './../../assets/edit-button2.png';
import foodIcon from './../../assets/pizza-icon.png';
import travelIcon from './../../assets/bag-icon.png';
import entertainmentIcon from './../../assets/gift-icon.png';
import ReactModal from 'react-modal';
import Modal from './../modal/Modal';
import {MyContext} from './../../pages/Dashbaord';
import { enqueueSnackbar } from 'notistack';


export default function RecentTransactions({Transactions}){
    // Transactions = JSON.parse(localStorage.getItem("Transactions"));
    let handleReload = useContext(MyContext);
    let [page, setPage] = useState(0);
    let [displayModal, setDisplayModal] = useState(false);
    let [selectedTransactionTitle, setSelectedTransactionTitle] = useState("");
    let [Reload, setReload] = useState(true);
    let  customStyle = {
        content:{
            // color:"orange",
            position:"center",
            height:"fit-content",
            width:"538px",
            borderRadius:"15px"
        },
        overlay:{
            display:"flex",
            justifyContent:"center",
            alignItems:"center",
        }
    }

    let transactionsToDisplay = Transactions.slice(page*3,(page*3)+3); 
    let formatDate = (stringDate)=>{
        let date = new Date(stringDate);
        let options = {month:'long',year:"numeric",day:"numeric"};
        return date.toLocaleDateString(undefined,options);
    }

    let handelEditTransaction = (title)=>{
        setDisplayModal(true);
        console.log("setselectedtransactiontitle ",title);
        setSelectedTransactionTitle(title);
    }
    let handleDeleteButton = (title)=>{
        // console.log("handel delete button");
        let Transactions = JSON.parse(localStorage.getItem("Transactions"));
        let Amount = JSON.parse(localStorage.getItem("walletBalance")).Amount;
        let index = Transactions.findIndex((obj)=> obj.title === title);
        let addAmount = Transactions[index].price;
        if(index !== -1){
            let newTransactions = [...Transactions.slice(0,index),...Transactions.slice(index+1)];
            Amount += addAmount;
            localStorage.setItem("Transactions",JSON.stringify(newTransactions));
            localStorage.setItem("walletBalance",JSON.stringify({Amount:Amount}));
            enqueueSnackbar("Transaction deleted ",{variant:"success"});
        }
        handleReload();
    }

    let closeModal = ()=>{
        setDisplayModal(false);
    }

    let arrowHandler = (direction)=>{
        console.log("arrow handler ",direction);
        if(direction=== "left"){
            if(page>=1){
                setPage((page)=> page-1);
            }
        }
        if(direction === "right"){
                setPage((page)=> page+1);
        }
        setTimeout(()=>{
            console.log("page is set tot ",page);
        },5000);
    }

    return(
        <div className={styles.wrapper} style={{height:"85%"}}>
            <div className={styles.section1}>
                {
                    transactionsToDisplay.map((transaction, index)=>(
                        <div className={styles.row} key={index}>
                            <div className={styles.section1left}>
                                <div>
                                    {transaction.category === "food"?
                                        <img src={foodIcon} alt="food"/>
                                        :
                                    transaction.category === "entertainment"?
                                        <img src={entertainmentIcon} alt="entertainment"/>
                                        :
                                        <img src={travelIcon} alt="travel"/>
                                    }
                                </div>
                                <div className={styles.description}>
                                    <h3 className={styles.title}>{transaction.title}</h3>
                                    <p className={styles.date}>{formatDate(transaction.date)}</p>
                                </div>

                            </div>
                            <div className={styles.section1right}>
                                <div className={styles.price}>₹{transaction.price}</div>
                                <img onClick={()=>{handleDeleteButton(transaction.title)}} src={crossbutton} alt="crossbutton" />
                                <img onClick={()=>{handelEditTransaction(transaction.title)}} src={editbutton} alt="editbutton" />
                            </div>
                        </div>
                    ))
                }
                <div>
                </div>
                <div>

                </div>
            </div>
            <div className={styles.section2}>
           <div className={styles.arrowdiv}>
                    <GoArrowLeft onClick={()=>{arrowHandler("left")}}/>
                </div>
                <div className={styles.index}>
                    {page+1}
                </div>
                <div className={styles.arrowdiv}>
                    <GoArrowRight onClick={()=>{arrowHandler("right")}}/>
                </div>
            </div>
            <ReactModal isOpen={displayModal} height="500px" width="200px" 
                style={customStyle}
            >
                <Modal input1={"input "} title={"Edit Expenses"} selectedTransactionTitle={selectedTransactionTitle} closeModal={closeModal}/>
            </ReactModal>
        </div>
    )
}