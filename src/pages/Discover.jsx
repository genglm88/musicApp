import { useDispatch, useSelector } from "react-redux"
import { genres } from "../assets/constants"
import Error from "../components/Error"
import Loader from "../components/Loader"
import SongCard from "../components/SongCard"
import { useGetTopChartsQuery } from "../redux/services/shazamCore"
import { selectGenreListId } from "../redux/features/playerSlice"
import {
  useGetSongsBySearchQuery,
  useGetSongsBySearchNext5Query,
} from "../redux/services/shazamCore"

const songExtract = (data) => {
  return data?.tracks?.hits.map((song) => song.track)
}

const Discover = () => {
  let fetchedSong ={}
  const dispatch = useDispatch()
  const { activeSong, isPlaying, genreListId } = useSelector(
    (state) => state.player
  )
  const { data, isFetching, error } = useGetTopChartsQuery()
  if (isFetching) return <Loader title="Loading songs..." />
  if (error) return <Error />
  fetchedSong = {...data}

  if (genreListId) {
    const { data:dataOther, isFetching:isFetchingOther, error:errorOther } =
      useGetSongsBySearchQuery(genreListId)
    const {
      data: dataNext5,
      isFetching:isFetchingNext5,
      error:errorNext5
    } = useGetSongsBySearchNext5Query(genreListId)
    if (isFetchingOther || isFetchingNext5)
      return <Loader title="Loading top charts" />
    if (errorOther || errorNext5) return <Error />
    const searchResults = songExtract(dataNext5).concat(songExtract(dataOther))
    fetchedSong = { tracks: [...searchResults] }
  }

  return (
    <div className="flex flex-col">
      <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-4 mb-10">
        <h2 className="font-bold text-3xl text-indigo-100 text-left">
          Discover {genreListId}
        </h2>
        <select
          onChange={(e) => dispatch(selectGenreListId(e.target.value))}
          value={genreListId || "pop"}
          className="bg-gray-800 text-gray-300 p-3 text-sm rounded-lg outline-none sm:mt-0 mt-5"
        >
          {genres.map((genre) => (
            <option key={genre.value} value={genre.value}>
              {genre.title}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-wrap sm:justify-start justify-center gap-8">
        {fetchedSong?.tracks.map((song, index) => (
          <SongCard
            key={song.key}
            song={song}
            isPlaying={isPlaying}
            activeSong={activeSong}
            i={index}
            data={fetchedSong}
          />
        ))}
      </div>
    </div>
  )
}

export default Discover
