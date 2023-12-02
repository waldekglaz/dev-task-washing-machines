interface SearchProps {
  state: string
  setState: (arg0: string) => void
}

function Search({ state, setState }: SearchProps) {
  return (
    <input
      className="block m-auto placeholder:text-black p-2 mb-3 md:mb-[34px]"
      type="text"
      placeholder="Search..."
      value={state}
      onChange={(e) => setState(e.target.value)}
    />
  )
}

export default Search
