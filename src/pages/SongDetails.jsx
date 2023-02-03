import { useParams } from "react-router-dom"

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"
import { setActiveSong, playPause } from "../redux/features/playerSlice"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import { useGetSongDetailsQuery } from "../redux/services/shazamCore"
import { useGetSongRelatedQuery } from "../redux/services/shazamCore"

const SongDetails = () => {
  const dispatch = useDispatch()
  const { songid } = useParams()

  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  const { data: songData, isFetching: isFetchingSongDetails } =
    useGetSongDetailsQuery({ songid })

  const { data: relatedSongData, isFetching: isFetchingRelatedSongData } =
    useGetSongRelatedQuery({ songid })

  if (isFetchingSongDetails || isFetchingRelatedSongData) return <Loader />

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId="" songData={songData} />
      <div className="mb-10">
        <h2 className="text-indigo-200 text-3xl font-bold">Lyrics</h2>
        <div className="mt-5">
          <p className="text-indigo-200 text-sm">
            {songData?.sections[1]?.type === "LYRICS" ? (
              songData?.sections[1]?.text.map((line, index) => (
                <p key={index} className="text-gray-400 text-base my-1">
                  {line}
                </p>
              ))
            ) : (
              <p key={index} className="text-gray-400 text-base my-1">
                no lyrics available.
              </p>
            )}
          </p>
        </div>
      </div>

      <RelatedSongs
        data={relatedSongData.tracks}
        isPlaying={isPlaying}
        activeSong={activeSong}
        handlePauseClick={handlePauseClick}
        handlePlayClick={handlePlayClick}
        artistId=""
      />
    </div>
  )
}

export default SongDetails
