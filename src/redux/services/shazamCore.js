import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const shazamPApi = createApi({
  reducerPath: "shazamPApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam.p.rapidapi.com",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
      )
      return headers
    },
  }),
  endpoints: (builder) => ({
    getTopCharts: builder.query({ query: () => `/charts/track` }),
    getSongDetails: builder.query({
      query: ({ songid }) => `/songs/get-details?key=${songid}&locale=en-US`}),
    getSongRelated: builder.query({
      query: ({ songid }) =>
        `/songs/list-recommendations?key=${songid}&locale=en-US`}),
    getArtistDetails: builder.query({
      query: (artistid) => `/artists/get-details?id=${artistid}&l=en-US`}),
    getArtistTopSongs: builder.query({
      query: (artistid) => `/artists/get-top-songs?id=${artistid}&l=en-US`}),  
    getSongsBySearch: builder.query({query: (searchTerm) => `/search?term=${searchTerm}&limit=10`}),  
    getSongsBySearchNext5: builder.query({query: (searchTerm) => `/search?term=${searchTerm}&offset=6&limit=10`}),  
    getSongsBySearchNext10: builder.query({query: (searchTerm) => `/search?term=${searchTerm}&offset=11&limit=10`}),  
}),
})

export const {
  useGetTopChartsQuery,
  useGetSongDetailsQuery,
  useGetSongRelatedQuery,
  useGetArtistDetailsQuery,
  useGetArtistTopSongsQuery,
  useGetSongsBySearchQuery,
  useGetSongsBySearchNext5Query,
  useGetSongsBySearchNext10Query,
} = shazamPApi

/////////////---------------------
export const shazam8Api = createApi({
  reducerPath: "shazam8Api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://shazam8.p.rapidapi.com/",
    prepareHeaders: (headers) => {
      headers.set(
        "X-RapidAPI-Key", import.meta.env.VITE_SHAZAM_CORE_RAPID_API_KEY,
      )
      return headers
    },
  }),
  endpoints: (builder) => ({
    
    getSongsByCountry: builder.query({ query: (countryCode) => `/track/top/country?country_code=${countryCode}&limit=10` })}),
})

export const {
  useGetSongsByCountryQuery,
} = shazam8Api

// const options = {
//   method: 'GET',
//   headers: {
//     'X-RapidAPI-Key': ',
//     'X-RapidAPI-Host': 'shazam.p.rapidapi.com'
//   }
// };

// fetch('https://shazam.p.rapidapi.com/artists/get-details?id=567072&l=en-US', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));