# Audio Assets

## 1. Glitch Sound Effect (Footer Animation) 🔊

### Quick Setup:

**To add a custom glitch sound:**

1. **Download a glitch sound** from:
   - https://pixabay.com/sound-effects/search/glitch/
   - https://freesound.org/ (search "glitch")
   - Any royalty-free sound library

2. **Save as**: `glitch.mp3`

3. **Place here**: `public/assets/audio/glitch.mp3`

4. **Update Footer.jsx**:
   - Open: `src/components/layout/Footer.jsx`
   - Find the `playGlitchSound` function
   - Uncomment OPTION 1 (file-based audio)
   - Comment out OPTION 2 (synthesized audio)

**Sound Specifications:**
- Format: MP3
- Duration: 0.3-1.0 seconds
- Size: <100KB
- Type: Digital glitch/static burst

**Current Status:**
- ✅ Synthesized glitch (active now)
- 📁 Ready for real file (when you add it)

See `HOW_TO_ADD_GLITCH_SOUND.md` for detailed instructions.

---

## 2. Music Player Audio Files

### Add Your Interstellar Tracks Here

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
        ├── glitch.mp3              ← Add glitch sound here
        ├── interstellar-theme.mp3  ← Add music file
        ├── stay.mp3                ← Add music file
        └── README.md               ← This file
```

### Testing Your Audio

1. Add the audio files
2. Open http://localhost:5179/
3. For glitch: Scroll to footer and listen
4. For music: Click music player button (bottom-right)
5. Check browser console (F12) for any errors

### Copyright Notice

⚠️ **Important**: Ensure you have the rights to use any audio files you add. Use royalty-free sounds or obtain proper licenses.
