// minimal synth
var minimal = {
    noteNames       : ["A0", "Bb0", "B0", "C1", "Db1", "D1", "Eb1", "E1", "F1", "Gb1", "G1", "Ab1", "A1", "Bb1", "B1", "C2", "Db2", "D2", "Eb2", "E2", "F2", "Gb2", "G2", "Ab2", "A2", "Bb2", "B2", "C3", "Db3", "D3", "Eb3", "E3", "F3", "Gb3", "G3", "Ab3", "A3", "Bb3", "B3", "C4", "Db4", "D4", "Eb4", "E4", "F4", "Gb4", "G4", "Ab4", "A4", "Bb4", "B4", "C5", "Db5", "D5", "Eb5", "E5", "F5", "Gb5", "G5", "Ab5", "A5", "Bb5", "B5", "C6", "Db6", "D6", "Eb6", "E6", "F6", "Gb6", "G6", "Ab6", "A6", "Bb6", "B6", "C7", "Db7", "D7", "Eb7", "E7", "F7", "Gb7", "G7", "Ab7", "A7", "Bb7", "B7", "C8"],
    noteFrequencies : {"A0": 27.5, "A1": 55, "A2": 110, "A3": 220, "A4": 440, "A5": 880, "A6": 1760, "A7": 3520, "A#0": 29.13523509488062, "A#1": 58.27047018976124, "A#2": 116.54094037952248, "A#3": 233.08188075904496, "A#4": 466.1637615180898, "A#5": 932.3275230361796, "A#6": 1864.6550460723593, "A#7": 3729.3100921447185, "Ab1": 51.91308719749314, "Ab2": 103.82617439498628, "Ab3": 207.65234878997256, "Ab4": 415.3046975799451, "Ab5": 830.6093951598904, "Ab6": 1661.2187903197807, "Ab7": 3322.4375806395615, "B0": 30.867706328507758, "B1": 61.735412657015516, "B2": 123.470825314031, "B3": 246.941650628062, "B4": 493.88330125612424, "B5": 987.7666025122485, "B6": 1975.533205024497, "B7": 3951.066410048994, "Bb0": 29.13523509488062, "Bb1": 58.27047018976124, "Bb2": 116.54094037952248, "Bb3": 233.08188075904496, "Bb4": 466.1637615180898, "Bb5": 932.3275230361796, "Bb6": 1864.6550460723593, "Bb7": 3729.3100921447185, "C1": 32.70319566257483, "C2": 65.40639132514966, "C3": 130.8127826502993, "C4": 261.6255653005986, "C5": 523.2511306011972, "C6": 1046.5022612023945, "C7": 2093.004522404789, "C8": 4186.009044809578, "C#1": 34.64782887210901, "C#2": 69.29565774421802, "C#3": 138.59131548843607, "C#4": 277.18263097687213, "C#5": 554.3652619537442, "C#6": 1108.7305239074883, "C#7": 2217.4610478149766, "D1": 36.70809598967595, "D2": 73.4161919793519, "D3": 146.83238395870376, "D4": 293.6647679174075, "D5": 587.3295358348153, "D6": 1174.6590716696305, "D7": 2349.318143339261, "D#1": 38.890872965260115, "D#2": 77.78174593052022, "D#3": 155.56349186104043, "D#4": 311.12698372208087, "D#5": 622.2539674441617, "D#6": 1244.5079348883235, "D#7": 2489.015869776647, "Db1": 34.64782887210901, "Db2": 69.29565774421802, "Db3": 138.59131548843607, "Db4": 277.18263097687213, "Db5": 554.3652619537442, "Db6": 1108.7305239074883, "Db7": 2217.4610478149766, "E1": 41.20344461410874, "E2": 82.40688922821748, "E3": 164.81377845643496, "E4": 329.6275569128699, "E5": 659.2551138257397, "E6": 1318.5102276514795, "E7": 2637.020455302959, "Eb1": 38.890872965260115, "Eb2": 77.78174593052022, "Eb3": 155.56349186104043, "Eb4": 311.12698372208087, "Eb5": 622.2539674441617, "Eb6": 1244.5079348883235, "Eb7": 2489.015869776647, "F1": 43.653528929125486, "F2": 87.30705785825097, "F3": 174.61411571650194, "F4": 349.2282314330039, "F5": 698.4564628660079, "F6": 1396.9129257320158, "F7": 2793.8258514640315, "F#1": 46.24930283895431, "F#2": 92.49860567790861, "F#3": 184.99721135581723, "F#4": 369.99442271163446, "F#5": 739.9888454232689, "F#6": 1479.9776908465378, "F#7": 2959.9553816930757, "G1": 48.999429497718666, "G2": 97.99885899543732, "G3": 195.99771799087466, "G4": 391.9954359817493, "G5": 783.9908719634984, "G6": 1567.9817439269968, "G7": 3135.9634878539937, "G#1": 51.91308719749314, "G#2": 103.82617439498628, "G#3": 207.65234878997256, "G#4": 415.3046975799451, "G#5": 830.6093951598904, "G#6": 1661.2187903197807, "G#7": 3322.4375806395615, "Gb1": 46.24930283895431, "Gb2": 92.49860567790861, "Gb3": 184.99721135581723, "Gb4": 369.99442271163446, "Gb5": 739.9888454232689, "Gb6": 1479.9776908465378, "Gb7": 2959.9553816930757},
    keymap          : {A: "A3", W: "Bb3", S: "B3", D: "C4", R: "Db4", F: "D4", T: "Eb4", G: "E4", H: "F4", U: "Gb4", J: "G4", I: "Ab4", K: "A4", O: "Bb4", L: "B4", Ç: "C5"},
    midimap         : {21: "A0", 22: "Bb0", 23: "B0", 24: "C1", 25: "Db1", 26: "D1", 27: "Eb1", 28: "E1", 29: "F1", 30: "Gb1", 31: "G1", 32: "Ab1", 33: "A1", 34: "Bb1", 35: "B1", 36: "C2", 37: "Db2", 38: "D2", 39: "Eb2", 40: "E2", 41: "F2", 42: "Gb2", 43: "G2", 44: "Ab2", 45: "A2", 46: "Bb2", 47: "B2", 48: "C3", 49: "Db3", 50: "D3", 51: "Eb3", 52: "E3", 53: "F3", 54: "Gb3", 55: "G3", 56: "Ab3", 57: "A3", 58: "Bb3", 59: "B3", 60: "C4", 61: "Db4", 62: "D4", 63: "Eb4", 64: "E4", 65: "F4", 66: "Gb4", 67: "G4", 68: "Ab4", 69: "A4", 70: "Bb4", 71: "B4", 72: "C5", 73: "Db5", 74: "D5", 75: "Eb5", 76: "E5", 77: "F5", 78: "Gb5", 79: "G5", 80: "Ab5", 81: "A5", 82: "Bb5", 83: "B5", 84: "C6", 85: "Db6", 86: "D6", 87: "Eb6", 88: "E6", 89: "F6", 90: "Gb6", 91: "G6", 92: "Ab6", 93: "A6", 94: "Bb6", 95: "B6", 96: "C7", 97: "Db7", 98: "D7", 99: "Eb7", 100: "E7", 101: "F7", 102: "Gb7", 103: "G7", 104: "Ab7", 105: "A7", 106: "Bb7", 107: "B7", 108: "C8"},
    harmonics       : [0, 1, 0.25, 0.09, 0.03, 0.01, 0.0025, 0.0015, 0.001],
    customWave      : null,
    playing         : {},
    sustainning     : [],
    midiInputs      : [],
    audioCtx        : null,
    scopeCtx        : null,
    compressor      : null,
    analyser        : null,
    bufferSource    : null,
    detune          : 0,
    recorder        : null,
    sampleNoteIdx   : 39, // C4
    volume          : 0.8,
    portamento      : 0.01,
    sustainPedal    : false,
    audioStream     : null,
    highPassFilter  : null,
    playSynth       : true,
    playSample      : true,
    ready           : false,

    loop            : function() {
        let buffer     = new Float32Array(1024),
            scopeWidth = this.scopeCtx.canvas.width;
        this.analyser.getFloatTimeDomainData(buffer);
        this.scopeCtx.strokeStyle = "#aaa";
        this.scopeCtx.setTransform(1, 0, 0, -1, 0, 100.5); // flip y-axis and translate to center
        this.scopeCtx.lineWidth = 2;
        this.scopeCtx.clearRect(0, -100, scopeWidth, this.scopeCtx.canvas.height);
        this.scopeCtx.beginPath();
        this.scopeCtx.moveTo(0, buffer[0] * 90);
        for (var x = 2; x < scopeWidth; x += 2) this.scopeCtx.lineTo(x, buffer[x] * 90);
        this.scopeCtx.stroke();

        requestAnimationFrame(this.loop.bind(this));                
    },

    drawWave        : function() {
        let scope     = document.getElementById("scope");
        this.scopeCtx = scope.getContext("2d");
        this.loop();
    },

    init            : function() {
        this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        let now       = this.audioCtx.currentTime;

        this.analyser   = this.audioCtx.createAnalyser();
        this.analyser.connect(this.audioCtx.destination);

        this.compressor = this.audioCtx.createDynamicsCompressor();
        this.compressor.threshold.setValueAtTime(-50, now);
        this.compressor.knee.setValueAtTime(40, now);
        this.compressor.ratio.setValueAtTime(12, now);
        this.compressor.attack.setValueAtTime(0, now);
        this.compressor.release.setValueAtTime(0.25, now);
        this.compressor.connect(this.analyser);

        if (scope) {
            this.drawWave();
        }

        if (this.audioStream) {
            this.recorder = new MediaRecorder(this.audioStream);
        }

        this.ready = true;
    },

    getCustomWave   : function() {
        if (!this.customWave) {
            let imag = new Float32Array(this.harmonics), // sine
                real = new Float32Array(imag.length); // cos
            this.customWave = this.audioCtx.createPeriodicWave(real, imag);
        }

        return this.customWave;
    },

    recordSample    : function() {
        if (!this.ready) {
            this.init();
        }

        const lengthInMS = 8000;
        let   data       = [];

        this.recorder.ondataavailable = (event) => data.push(event.data);
        this.recorder.start();
        console.log(this.recorder.state + "...");

        let stopped = new Promise((resolve, reject) => {
            this.recorder.onstop = resolve;
            this.recorder.onerror = event => reject(event.name);
        });

        return Promise.all([
            stopped,
            ])
        .then(() => data);
    },

    setSample       : function(sample) {
        sample.arrayBuffer()
            .then((buffer) => {
                this.audioCtx.decodeAudioData(buffer).then((audioData) => {
                    let channelData = audioData.getChannelData(0);
                        startIdx    = channelData.findIndex((val) => Math.abs(val) > 0.1);
                    channelData.copyWithin(1, startIdx); // remove silence from the beginning of the sample
                    channelData[0] = 0; // start sample at 0
                    for (let i = channelData.length - startIdx + 1; i < channelData.length; i++) {
                        channelData[i] = 0;
                    }
                    this.bufferSource = audioData;
                });
            });
    },

    play            : function(frequency, velocity, length, synth, attackFrequency) {
        if (!this.ready) {
            this.init();
        }

        if (isNaN(parseFloat(frequency)) || !isFinite(frequency)) {
            console.log("can't play that");

            return;
        }

        if (!velocity) {
            velocity = 0.8;
        }
        velocity = velocity * this.volume;

        if (!length) {
            length = 8;
        }

        let now  = this.audioCtx.currentTime,
            gain = this.audioCtx.createGain();
        gain.gain.setValueAtTime(velocity, now);
        gain.connect(this.compressor);
        if (this.bufferSource && synth && this.playSample) {
            synth.gain = gain;
            let noteIdx = this.noteNames.indexOf(synth.noteName); // C4 is 39
            synth.bufferSource = this.audioCtx.createBufferSource();
            synth.bufferSource.buffer = this.bufferSource;
            synth.bufferSource.playbackRate.value = Math.pow(2, (noteIdx - this.sampleNoteIdx) / 12);
            synth.bufferSource.detune.value = this.detune;
            synth.bufferSource.connect(synth.gain);
            synth.bufferSource.start(now);
            synth.bufferSource.stop(now + length);
        }
        if (this.playSynth) {
            let oscillator = this.audioCtx.createOscillator();
            oscillator.setPeriodicWave(this.getCustomWave());
            gain.gain.setTargetAtTime(0, now, 0.8);
            if (synth) {
                synth.gain       = gain;
                synth.oscillator = oscillator;
                synth.time       = now;
            }
            if (this.portamento && attackFrequency) {
                oscillator.frequency.setValueAtTime(attackFrequency, now);
                oscillator.frequency.setTargetAtTime(frequency, now, this.portamento);
            } else {
                oscillator.frequency.setValueAtTime(frequency, now);
            }
            oscillator.connect(gain);
            oscillator.start(now);
            oscillator.stop(now + length);
        }
    },

    stopNote   : function(noteName, mandatory) {
        if (this.sustainPedal && !mandatory) {
            if (!this.sustainning.includes(noteName)) {
                this.sustainning.push(noteName);
            }
        } else {
            if (this.playing[noteName]) {
                let now = this.audioCtx.currentTime;
                this.playing[noteName].gain.gain.setTargetAtTime(0, now, 0.04); // smooth note release transition
                if (this.bufferSource && this.playing[noteName].bufferSource) {
                    this.playing[noteName].bufferSource.stop(now + 0.4);
                } else {
                    this.playing[noteName].oscillator.stop(now + 0.4);
                }
                delete this.playing[noteName];
            }
        }
    },

    playNote   : function(noteName, velocity, length) {
        if (!this.ready) {
            this.init();
        }

        if (this.playing[noteName]) {
            this.stopNote(noteName, true);
            if (this.sustainning.includes(noteName)) {
                this.sustainning.splice(this.sustainning.indexOf(noteName), 1);
            }
        }

        if (this.playSynth || (this.playSample && this.bufferSource)) {
            let prevNote;
            if (this.portamento) {
                const notesPlaying = Object.keys(this.playing),
                    Idx            = this.noteNames.indexOf(noteName);
                if (notesPlaying.length) {
                    let upIdx = Idx,
                        dwIdx = Idx;
                    while (!prevNote && (dwIdx > 0 || upIdx < this.noteNames.length)) {
                        if (notesPlaying.includes(this.noteNames[--dwIdx])) {
                            prevNote = this.noteNames[dwIdx];
                        }
                        if (notesPlaying.includes(this.noteNames[++upIdx])) {
                            if (prevNote && this.playing[prevNote].time > this.playing[this.noteNames[upIdx]].time) {
                                break;
                            } else {
                                prevNote = this.noteNames[upIdx];
                            }
                        }
                    }
                }
            }

            this.playing[noteName] = {
                noteName,
            };
            this.play(this.noteFrequencies[noteName], velocity, length, this.playing[noteName], this.noteFrequencies[prevNote]);
        }
    },

    stopSustainning : function() {
        this.sustainning.forEach((noteName) => {
            this.stopNote(noteName);
        });
        this.sustainning = [];
    },
};
