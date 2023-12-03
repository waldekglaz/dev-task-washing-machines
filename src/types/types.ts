export interface Item {
  familyId: string
  modelList: {
    displayName: string
    energyLabelGrade: string
    thumbUrl: string
    price: number
    ratings: number
    keySummary: string[]
  }[]
  chipOptions: {
    optionList: {
      optionCode: string
    }[]
  }[]
}

export interface CardProps {
  name: string
  capacity: string
  productFunctions: string[]
  img: string
  energyClass: string
  price: number
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

export interface OptionsArray {
  title: string
}
