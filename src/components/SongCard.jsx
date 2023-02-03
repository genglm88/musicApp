import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"

import PlayPause from "./PlayPause"
import { playPause, setActiveSong } from "../redux/features/playerSlice"

const SongCard = ({ song, isPlaying, activeSong, i, data }) => {
  const dispatch = useDispatch()
  const defaultImg =
    "https://images.pexels.com/photos/210764/pexels-photo-210764.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"

  const handlePauseClick = () => {
    dispatch(playPause(false))
  }

  const handlePlayClick = () => {
    dispatch(setActiveSong({ song, data, i }))
    dispatch(playPause(true))
  }

  return (
    <div className="flex flex-col w-[250px] p-4 bg-white/5 bg-opacity-80 backdrop-blur-sm animate-slidedup rounded-lg cursor-pointer">
      <div className="relative w-full h-56 group">
        <div
          className={`absolute inset-0 justify-center items-center bg-black bg-opacity-50 group-hover:flex ${
            activeSong?.title === song.title
              ? "flex bg-black bg-opacity-70"
              : "hidden"
          }`}
        >
          <PlayPause
            isPlaying={isPlaying}
            activeSong={activeSong}
            song={song}
            handlePause={handlePauseClick}
            handlePlay={handlePlayClick}
          />
        </div>
        <img
          alt="song_img"
          src={song.images ? song.images?.coverart : defaultImg} className="object-cover w-full h-full"
        />
      </div>
      <div className="mt-4 flex flex-col">
        <p className="font-semibold text-lg text-indigo-100 truncate">
          <Link to={`/songs/${song?.key}`}>{song.title}</Link>
        </p>
        <p className="text-sm text-indigo-200 truncate mt-1">
          <Link
            to={
              song.artists
                ? `/artists/${song?.artists[0]?.adamid}`
                : "/top-artists"
            }
          >
            {song.subtitle}
          </Link>
        </p>
      </div>
    </div>
  )
}

export default SongCard
