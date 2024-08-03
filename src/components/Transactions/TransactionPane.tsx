// import { useState} from "react"
import { InputCheckbox } from "../InputCheckbox"
import { TransactionPaneComponent } from "./types"

export const TransactionPane: TransactionPaneComponent = ({
  transaction,
  loading,
  setTransactionApproval: consumerSetTransactionApproval,
  onToggle,
  approved
}) => {
  // const [approve, setApproved] = useState(approved)
  // console.log(`Rendering TransactionPane for ${transaction.id} with approved: ${approved}`);
  return (
    <div className="RampPane">
      <div className="RampPane--content">
        <p className="RampText">{transaction.merchant} </p>
        <b>{moneyFormatter.format(transaction.amount)}</b>
        <p className="RampText--hushed RampText--s">
          {transaction.employee.firstName} {transaction.employee.lastName} - {transaction.date}
        </p>
      </div>
      <InputCheckbox
        id={transaction.id}
        checked={approved}
        disabled={loading}
        onChange={async (newValue) => {
          // console.log(`Checkbox changed for transaction ${transaction.id} to ${newValue}`);
          await consumerSetTransactionApproval({
            transactionId: transaction.id,
            newValue,
          })

          // setApproved(newValue)
          onToggle(transaction.id, newValue)
        }}
      />
    </div>
  )
}

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
})
