/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import LocalStorage from '../../../../utils/helpers/localStorage';
import icons from '../../../../icons';
import FollowedArtistView from '../FollowedArtistView.js';
import LoadingFallback from '../../../../modules/LoadingFallback';

const FavoriteArtists = () => {
  const { Loading } = icons;
  const [favoritesArtists, setFavoritesArtists] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isFollowedArtistView, setIsFollowedArtistView] =
    useState(false);
  const id = LocalStorage.get('zik-stream-user-uuid');

  const loadFavoriteArtists = useCallback(async () => {
    setIsLoading(true);
    const response = await axios.post(
      '/api/artist/getFavoriteArtists',
      {
        userId: id,
      },
    );

    console.log('my artist ', response);

    if (response.status === 200) {
      setFavoritesArtists(response.data.favoriteArtists);
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    loadFavoriteArtists();
  }, [loadFavoriteArtists]);

  const unfollowArtist = async (artist) => {
    const response = await axios.delete(
      '/api/update/removeFavoriteArtist',
      {
        data: {
          userId: id,
          artist,
        },
      },
    );

    if (response.status === 200) loadFavoriteArtists();
  };

  const toogleFolloweArtistView = () => {
    setIsFollowedArtistView(!isFollowedArtistView);
  };

  if (isLoading) return <LoadingFallback />;

  if (!isLoading && favoritesArtists.length === 0)
    return (
      <div className="w-full flex justify-center mt-5">
        <p className="text-3xl flex flex-col justify-center">
          <span className="text-center text-5xl py-4">🙁</span>
          <span>No Followed Artist found</span>
        </p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-6">
      {favoritesArtists.map((artist, index) => {
        return (
          <div key={index} className="text-center">
            <div className="w-80 h-80 relative">
              <img
                src={artist.artist_profile}
                alt={artist.artist_name}
                className="object-cover rounded-full w-80 h-80"
              />
              <div
                className="absolute w-full rounded-full h-full top-0 l
                            eft-0 right-0 bottom-0 flex justify-center
                            items-center bg-black transition ease-in-out delay-150 bg-opacity-0 opacity-0
                            hover:bg-opacity-50 hover:opacity-100 cursor-pointer"
                onClick={toogleFolloweArtistView}
              >
                <button
                  className="bg-blue-500 flex 
                             items-center text-white px-3 py-2
                             bg-opacity-100 rounded-md"
                  onClick={() => unfollowArtist(artist)}
                >
                  Unfollow
                </button>
              </div>
            </div>
            <p className="py-3 text-center">{artist.artist_name}</p>
            {isFollowedArtistView && (
              <FollowedArtistView
                artist={artist}
                toggleArtistView={toogleFolloweArtistView}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default FavoriteArtists;