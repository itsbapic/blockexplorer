
import styles from "../styles/Transactions.module.scss"

export default function Transactions() {
    return (
        <>
            <div className={`${styles.transactionsCard}`}>
                <span className={`${styles.title}`}>Transactions for Block #{"Block Number"}</span>

            </div>
        </>
    )
}
