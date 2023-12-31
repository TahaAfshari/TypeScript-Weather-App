import { ChangeEvent } from 'react'
import { optionType } from './types'

type Props = {
  term: string
  options: []
  onInputChange: (e: ChangeEvent<HTMLInputElement>) => void
  onOptionSelect: (option: optionType) => void
  onSubmit: () => void
}

const Search = ({
  term,
  options,
  onInputChange,
  onOptionSelect,
  onSubmit,
}: Props): JSX.Element => {
  return (
    <main
      className="flex justify-center items-center bg-gradient-to-br 
    from-blue-400 via-gray-400 to-emerald-400 h-[100vh] w-full"
    >
      <section
        className="w-full md:max-w-[500px] p-4 flex flex-col text-center items-center justify-center md:px-10 
      lg:p-24 h-full lg:h-[500] bg-white bg-opacity-20 backdrop-blur-lg drop-shadow-lg rounded text-zinc-700"
      >
        <h1 className="text-7x1 font-thin">
          Weather <span className="font-black"></span>
        </h1>

        <p className="text-sm mt-2">search for the weather in your area</p>

        <div className="relative flex mt-10 md:mt-4">
          <input
            type="text"
            value={term}
            className="px-2 py-1 rounded-1-md border-2 border-white"
            onChange={onInputChange}
          />

          <ul className="absolute top-9 bg-white m1-1 rounded-b-md">
            {options.map((option: optionType, index: number) => (
              <li key={option.name + '-' + index}>
                <button
                  className="text-left text-sm w-full hover:bg-zinc-700 hover:text-white
              px-2 py-1 cursor-pointer"
                  onClick={() => onOptionSelect(option)}
                >
                  {option.name}, {option.country}
                </button>
              </li>
            ))}
          </ul>

          <button
            className="rounded-r-md border-2 border-zinc-100
          hover:border-zinc-500 hover:text-zinc-500 text-zinc-100
          px-2 py-1 cursor-pointer"
            onClick={onSubmit}
          >
            search
          </button>
        </div>
      </section>
    </main>
  )
}

//Notes on tailwind CSS
//md: max-w-[500px] means 500 max width with a medium screen
//zing-"number" is the intensity of the color

//if there is a problem with the search bar, go back to minute 56 on the video

export default Search
