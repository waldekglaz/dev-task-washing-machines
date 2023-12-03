export interface Item {
  name: string
  capacity: string
  dimentions: string
  productFunctions: string[]
  energyClass: string
  promoDates: string
  price: number
  sku: string
  img: string
  popularity: number
}

export interface CardProps {
  name: string
  dimentions: string
  capacity: string
  productFunctions: string[]
  img: string
  energyClass: string
  promoDates: string
  price: number
  popularity: number
  selected: boolean
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export interface FilterProps {
  state: string
  setState(state: string): void
  label: string
  options: string[]
}
export interface Options {
  title: string
}
