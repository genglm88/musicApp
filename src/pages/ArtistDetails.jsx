import { useParams } from "react-router-dom"

import { DetailsHeader, Error, Loader, RelatedSongs } from "../components"

import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import {
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
} from "../redux/services/shazamCore"

const ArtistDetails = () => {
  const { id: artistid } = useParams()
  const { activeSong, isPlaying } = useSelector((state) => state.player)

  const { data: artistData, isFetching: isFetchingArtistDetails } =
    useGetArtistDetailsQuery(artistid)
  const { data: artistTopSongs, isFetching: isFetchingArtistTopSongs } =
    useGetArtistTopSongsQuery(artistid)

  if (isFetchingArtistDetails || isFetchingArtistTopSongs) return <Loader />

  return (
    <div className="flex flex-col ">
      <DetailsHeader artistId={artistid} artistData={artistData.data[0]} />

      <RelatedSongs
        data={artistTopSongs.data}
        isPlaying={isPlaying}
        activeSong={activeSong}
        artistId={artistid}
      />
    </div>
  )
}

export default ArtistDetails
