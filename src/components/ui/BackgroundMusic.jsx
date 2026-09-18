import { useState, useRef, useEffect } from 'react'
import { gsap } from '@/lib/gsap'

const TRACKS = [
  {
    id: 1,
    name: 'Interstellar Theme',
    artist: 'Hans Zimmer (Slowed + Reverb)',
    // Replace with your actual audio file path
    url: '/assets/audio/interstellar-theme.mp3',
    // Fallback to a similar ambient track
    fallbackUrl: 'https://www.bensound.com/bensound-music/bensound-slowmotion.mp3'
  },
  {
    id: 2,
    name: 'Stay',
    artist: 'Hans Zimmer (Slowed + Reverb)',
    // Replace with your actual audio file path
    url: '/assets/audio/stay.mp3',
    // Fallback to a similar epic track
    fallbackUrl: 'https://www.bensound.com/bensound-music/bensound-epic.mp3'
  }
]

export function BackgroundMusic() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.3)
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [isExpanded, setIsExpanded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const audioRef = useRef(null)
  const playerRef = useRef(null)

  const currentTrack = TRACKS[currentTrackIndex]

  // Handle audio playback
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume

    if (isPlaying) {
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsLoading(false)
          })
          .catch(err => {
            console.log('Audio play failed:', err)
            setIsPlaying(false)
            setIsLoading(false)
          })
      }
    } else {
      audio.pause()
    }
  }, [isPlaying, volume])

  // Update time
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const updateDuration = () => setDuration(audio.duration)
    const handleEnded = () => {
      // Auto-play next track
      nextTrack()
    }
    const handleLoadStart = () => setIsLoading(true)
    const handleCanPlay = () => setIsLoading(false)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', updateDuration)
    audio.addEventListener('ended', handleEnded)
    audio.addEventListener('loadstart', handleLoadStart)
    audio.addEventListener('canplay', handleCanPlay)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', updateDuration)
      audio.removeEventListener('ended', handleEnded)
      audio.removeEventListener('loadstart', handleLoadStart)
      audio.removeEventListener('canplay', handleCanPlay)
    }
  }, [currentTrackIndex])

  // Fade in/out on play/pause
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      gsap.to(audio, { volume: volume, duration: 1 })
    } else {
      gsap.to(audio, {
        volume: 0,
        duration: 0.5,
        onComplete: () => {
          audio.volume = volume
        }
      })
    }
  }, [isPlaying, volume])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
    if (audioRef.current) {
      audioRef.current.volume = newVolume
    }
  }

  const nextTrack = () => {
    const wasPlaying = isPlaying
    setIsPlaying(false)
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length)
    if (wasPlaying) {
      setTimeout(() => setIsPlaying(true), 100)
    }
  }

  const prevTrack = () => {
    const wasPlaying = isPlaying
    setIsPlaying(false)
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length)
    if (wasPlaying) {
      setTimeout(() => setIsPlaying(true), 100)
    }
  }

  const handleSeek = (e) => {
    const audio = audioRef.current
    if (!audio) return
    
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const percentage = x / rect.width
    audio.currentTime = percentage * duration
  }

  const formatTime = (time) => {
    if (!time || !isFinite(time)) return '0:00'
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 60)
    return `${minutes}:${seconds.toString().padStart(2, '0')}`
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div
        ref={playerRef}
        className={`music-player ${isExpanded ? 'expanded' : ''}`}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
      >
        {/* Expanded Player */}
        <div className={`player-expanded ${isExpanded ? 'visible' : ''}`}>
          {/* Track Info */}
          <div className="player-track-info">
            <div className="track-name">{currentTrack.name}</div>
            <div className="track-artist">{currentTrack.artist}</div>
          </div>

          {/* Progress Bar */}
          <div className="player-progress-container">
            <span className="time-display">{formatTime(currentTime)}</span>
            <div 
              className="progress-bar"
              onClick={handleSeek}
            >
              <div 
                className="progress-fill"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>
            <span className="time-display">{formatTime(duration)}</span>
          </div>

          {/* Controls */}
          <div className="player-controls">
            {/* Previous Track */}
            <button
              onClick={prevTrack}
              className="control-btn"
              aria-label="Previous track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
              </svg>
            </button>

            {/* Play/Pause */}
            <button
              onClick={togglePlay}
              className="control-btn control-btn-main"
              aria-label={isPlaying ? 'Pause' : 'Play'}
              disabled={isLoading}
            >
              {isLoading ? (
                <svg className="animate-spin w-6 h-6" viewBox="0 0 24 24">
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                    fill="none"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
              ) : isPlaying ? (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M8 5v14l11-7z" />
                </svg>
              )}
            </button>

            {/* Next Track */}
            <button
              onClick={nextTrack}
              className="control-btn"
              aria-label="Next track"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M16 18h2V6h-2zm-11-7l8.5-6v12z" />
              </svg>
            </button>
          </div>

          {/* Volume Control */}
          <div className="player-volume">
            <svg
              className="w-4 h-4 text-chalk-muted"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414A2 2 0 017 13h2a2 2 0 012-2v-2a4 4 0 00-4-4H7a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 012 2v2a4 4 0 004 4h2a2 2 0 002-2v-2a2 2 0 00-2-2h-2a2 2 0 01-2-2z"
              />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={handleVolumeChange}
              className="volume-slider"
              aria-label="Volume"
            />
            <span className="font-mono text-xs text-chalk-muted">
              {Math.round(volume * 100)}
            </span>
          </div>
        </div>

        {/* Compact Button */}
        <button
          onClick={togglePlay}
          className={`player-compact ${!isExpanded ? 'visible' : ''}`}
          aria-label={isPlaying ? 'Pause music' : 'Play music'}
        >
          <div className={`vinyl-record ${isPlaying ? 'spinning' : ''}`}>
            <svg viewBox="0 0 100 100" className="w-14 h-14">
              <circle cx="50" cy="50" r="48" fill="none" stroke="currentColor" strokeWidth="1" className="text-chalk-muted" />
              <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-chalk-muted opacity-50" />
              <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-chalk-muted opacity-50" />
              <circle cx="50" cy="50" r="8" fill="currentColor" className="text-chalk" />
              {[...Array(6)].map((_, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r={15 + i * 4}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.3"
                  className="text-chalk-muted opacity-30"
                />
              ))}
            </svg>
          </div>
          
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </div>

          <span className="font-mono text-[0.65rem] text-chalk-muted tracking-wider mt-2">
            {isPlaying ? 'NOW PLAYING' : 'MUSIC'}
          </span>
        </button>

        {/* Audio Element */}
        <audio
          ref={audioRef}
          preload="metadata"
          crossOrigin="anonymous"
        >
          <source src={currentTrack.url} type="audio/mpeg" />
          <source src={currentTrack.fallbackUrl} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    </div>
  )
}
