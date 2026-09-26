import { cardPad, statValue, statStatus, statDelta } from '../styles/ui.js'

export default function StatCard(props) {
  return (
    <div className={cardPad}>
      <div className={statStatus}>{props.status}</div>
      <div className={statValue}>{props.value}</div>
      {props.delta && <div className={statDelta[props.direction]}>{props.delta}</div>}
    </div>
  )
}
