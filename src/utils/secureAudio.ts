/**
 * Secure Audio Utilities for Shyam Express
 * Implements a synthesized orchestral drone pad and a secure memory-buffered player.
 */

function base64ToArrayBuffer(base64String: string): ArrayBuffer {
  const base64Clean = base64String.split(",")[1] || base64String;
  const binaryString = window.atob(base64Clean);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes.buffer;
}

export class CinematicOrchestraSynth {
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private activeNodes: { osc: OscillatorNode; gain: GainNode }[] = [];
  private currentChordIndex = 0;
  private intervalId: any = null;

  // Atmospheric, soothing cinematic progression of grand frequencies (Hz):
  // Chord 1: C Major 9
  // Chord 2: F Major 7 (subtle shift to warm hope)
  // Chord 3: A Minor 9 (emotional vulnerability)
  // Chord 4: G Major sus4 (uplifting turnaround)
  private chords = [
    [65.41, 130.81, 196.00, 293.66, 329.63, 392.00, 493.88], // C9
    [87.31, 130.81, 220.00, 329.63, 349.23, 440.00, 523.25], // Fmaj7
    [110.00, 164.81, 261.63, 392.00, 493.88, 523.25, 659.25], // Am9
    [98.00, 146.83, 196.00, 261.63, 293.66, 392.00, 493.88]  // Gsus4
  ];

  constructor() {}

  start() {
    if (this.ctx) return;
    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!AudioContextClass) return;

    try {
      this.ctx = new AudioContextClass();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.18, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      // Initial chord play
      this.playChord(this.chords[this.currentChordIndex]);

      // Change chords smoothly every 8 seconds
      this.intervalId = setInterval(() => {
        this.currentChordIndex = (this.currentChordIndex + 1) % this.chords.length;
        this.transitionToChord(this.chords[this.currentChordIndex]);
      }, 8000);
    } catch (e) {
      console.error("Failed to start synthesizer context:", e);
    }
  }

  private playChord(freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    try {
      // Create a biquad filter to make it sound warm, soft and cinematic
      const filter = this.ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(680, now);
      filter.Q.setValueAtTime(1.2, now);
      filter.connect(this.masterGain);

      // Simple echo/reverb simulator using delay and feedback
      const delay = this.ctx.createDelay();
      delay.delayTime.setValueAtTime(0.55, now);
      const delayGain = this.ctx.createGain();
      delayGain.gain.setValueAtTime(0.38, now);

      delay.connect(delayGain);
      delayGain.connect(delay);
      delay.connect(this.masterGain);
      filter.connect(delay);

      freqs.forEach((freq, index) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const oscGain = this.ctx.createGain();

        // Base notes (lower frequencies) are deep sine drones
        // Higher notes are lush warm triangle waves
        osc.type = index < 2 ? "sine" : "triangle";
        osc.frequency.setValueAtTime(freq, now);

        // Add small random detuning for chorus/ensemble feel
        osc.detune.setValueAtTime((Math.random() - 0.5) * 14, now);

        // Slow cinematic swelling envelope (4 seconds attack)
        oscGain.gain.setValueAtTime(0, now);
        oscGain.gain.linearRampToValueAtTime(0.09 / freqs.length, now + 4.0);

        osc.connect(oscGain);
        oscGain.connect(filter);

        osc.start(now);
        this.activeNodes.push({ osc, gain: oscGain });
      });
    } catch (e) {
      console.error("Synthesizer playback error:", e);
    }
  }

  private transitionToChord(freqs: number[]) {
    if (!this.ctx || !this.masterGain) return;
    const now = this.ctx.currentTime;

    const oldNodes = [...this.activeNodes];
    this.activeNodes = [];

    // Smoothly fade out previous notes to avoid clicks
    oldNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 4.2);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
            gain.disconnect();
          } catch (err) {}
        }, 4600);
      } catch (err) {}
    });

    // Fade in new notes
    this.playChord(freqs);
  }

  stop() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }

    const now = this.ctx ? this.ctx.currentTime : 0;
    this.activeNodes.forEach(({ osc, gain }) => {
      try {
        gain.gain.setValueAtTime(gain.gain.value, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
        setTimeout(() => {
          try {
            osc.stop();
            osc.disconnect();
            gain.disconnect();
          } catch (err) {}
        }, 1500);
      } catch (err) {}
    });
    this.activeNodes = [];

    if (this.ctx) {
      const currentContext = this.ctx;
      setTimeout(() => {
        try {
          currentContext.close();
        } catch (err) {}
      }, 1500);
      this.ctx = null;
      this.masterGain = null;
    }
  }

  setVolume(vol: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(vol * 0.28, this.ctx.currentTime);
    }
  }
}

