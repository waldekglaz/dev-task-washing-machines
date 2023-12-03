import Arrow from '../assets/arrow.svg'
import { FilterProps } from '../types/types'

function Filter({ state, setState, label, options }: FilterProps) {
  return (
    <div className="flex flex-col w-[250px] relative">
      <label className="font-bold">{label}</label>
      <img src={Arrow} alt="" className="absolute left-[230px] top-10 z-50" />
      <select
        value={state}
        onChange={(e) => setState(e.target.value)}
        className="px-[12px] py-2 appearance-none">
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  )
}

export default Filter
