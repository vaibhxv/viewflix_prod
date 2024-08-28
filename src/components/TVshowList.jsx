import React, { useState } from 'react';
import showData from './TVshowData.json';

const MovieList = () => {
  const [selectedSeason, setSelectedSeason] = useState(showData.seasons[0]);
  const [videoUrl, setVideoUrl] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleEpisodeClick = (videoUrl) => {
    setVideoUrl(videoUrl);
  };

  const closeModal = () => {
    setVideoUrl(null);
  };

  const handleSeasonSelect = (season) => {
    setSelectedSeason(season);
    setDropdownOpen(false);
  };

  return (
    <div className="w-full bg-gray-800 text-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="">
      <img
          src={showData.thumbnail}
          alt={showData.title}
          className="w-full lg:w-1/3 rounded-lg shadow-lg mb-8 lg:mb-8 lg:top-1"
        />
        <div className="lg:ml-8 lg:w-2/3">
          <h1 className="text-3xl font-bold mb-4">{showData.title}</h1>
          <p className="text-lg mb-4">{showData.description}</p>
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-2">Season Selector</h2>
            <div className="relative inline-block text-left">
              <div>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="inline-flex justify-between w-full rounded-md border border-gray-600 shadow-sm px-4 py-2 bg-gray-700 text-sm font-medium text-white hover:bg-gray-600 focus:outline-none"
                >
                  Season {selectedSeason.seasonNumber}
                  <svg
                    className="ml-2 -mr-1 h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path fillRule="evenodd" d="M10 3a1 1 0 01.707.293l4 4a1 1 0 01-1.414 1.414L10 5.414 6.707 8.707A1 1 0 015.293 7.293l4-4A1 1 0 0110 3z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              {dropdownOpen && (
                <div className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-gray-700 ring-1 ring-black ring-opacity-5">
                  <div className="py-1">
                    {showData.seasons.map(season => (
                      <button
                        key={season.seasonNumber}
                        onClick={() => handleSeasonSelect(season)}
                        className="block px-4 py-2 text-sm w-full text-left hover:bg-gray-600 text-white"
                      >
                        Season {season.seasonNumber}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="mt-6 space-y-4">
              <h3 className="text-lg font-semibold">Episodes</h3>
              <ul className="space-y-2">
                {selectedSeason.episodes.map(episode => (
                  <li
                    key={episode.episodeNumber}
                    className="cursor-pointer hover:bg-gray-600 p-2 rounded-lg flex items-center space-x-2"
                    onClick={() => handleEpisodeClick(episode.videoUrl)}
                  >
                    <img src={episode.thumbnail} alt={episode.title} className="w-16 h-16 rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-medium">{episode.title}</h4>
                      <p className="text-sm text-gray-400">{episode.duration}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {videoUrl && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white p-4 rounded-lg shadow-lg relative w-full max-w-3xl">
            <button 
              onClick={closeModal} 
              className="absolute top-4 right-4 text-red-500 hover:text-red-700 text-3xl font-bold"
            >
              &times;
            </button>
            <iframe 
              src={videoUrl} 
              className="w-full h-72" 
              frameBorder="0" 
              allow="autoplay; encrypted-media" 
              allowFullScreen
              title="Episode Video"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieList;