export class SecureAudioPlayer {
  private ctx: AudioContext | null = null;
  private sourceNode: AudioBufferSourceNode | null = null;
  private gainNode: GainNode | null = null;
  private startTime: number = 0;
  private pauseTime: number = 0;
  private isPlaying: boolean = false;
  private audioBuffer: AudioBuffer | null = null;
  private currentBase64: string | null = null;
  private onTimeUpdate: ((current: number, duration: number) => void) | null = null;
  private intervalId: any = null;

  constructor() {}

  async loadSong(base64: string, onProgress?: (msg: string) => void): Promise<void> {
    this.stop();
    this.currentBase64 = base64;

    const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
    if (!this.ctx) {
      this.ctx = new AudioContextClass();
    }

    // Force context resume if suspended
    if (this.ctx.state === "suspended") {
      await this.ctx.resume();
    }

    if (onProgress) onProgress("Parsing secure track binary...");
    const arrayBuffer = base64ToArrayBuffer(base64);

    if (onProgress) onProgress("Decoding high-fidelity stream...");
    try {
      this.audioBuffer = await this.ctx.decodeAudioData(arrayBuffer);
      this.pauseTime = 0;
      this.isPlaying = false;
      if (onProgress) onProgress("Decoded");
    } catch (err) {
      if (onProgress) onProgress("Decoding failed. Unsupported audio format.");
      throw err;
    }
  }

  play(volume: number, onTimeUpdate: (current: number, duration: number) => void) {
    if (!this.ctx || !this.audioBuffer) return;
    this.stopSource();

    this.onTimeUpdate = onTimeUpdate;

    this.sourceNode = this.ctx.createBufferSource();
    this.sourceNode.buffer = this.audioBuffer;
    this.sourceNode.loop = true;

    this.gainNode = this.ctx.createGain();
    this.gainNode.gain.setValueAtTime(volume, this.ctx.currentTime);

    this.sourceNode.connect(this.gainNode);
    this.gainNode.connect(this.ctx.destination);

    const offset = this.pauseTime % this.audioBuffer.duration;
    this.sourceNode.start(0, offset);
    this.startTime = this.ctx.currentTime - offset;
    this.isPlaying = true;

    this.startTracking();
  }

  private startTracking() {
    if (this.intervalId) clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (this.isPlaying && this.ctx && this.audioBuffer && this.onTimeUpdate) {
        const elapsed = this.ctx.currentTime - this.startTime;
        this.onTimeUpdate(elapsed % this.audioBuffer.duration, this.audioBuffer.duration);
      }
    }, 250);
  }

  private stopTracking() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  pause() {
    if (!this.isPlaying || !this.ctx) return;
    this.pauseTime = this.ctx.currentTime - this.startTime;
    this.stopSource();
    this.isPlaying = false;
    this.stopTracking();
  }

  stop() {
    this.pauseTime = 0;
    this.stopSource();
    this.isPlaying = false;
    this.stopTracking();
    this.audioBuffer = null;
    this.currentBase64 = null;
  }

  private stopSource() {
    if (this.sourceNode) {
      try {
        this.sourceNode.stop();
        this.sourceNode.disconnect();
      } catch (err) {}
      this.sourceNode = null;
    }
    if (this.gainNode) {
      try {
        this.gainNode.disconnect();
      } catch (err) {}
      this.gainNode = null;
    }
  }

  setVolume(vol: number) {
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(vol, this.ctx.currentTime);
    }
  }

  getIsPlaying() {
    return this.isPlaying;
  }

  getCurrentSongBase64() {
    return this.currentBase64;
  }
}
