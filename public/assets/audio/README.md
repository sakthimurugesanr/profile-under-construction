# Music Player Audio Files

## Add Your Interstellar Tracks Here

To use your own Interstellar slowed + reverb tracks, add these files to this folder:

### Required Files

1. **interstellar-theme.mp3**
   - Interstellar Main Theme (Slowed + Reverb)
   - File name: `interstellar-theme.mp3`

2. **stay.mp3**
   - Stay (Slowed + Reverb)
   - File name: `stay.mp3`

### How to Add Your Music

1. Download or create your Interstellar slowed + reverb tracks
2. Rename them to match the exact file names above
3. Place them in this folder: `public/assets/audio/`
4. Refresh your browser - the music player will automatically load them!

### Fallback Music

If the files are not found, the player will use fallback ambient tracks from Bensound.

### File Format Requirements

- **Format**: MP3 (recommended)
- **Bitrate**: 128-320 kbps
- **Sample Rate**: 44.1 kHz or 48 kHz
- **File Size**: Keep under 10MB per track for faster loading

### Where to Get Interstellar Music (Slowed + Reverb)

You can:
1. Search YouTube for "Interstellar theme slowed reverb"
2. Use tools like `youtube-dl` to download (for personal use only)
3. Create your own slowed + reverb version using audio software

### Supported Audio Formats

The player supports these formats (in order of preference):
- MP3 (.mp3)
- OGG Vorbis (.ogg)
- WAV (.wav) - not recommended (large file size)
- AAC (.m4a)

### Example File Structure

```
public/
└── assets/
    └── audio/
        ├── interstellar-theme.mp3  ← Add this file
        ├── stay.mp3                 ← Add this file
        └── README.md               ← This file
```

### Testing Your Music

1. Add the audio files
2. Open http://localhost:5179/
3. Click the music player button (bottom-right)
4. If your files are loaded, you'll see the track names
5. If not, check the browser console (F12) for errors

### Copyright Notice

⚠️ **Important**: Ensure you have the rights to use any audio files you add. The Interstellar soundtrack is copyrighted by Hans Zimmer and Warner Bros. Use for personal projects only.
