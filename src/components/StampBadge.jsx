import { stampBase, stampVariants } from '../styles/ui.js'

export default function StampBadge({ status, className = '' }) {
  return <span className={`${stampBase} ${stampVariants[status]} ${className}`}>{status}</span>
}
