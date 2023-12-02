import { calculateInstallments } from '../utils/utils'
import Label from '../assets/label.svg'
import { CardProps } from '../types/types'

function Card({
  name,
  dimentions,
  capacity,
  productFunctions,
  img,
  energyClass,
  promoDates,
  price,
  onClick,
  selected,
}: CardProps) {
  return (
    <div className="bg-white  px-6 py-6 w-11/12 md:w-[338px]  rounded-3xl flex flex-col justify-between items-center">
      <img src={img} alt={name} className="w-[290px] " />
      <div className="mb-4">
        <h2 className="text-lg font-bold mb-9 mt-3 md:pr-10">{name}</h2>
        <div className="text-xs">
          <p className="text-custom-text-grey">
            Pojemność (kg):{' '}
            <span className="text-black font-bold">
              {capacity.slice(0, -2)}
            </span>
          </p>
          <p>
            Wymiary (GxSxW): <span className="font-bold">{dimentions}</span>
          </p>
          <p className="mb-[14px]">
            Funkcje:{' '}
            {productFunctions.map((func) => {
              return (
                <span>
                  <span className="text-black font-bold">{func} </span>,
                </span>
              )
            })}
          </p>
          <div className="flex items-center mb-[14px]">
            Klasa energetyczna{' '}
            <span className="relative">
              <img className=" w-[49px] ml-2" src={Label} alt="" />
              <span className="absolute top-[1px] left-4 font-bold text-white">
                {energyClass}
              </span>
            </span>
          </div>
          <p>Cena obowiązuje:{promoDates}</p>
          <div className="flex items-center text-4xl font-bold">
            {price}
            <div className="flex flex-col text-sm">
              00
              <br />
              zł
            </div>
          </div>
          <p>{calculateInstallments(price, 60)} zł x 60 rat</p>
        </div>
      </div>

      <button
        className={`${
          selected ? 'bg-black' : 'bg-blue-800'
        } rounded-full py-[7px] px-[40px] text-white uppercase tracking-[2.1px] text-[14px] hover:bg-black hover:text-white transition ease-in-out delay-100`}
        onClick={onClick}>
        {selected ? 'Wybrane' : 'Wybierz'}
      </button>
    </div>
  )
}

export default Card
