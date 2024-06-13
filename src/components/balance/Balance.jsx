import styles from './balance.module.css';
import { useState, useEffect } from 'react';
import ReactModal from 'react-modal';
import Modal from './../modal/Modal';

export default function Balance({title, amount}){
    let [color, setColor] = useState("#8CE149");
    let [displayModal, setDisplayModal] = useState(false);
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

    let handelButton = (action)=>{
        console.log("action is ",action);
        setDisplayModal(true);
    }
    let closeModal = ()=>{
        setDisplayModal(false);
    }


    useEffect(()=>{
        if(title !== "Income"){
            setColor("#FF3F3F");
        }
    },[title])

    return(
        <div className={styles.wrapper}>
            <div>
            <h3>{title === "Income"?"Wallet Balance: ": "Expenses: "}<span style={{color:color}}>{"₹"+amount}</span></h3>
            </div>
            <div>
            <button onClick={()=>{handelButton(title)}} style={{backgroundColor:color}} className={styles.button}>+ Add {title}</button>
            </div>
            <ReactModal isOpen={displayModal} height="500px" width="200px" 
                style={customStyle}
            >
                <Modal input1={"input "} title={title === "Income"? "Add Balance": "Add Expenses"} closeModal={closeModal}/>
            </ReactModal>
        </div>
    )
}