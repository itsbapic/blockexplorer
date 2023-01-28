
import styles from "../styles/Transaction.module.scss"

export default function Transaction() {
    return (
        <div className={`${styles.transactionCard}`}>
            <span className={`${styles.title}`}>Transaction #{"Transaction #"}</span>
        </div>
    )
}
