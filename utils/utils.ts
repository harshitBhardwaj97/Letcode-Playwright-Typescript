export function generateRandomDate(startYear: number = 1900, endYear: number = 2100): string {
  const year = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear
  const month = Math.floor(Math.random() * 12) + 1 // 1-12
  const day = Math.floor(Math.random() * 28) + 1 // 1-28 (to avoid invalid days in shorter months)

  // Ensure the month and day are always 2 digits
  const formattedMonth = month.toString().padStart(2, "0")
  const formattedDay = day.toString().padStart(2, "0")

  const resultingDate = `${year}-${formattedMonth}-${formattedDay}`
  console.log(`Resulting date is:- ${resultingDate}`)
  return resultingDate
}
