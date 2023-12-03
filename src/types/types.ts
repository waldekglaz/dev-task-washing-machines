export interface Item {
  familyId: string
  modelList: {
    displayName: string
    energyLabelGrade: string
    thumbUrl: string
    price: number
    ratings: number
    keySummary: OptionsArray[]
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
  productFunctions: OptionsArray[]
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
  displayType: string
  imgAlt: string
  imgUrl: string
  key?: null
  style?: null
  unit?: null
  value?: null
}
