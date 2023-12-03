import { useState, useEffect } from 'react'
import './App.css'
import Card from './components/Card'
import Search from './components/Search'
import BlueArrow from './assets/blue-arrow.svg'
import Filter from './components/Filter'
import { sortByOptions } from './utils/constants'
import { handleCardSelection, extractOptions } from './utils/utils'
import { Item } from './types/types'
import { productSKU } from './utils/constants'

function App() {
  const [items, setItems] = useState([])
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

  const [isLoading, setIsLoading] = useState<boolean>(true)

  const BASE_URL = `https://searchapi.samsung.com/v6/front/b2c/product/card/detail/newhybris?siteCode=pl&modelList=${productSKU.join(
    ',',
  )}&commonCodeYN=N&saleSkuYN=N&onlyRequestSkuYN=N&keySummaryYN=Y&shopSiteCode=pl`

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(BASE_URL)
        const data = await response.json()
        const { productList } = data.response.resultData
        setItems(productList)
      } catch (err) {
        console.log(err.message)
        setItems([])
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [BASE_URL])
  const [showAllItems, setShowAllItems] = useState<boolean>(false)

  const itemsToShowInitially = 6

  const filteredAndSortedItems = items
    .filter((item) => {
      const matchesSearchTerm = item.modelList[0].displayName
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

      const matchesEnergyClass =
        energyClassFilter === 'Pokaż wszystkie' ||
        item.modelList[0].energyLabelGrade === energyClassFilter

      const matchesCapacity =
        capacityFilter === 'Pokaż wszystkie' ||
        item.chipOptions[1]?.optionList[0]?.optionCode === capacityFilter

      const matchesFunctions =
        functionsFilter === 'Pokaż wszystkie' ||
        extractOptions(item.modelList[0].keySummary).some((func) =>
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
        return +a.modelList[0].price - +b.modelList[0].price
      } else if (sortBy === 'Cena malejąco') {
        return +b.modelList[0].price - +a.modelList[0].price
      } else if (sortBy === 'Popularność') {
        return +b.modelList[0].ratings - +a.modelList[0].ratings
      }
      return 0
    })

  // Generate energy class options based on filtered data
  const energyClassOptions = [
    'Pokaż wszystkie',
    ...new Set(
      filteredAndSortedItems.map((item) => item.modelList[0].energyLabelGrade),
    ),
  ]

  // Generate capacity options based on filtered data
  const capacityOptions = [
    'Pokaż wszystkie',
    ...new Set(
      filteredAndSortedItems.map(
        (item) => item.chipOptions[1]?.optionList[0]?.optionCode,
      ),
    ),
  ]

  // Generate product functions options based on filtered data
  const functionsOptions = [
    'Pokaż wszystkie',
    ...new Set(
      filteredAndSortedItems.flatMap((item) =>
        extractOptions(item.modelList[0].keySummary),
      ),
    ),
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
                      key={item.familyId}
                      name={item.modelList[0].displayName}
                      energyClass={item.modelList[0].energyLabelGrade}
                      img={item.modelList[0].thumbUrl}
                      price={item.modelList[0].price}
                      capacity={item?.chipOptions[1]?.optionList[0]?.optionCode}
                      onClick={() =>
                        handleCardSelection(item.familyId, setCardSelections)
                      }
                      selected={cardSelections[item.familyId]}
                      productFunctions={item.modelList[0].keySummary}
                    />
                  ))}
              </div>
            )}
            {isLoading && <p>loading...</p>}
            {!showAllItems &&
              filteredAndSortedItems.length > itemsToShowInitially && (
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
