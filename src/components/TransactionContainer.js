
import Transactions from "./Transactions";
import Transaction from "./Transaction";


import styles from "../styles/TransactionContainer.module.scss";

export default function TransactionContainer() {
    return (
        <div className={`${styles.transactionContainer}`}>
            <Transactions />
            <Transaction />
        </div>
    )
}
