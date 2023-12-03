import { OptionsArray } from '../types/types'

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

export function extractOptions(arr: OptionsArray[]): string[] {
  const newArray = []

  for (let i = 0; i < arr.length; i++) {
    if (arr[i].title?.includes('-')) {
      if (arr[i].title === 'Wi-Fi') {
        newArray.push(arr[i].title)
      } else {
        newArray.push(arr[i].title.split('-')[0])
      }
    }
  }
  return newArray
}

export function generateUrl(products: string[]): string {
  const BASE_URL = `https://searchapi.samsung.com/v6/front/b2c/product/card/detail/newhybris?siteCode=pl&modelList=${products.join(
    ',',
  )}&commonCodeYN=N&saleSkuYN=N&onlyRequestSkuYN=N&keySummaryYN=Y&shopSiteCode=pl`

  return BASE_URL
}
