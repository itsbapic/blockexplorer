// import { Alchemy, Network } from 'alchemy-sdk';
import { useState } from 'react';
import styles from "../styles/Block.module.scss"

// formats the timestamp into a YYYY/MM/DD HH:MM:SS format
function timeFormat(timestamp) {
    const date = new Date(timestamp * 1000);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    return `${year}/${month < 10 ? "0" + month : month}/${day < 10 ? "0" + day : day} ${hours < 10 ? "0" + hours : hours}:${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`;
}

export default function Block({ blockType, blockNumber, blockData }) {

    let blockTypeClass = ""
    if (blockType === "farLeft") {
        blockTypeClass = styles.blockFarLeft
    } else if (blockType === "left") {
        blockTypeClass = styles.blockLeft
    } else if (blockType === "middle") {
        blockTypeClass = styles.blockMiddle
    } else if (blockType === "right") {
        blockTypeClass = styles.blockRight
    } else if (blockType === "farRight") {
        blockTypeClass = styles.blockFarRight
    }


    const [active, setActive] = useState(false)
    return <>
        {typeof blockData === "undefined" ?

            <div className={`${styles.blockCard}`} onClick={() => { setActive(false) }}>
                <span className={`${styles.blockNum}`}>Block #...</span>
                <p className={`${styles.blockItemLabel} ${styles.blockHash}`}>Hash</p>
                <p className={`${styles.blockItemValue} ${styles.blockHash}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.parentHash}`}>Parent Hash</p>
                <p className={`${styles.blockItemValue} ${styles.parentHash}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.timestamp}`}>Timestamp</p>
                <p className={`${styles.blockItemValue} ${styles.timestamp}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.gasLimit}`}>Gas Limit</p>
                <p className={`${styles.blockItemValue} ${styles.gasLimit}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.gasUsed}`}>Gas Used</p>
                <p className={`${styles.blockItemValue} ${styles.gasUsed}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.miner}`}>Miner/Verifier</p>
                <p className={`${styles.blockItemValue} ${styles.miner}`}>Waiting...</p>
                <p className={`${styles.blockItemLabel} ${styles.extraData}`}>Extra Data</p>
                <p className={`${styles.blockItemValue} ${styles.extraData}`}>Waiting...</p>
                {/* {<p className="transactionList">Transactions: {block.transactions.map(tx => <p>{JSON.stringify(tx)}</p> + ', ') || ""}</p>} */}
            </div> :
            <div className={`${styles.blockCard} ${active ? styles.notActive : styles.active} ${blockTypeClass}`} onClick={() => {
                // handleClick();
                setActive(active)
            }}>
                <span className={`${styles.blockNum}`}>Block #{blockNumber}</span>
                <p className={`${styles.blockItemLabel} ${styles.blockHash}`}>Hash</p>
                <p className={`${styles.blockItemValue} ${styles.blockHash}`}>{blockData.hash}</p>
                <p className={`${styles.blockItemLabel} ${styles.parentHash}`}>Parent Hash</p>
                <p className={`${styles.blockItemValue} ${styles.parentHash}`}>{blockData.parentHash || ""}</p>
                <p className={`${styles.blockItemLabel} ${styles.timestamp}`}>Timestamp</p>
                <p className={`${styles.blockItemValue} ${styles.timestamp}`}>{timeFormat(blockData.timestamp) || ""}</p>
                <p className={`${styles.blockItemLabel} ${styles.gasLimit}`}>Gas Limit</p>
                <p className={`${styles.blockItemValue} ${styles.gasLimit}`}>{blockData.gasLimit._hex || ""}</p>
                <p className={`${styles.blockItemLabel} ${styles.gasUsed}`}>Gas Used</p>
                <p className={`${styles.blockItemValue} ${styles.gasUsed}`}>{blockData.gasUsed._hex || ""}</p>
                <p className={`${styles.blockItemLabel} ${styles.miner}`}>Miner/Verifier</p>
                <p className={`${styles.blockItemValue} ${styles.miner}`}>{blockData.miner || ""}</p>
                <p className={`${styles.blockItemLabel} ${styles.extraData}`}>Extra Data</p>
                <p className={`${styles.blockItemValue} ${styles.extraData}`}>{blockData.extraData || ""}</p>
                {/* {<p className="transactionList">Transactions: {blockData.transactions.map(tx => <p>{JSON.stringify(tx)}</p> + ', ') || ""}</p>} */}
            </div>
        }
    </>;
}