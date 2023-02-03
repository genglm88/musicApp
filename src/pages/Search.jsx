import React from "react"
import { Error, Loader, SongCard } from "../components"
import { useSelector } from "react-redux"
import {
  useGetSongsBySearchQuery,
  useGetSongsBySearchNext5Query,
  useGetSongsBySearchNext10Query,
} from "../redux/services/shazamCore"
import { useParams } from "react-router-dom"

const songExtract = (data) => {
  return data?.tracks?.hits.map((song) => song.track)
}

const Search = () => {
  const { searchTerm } = useParams()

  const { activeSong, isPlaying } = useSelector((state) => state.player)
  const { data, isFetching, error } = useGetSongsBySearchQuery(searchTerm)
  const {
    data: dataNext5,
    isFetching: isFetchingNext5,
    error: errorNext5,
  } = useGetSongsBySearchNext5Query(searchTerm)
  // const {
  //   data: dataNext10,
  //   isFetchingNext10,
  //   errorNext10,
  // } = useGetSongsBySearchNext10Query(searchTerm)


  if (isFetching || isFetchingNext5)
    return <Loader title="Loading top charts" />
  if (error || errorNext5) return <Error />
  const searchResults = songExtract(dataNext5).concat(songExtract(data))

  return (
    <div className="flex flex-col">
      <h2 className="font-bold text-3xl text-indigo-200 text-left mt-4 mb-10">
        <span className="font-black">"{searchTerm}"</span> Songs
      </h2>
      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {searchResults?.map((song, i) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            data={searchResults}
            i={i}
          />
        ))}
      </div>
    </div>
  )
}

export default Search
