class DateUtils {
  static calculateTimeToNow(date: Date): string {
    const diff = Date.now() - date.getTime()
    if (diff < 1000) {
      return '1s'
    } if (diff < 60 * 1000) {
      return `${Math.floor(diff / 1000)}s`
    } if (diff < 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 1000))}m`
    } if (diff < 24 * 60 * 60 * 1000) {
      return `${Math.floor(diff / (60 * 60 * 1000))}h`
    }
    return `${Math.floor(diff / (24 * 60 * 60 * 1000))}d`
  }
}

export default DateUtils
