export const dateHelper = {
  remainingTime(deadlineIsoStr) {
    if (!deadlineIsoStr) return "";
    const now = new Date();
    const deadline = new Date(deadlineIsoStr);
    
    // We consider "overdue" if the day is past. So if we want to be exact:
    if (deadline < now) {
      return "Overdue";
    }

    const diffMs = deadline - now;
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
      if (diffHours === 0) {
        const diffMins = Math.floor(diffMs / (1000 * 60));
        return `${diffMins} menit lagi`;
      }
      return `${diffHours} jam lagi`;
    }
    
    if (diffDays === 1) {
      return "Besok";
    }
    
    return `${diffDays} hari lagi`;
  },
  
  formatDate(isoStr) {
    if (!isoStr) return "";
    const d = new Date(isoStr);
    return new Intl.DateTimeFormat('id-ID', { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }).format(d);
  },
  
  getStartOfWeek(date = new Date()) {
    const d = new Date(date);
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1); 
    return new Date(d.setDate(diff)).setHours(0,0,0,0);
  },
  
  getEndOfWeek(date = new Date()) {
    const start = this.getStartOfWeek(date);
    return new Date(start + 6 * 24 * 60 * 60 * 1000).setHours(23,59,59,999);
  },
  
  isThisWeek(isoStr) {
    if (!isoStr) return false;
    const d = new Date(isoStr).getTime();
    return d >= this.getStartOfWeek() && d <= this.getEndOfWeek();
  },
  
  isThisMonth(isoStr) {
    if (!isoStr) return false;
    const now = new Date();
    const d = new Date(isoStr);
    return now.getMonth() === d.getMonth() && now.getFullYear() === d.getFullYear();
  }
};
