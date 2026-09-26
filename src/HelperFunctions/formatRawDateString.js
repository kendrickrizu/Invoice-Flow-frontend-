export default function formatRawDateString(rawDate) {

    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    if (!rawDate) return ""
    
    const [year, month, day] = rawDate.split('-')
    const monthName = months[parseInt(month, 10) - 1]
    const dayNumber = parseInt(day, 10)
    
    return `${monthName} ${dayNumber}`

  }
