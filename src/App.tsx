import { useState, useEffect } from 'react'
import './App.css'
import jsonData from './data.json'
import Card from './components/Card'
import Search from './components/Search'
import BlueArrow from './assets/blue-arrow.svg'
import Filter from './components/Filter'
import { sortByOptions } from './utils/constants'
import { handleCardSelection } from './utils/utils'
import { Item } from './types/types'

function App() {
  const [items] = useState(jsonData.washingMachines)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sortBy, setSortBy] = useState<string>('Popularność')
  const [energyClassFilter, setEnergyClassFilter] =
    useState<string>('Pokaż wszystkie')
  const [capacityFilter, setCapacityFilter] =
    useState<string>('Pokaż wszystkie')
  const [functionsFilter, setFunctionsFilter] =
    useState<string>('Pokaż wszystkie')
  const [cardSelections, setCardSelections] = useState<Record<string, boolean>>(
    {},
  )
  const [showAllItems, setShowAllItems] = useState<boolean>(false)

  const itemsToShowInitially = 6

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearchTerm = item.name.toLowerCase().includes(searchTerm)

      const matchesEnergyClass =
        energyClassFilter === 'Pokaż wszystkie' ||
        item.energyClass === energyClassFilter

      const matchesCapacity =
        capacityFilter === 'Pokaż wszystkie' ||
        item.capacity.toString() === capacityFilter

      const matchesFunctions =
        functionsFilter === 'Pokaż wszystkie' ||
        item.productFunctions.some((func) =>
          func.toLocaleLowerCase().includes(functionsFilter.toLowerCase()),
        )

      return (
        matchesSearchTerm &&
        matchesEnergyClass &&
        matchesCapacity &&
        matchesFunctions
      )
    })
    .sort((a: Item, b: Item) => {
      if (sortBy === 'Cena rosnąco') {
        return a.price - b.price
      } else if (sortBy === 'Cena malejąco') {
        return b.price - a.price
      } else if (sortBy === 'Popularność') {
        return b.popularity - a.popularity
      }
      return 0
    })

  // Generate energy class options based on filtered data
  const energyClassOptions = [
    'Pokaż wszystkie',
    ...new Set(
      filteredAndSortedItems.map((item) => item.energyClass.toUpperCase()),
    ),
  ]

  // Generate capacity options based on filtered data
  const capacityOptions = [
    'Pokaż wszystkie',
    ...new Set(filteredAndSortedItems.map((item) => item.capacity.toString())),
  ]

  // Generate product functions options based on filtered data
  const functionsOptions = [
    'Pokaż wszystkie',
    ...new Set(filteredAndSortedItems.flatMap((item) => item.productFunctions)),
  ]

  useEffect(() => {
    // Reset  filters when items or searchTerm change
    setEnergyClassFilter('Pokaż wszystkie')
    setCapacityFilter('Pokaż wszystkie')
    setFunctionsFilter('Pokaż wszystkie')
  }, [items, searchTerm])

  const handleShowMore = () => {
    setShowAllItems(true)
  }

  return (
    <>
      <h1 className="text-center mb-4 text-2xl md:text-[40px] md:mb-[31px] md:py-[10px] bg-white font-bold">
        Wybierz urządzenie
      </h1>
      <div className="max-w-[1440px] m-auto lg:px-[192px]">
        <div className="px-4 ">
          <Search state={searchTerm} setState={setSearchTerm} />
          <div className="flex gap-3 flex-wrap justify-center 2xl:flex-nowrap ">
            <Filter
              state={sortBy}
              setState={setSortBy}
              label="Sortuj po:"
              options={sortByOptions}
            />
            <Filter
              state={functionsFilter}
              setState={setFunctionsFilter}
              label="Funkcje:"
              options={functionsOptions}
            />
            <Filter
              state={energyClassFilter}
              setState={setEnergyClassFilter}
              label="Klasa energetyczna:"
              options={energyClassOptions}
            />
            <Filter
              state={capacityFilter}
              setState={setCapacityFilter}
              label="Pojemność:"
              options={capacityOptions}
            />
          </div>
          <p className="mt-[10px]">
            Liczba wyników: {filteredAndSortedItems.length}{' '}
          </p>
        </div>

        <main>
          <div className=" py-6 flex flex-col items-center">
            {items.length > 0 && (
              <div className="flex flex-wrap gap-4 mb-[20px] justify-center lg:justify-start">
                {filteredAndSortedItems
                  .slice(0, showAllItems ? undefined : itemsToShowInitially)
                  .map((item) => (
                    <Card
                      {...item}
                      key={item.sku}
                      onClick={() =>
                        handleCardSelection(item.sku, setCardSelections)
                      }
                      selected={cardSelections[item.sku]}
                    />
                  ))}
              </div>
            )}
            {!showAllItems && (
              <button
                className="mb-[54px] text-custom-text-blue font-bold flex items-center gap-[9px]"
                onClick={handleShowMore}>
                <span>Pokaż więcej</span>
                <img src={BlueArrow} alt="" />
              </button>
            )}
          </div>
        </main>
      </div>
    </>
  )
}

export default App
