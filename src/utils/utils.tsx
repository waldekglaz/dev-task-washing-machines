export function calculateInstallments(price: number, months: number): string {
  const result = price / months
  return result.toFixed(2)
}
export function extractCapacity(title: string): string {
  const arr = title.split(',')
  const capacity = arr[arr.length - 2]
  return capacity
}

export function handleCardSelection(
  id: string,
  setState: React.Dispatch<React.SetStateAction<Record<string, boolean>>>,
): void {
  setState((prevSelections) => {
    const updatedSelections = { ...prevSelections }
    updatedSelections[id] = !updatedSelections[id]

    return updatedSelections
  })
}
