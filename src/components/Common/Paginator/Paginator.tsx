import React, {useState} from "react";
import s from './Paginator.module.css'


type Props={
    totalItemsCount:number
    pageSize:number
    currentPage:number
    onPageChanged:(pageNumber:number)=>void
    portionSize?:number
}

const Paginator:React.FC<Props> =
    ({totalItemsCount,pageSize,currentPage,onPageChanged,portionSize=15}) => {


    let pagesCount = Math.ceil(totalItemsCount / pageSize);
    let pages:Array<number> = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i);
    }
    let [portionNumber,setPortionNumber]=useState(1)
    let portionCount=Math.ceil(totalItemsCount/portionSize);
    let leftPortionElementNumber= portionSize * (portionNumber - 1)+1;
    let lastPortionElementNumber= portionSize * portionNumber;


    return <div className={s.paginator}>
        {portionNumber>=2 && <button onClick={()=>{setPortionNumber(1)}}>First Page</button>}
        {portionNumber>1 && <button onClick={()=>{setPortionNumber(portionNumber-1)}}>Preview Page</button>}
        {pages.filter(p=>p>=leftPortionElementNumber && p<=lastPortionElementNumber)
            .map(p => {
                return <span key={p} className={`${s.pagenumber} ${currentPage === p ? s.selected : ''}`}
                             onClick={() => {
                                 onPageChanged(p)
                             }}>{p}</span>
            })}
        {portionNumber<portionCount && <button onClick={()=>{setPortionNumber(portionNumber+1)}}>
            Next Page</button>}
        </div>
}


export default Paginator;