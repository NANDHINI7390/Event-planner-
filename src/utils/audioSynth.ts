/**
 * Procedural ambient synthesizer for The Arboretum @ ECR
 * Generates gentle coastal wind through canopy trees and soft warm acoustic harmonics
 * Uses Web Audio API without needing external MP3 files.
 */

class AmbientSoundEngine {
  private ctx: AudioContext | null = null;
  private isPlaying = false;
  private masterGain: GainNode | null = null;
  private noiseNode: AudioNode | null = null;
  private chordsInterval: number | null = null;
  private volume = 0.25;

  public init() {
    if (this.ctx) return;
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    this.ctx = new AudioCtx();
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    this.masterGain.connect(this.ctx.destination);
  }

  public toggle(): boolean {
    if (this.isPlaying) {
      this.stop();
      return false;
    } else {
      this.start();
      return true;
    }
  }

  public start() {
    this.init();
    if (!this.ctx || !this.masterGain) return;
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    this.isPlaying = true;
    this.startWindAmbience();
    this.startWarmHarmonics();
  }

  public stop() {
    this.isPlaying = false;
    if (this.masterGain && this.ctx) {
      // Fade out
      this.masterGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.5);
    }
    if (this.chordsInterval) {
      window.clearInterval(this.chordsInterval);
      this.chordsInterval = null;
    }
    setTimeout(() => {
      if (this.noiseNode) {
        try {
          this.noiseNode.disconnect();
        } catch {
          // ignore
        }
      }
    }, 600);
  }

  public setVolume(vol: number) {
    this.volume = vol;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setTargetAtTime(vol, this.ctx.currentTime, 0.1);
    }
  }

  public getIsPlaying(): boolean {
    return this.isPlaying;
  }

  private startWindAmbience() {
    if (!this.ctx || !this.masterGain) return;

    // Pink/Brown noise generator for gentle coastal breeze through trees
    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    let lastOut = 0.0;

    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      data[i] = (lastOut + (0.02 * white)) / 1.02;
      lastOut = data[i];
      data[i] *= 3.5; // Gain compensation
    }

    const noiseSource = this.ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Filter to simulate soft foliage rustling & distant sea
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(240, this.ctx.currentTime);
    filter.Q.setValueAtTime(1.5, this.ctx.currentTime);

    // Subtle LFO modulating filter for rhythmic wind gusts
    const lfo = this.ctx.createOscillator();
    lfo.frequency.setValueAtTime(0.12, this.ctx.currentTime);
    const lfoGain = this.ctx.createGain();
    lfoGain.gain.setValueAtTime(80, this.ctx.currentTime);
    lfo.connect(lfoGain);
    lfoGain.connect(filter.frequency);
    lfo.start();

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.35, this.ctx.currentTime);

    noiseSource.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.masterGain);

    noiseSource.start();
    this.noiseNode = noiseSource;
  }

  private startWarmHarmonics() {
    if (!this.ctx) return;
    // Play subtle ethereal drone chords (D minor / F major peaceful pentatonic notes: D3, A3, F4, C4, E4)
    const notes = [146.83, 220.00, 261.63, 329.63, 349.23]; // D3, A3, C4, E4, F4

    const playHarmonic = (freq: number, duration = 8) => {
      if (!this.ctx || !this.masterGain || !this.isPlaying) return;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft bell envelope
      gain.gain.setValueAtTime(0, this.ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.04, this.ctx.currentTime + 2.5);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.masterGain);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    };

    // Trigger initial warm root notes
    playHarmonic(146.83, 10);
    playHarmonic(220.00, 12);

    this.chordsInterval = window.setInterval(() => {
      if (!this.isPlaying) return;
      const randomNote = notes[Math.floor(Math.random() * notes.length)];
      playHarmonic(randomNote, 9);
    }, 4500);
  }
}

export const ambientSound = new AmbientSoundEngine();
