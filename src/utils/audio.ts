const audioCtxRef: { current: AudioContext | null } = { current: null };

function getContext(): AudioContext {
  if (!audioCtxRef.current) {
    audioCtxRef.current = new AudioContext();
  }
  if (audioCtxRef.current.state === "suspended") {
    audioCtxRef.current.resume();
  }
  return audioCtxRef.current;
}

export function playBirthdayMelody() {
  const ctx = getContext();
  const now = ctx.currentTime;
  const notes = [523.25, 587.33, 659.25, 698.46, 659.25, 587.33, 523.25, 587.33, 659.25, 783.99, 698.46, 659.25];
  const durations = [0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 0.5, 0.25, 0.25, 1.0];
  let t = now;
  notes.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = freq;
    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + durations[i] * 0.9);
    osc.connect(gain).connect(ctx.destination);
    osc.start(t);
    osc.stop(t + durations[i]);
    t += durations[i];
  });
}

export function playBlowWhoosh() {
  const ctx = getContext();
  const bufferSize = ctx.sampleRate * 0.6;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / bufferSize, 2);
  }
  const source = ctx.createBufferSource();
  source.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = "bandpass";
  filter.frequency.value = 800;
  filter.Q.value = 0.5;
  const gain = ctx.createGain();
  gain.gain.setValueAtTime(0.3, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
  source.connect(filter).connect(gain).connect(ctx.destination);
  source.start();
}

export function playFanfare() {
  const ctx = getContext();
  const now = ctx.currentTime;
  const chords = [
    [523.25, 659.25, 783.99],
    [587.33, 739.99, 880],
    [659.25, 783.99, 987.77],
    [523.25, 659.25, 783.99, 1046.5],
  ];
  chords.forEach((chord, ci) => {
    chord.forEach((freq) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.value = freq;
      const start = now + ci * 0.3;
      gain.gain.setValueAtTime(0.12, start);
      gain.gain.exponentialRampToValueAtTime(0.001, start + 0.8);
      osc.connect(gain).connect(ctx.destination);
      osc.start(start);
      osc.stop(start + 0.8);
    });
  });
}

export function playStampSound() {
  const ctx = getContext();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = "square";
  osc.frequency.setValueAtTime(200, ctx.currentTime);
  osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.1);
  gain.gain.setValueAtTime(0.15, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);
  osc.connect(gain).connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.15);
}

let musicBoxInterval: ReturnType<typeof setInterval> | null = null;

export function startMusicBox() {
  stopMusicBox();
  const ctx = getContext();
  const melody = [523.25, 587.33, 659.25, 523.25, 659.25, 587.33, 523.25, 493.88];
  let idx = 0;
  musicBoxInterval = setInterval(() => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = "sine";
    osc.frequency.value = melody[idx % melody.length];
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.connect(gain).connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
    idx++;
  }, 500);
}

export function stopMusicBox() {
  if (musicBoxInterval) {
    clearInterval(musicBoxInterval);
    musicBoxInterval = null;
  }
}
