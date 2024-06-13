import styles from './topExpenses.module.css';
import * as React from 'react';
import {useEffect, useState} from 'react';
// import { BarChart, BarSeries, XAxis, YAxis } from '@mui/x-data-grid'; // Import BarChart, BarSeries, XAxis, and YAxis



export default function TopExpenses({transactions}){
    if(!transactions || transactions.length === 0){
        return <div>No Data found</div>
    }

    let categorised = {};
    let total = 0;
    let width = [50,50,50];
    let widthp = [];
    transactions.map((transaction)=>{
        let category = transaction.category;
        if(categorised.hasOwnProperty(category)){
            categorised[category] += transaction.price;
        }else{
            categorised[category] = transaction.price;
        }
        total += transaction.price;
    });
    let categorisedArray = Object.entries(categorised);
    categorisedArray.sort((a,b)=> b.value - a.value);
    // width[0] = Math.round((categorisedArray[0][1]/total)*100);
    // width[1] = Math.round((categorisedArray[1][1]/total)*100);
    // width[2] = Math.round((categorisedArray[2][1]/total)*100);
    // widthp[0]=`${width[0]}%`;
    // widthp[1]=`${width[1]}%`;
    // widthp[2]=`${width[2]}%`;
    // console.log("categoriesd array ",categorisedArray);
    widthp = categorisedArray.map((width)=>{
        // console.log("width ",width);
        return `${Math.round((width[1]/total)*100)}%`;
    });
    // console.log("widthp ",widthp);


    return(
        <div className={styles.wrapper}>
            {
            categorisedArray.map((element,index)=>(
                <div>
                    <p className={styles.name} style={{width:"20%",display:"inline"}}>{element[0]}</p>
                    <div style={{width:"70%",display:"flex",justifyContent:"start",alignItems:"center"}} >
                        <div className={styles.innerbar} style={{width:widthp[index],height:"20px",borderTopRightRadius:"50px",borderBottomRightRadius:"50px"}}>
                        </div>
                    </div>
                </div>
            ))
            }
            {/* <div>
                <p className={styles.name} style={{width:"20%",display:"inline"}}>{categorisedArray[1][0]}</p>
                <div style={{width:"70%",display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <div className={styles.innerbar} style={{width:widthp[1],height:"20px",borderTopRightRadius:"50px",borderBottomRightRadius:"50px"}}>
                    </div>
                </div>
            </div>
            <div>
                <p className={styles.name} style={{width:"20%",display:"inline"}}>{categorisedArray[2][0]}</p>
                <div style={{width:"70%",display:"flex",justifyContent:"start",alignItems:"center"}} >
                    <div className={styles.innerbar} style={{width:widthp[2],height:"20px",borderTopRightRadius:"50px",borderBottomRightRadius:"50px"}}>
                    </div>
                </div>
            </div> */}
        </div>
    )
}