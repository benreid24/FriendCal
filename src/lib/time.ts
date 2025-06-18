export function getRecentDate(from: Date = new Date(), daysAgo: number = 30): Date {
  const copy = new Date(from);
  copy.setDate(copy.getDate() - daysAgo);
  return copy;
}

export function trimTimeFromDate(date: Date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
