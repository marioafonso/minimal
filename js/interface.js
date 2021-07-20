console.log("-= minimal synth =-");
console.log("usage: minimal.play(<frequency in Hz>, <velocity - 0.8 by default>, <length in seconds - 8 by default>)");
console.log("press and hold 'C' to record a C4 (or whatever) then play!");

// load interface for changing minimal parameters
let mainControl     = document.getElementById("minimalControl"),
    volumeDiv       = document.createElement("div"),
    volumeLabel     = document.createElement("label"),
    volumeInput     = document.createElement("input"),
    synthControl    = document.getElementById("minimalSynthControl"),
    portamentoDiv   = document.createElement("div"),
    portamentoLabel = document.createElement("label"),
    portamentoInput = document.createElement("input"),
    playSynthDiv    = document.createElement("div"),
    playSynthLabel  = document.createElement("label"),
    playSynthInput  = document.createElement("input");

volumeDiv.classList.add("sampleControl");
portamentoDiv.classList.add("sampleControl");
playSynthDiv.classList.add("sampleControl");

volumeLabel.innerHTML = "Master volume";
volumeInput.type  = "number";
volumeInput.value = minimal.volume;
volumeInput.max   = 1;
volumeInput.min   = 0;
volumeInput.step  = 0.1;
volumeInput.addEventListener("change", () => {
    minimal.volume = parseFloat(volumeInput.value);
    document.activeElement.blur();
});
volumeDiv.appendChild(volumeLabel);
volumeDiv.appendChild(volumeInput);

portamentoLabel.innerHTML = "Synth portamento";
portamentoInput.type  = "number";
portamentoInput.value = minimal.portamento;
portamentoInput.max   = 1;
portamentoInput.min   = 0;
portamentoInput.step  = 0.01;
portamentoInput.addEventListener("change", () => {
    minimal.portamento = parseFloat(portamentoInput.value);
    document.activeElement.blur();
});
portamentoDiv.appendChild(portamentoLabel);
portamentoDiv.appendChild(portamentoInput);

playSynthLabel.innerHTML = "Play synth";
playSynthInput.type = "checkbox";
playSynthInput.checked = minimal.playSynth;
playSynthInput.addEventListener("change", () => {
    minimal.playSynth = playSynthInput.checked;
    document.activeElement.blur();
});
playSynthDiv.appendChild(playSynthLabel);
playSynthDiv.appendChild(playSynthInput);

mainControl.appendChild(volumeDiv);
synthControl.appendChild(playSynthDiv);
synthControl.appendChild(portamentoDiv);

// keyboard events
document.addEventListener('keydown', function (event) {
    if (!event.repeat) {
        if (minimal.keymap[event.key.toUpperCase()]) {
            minimal.playNote(minimal.keymap[event.key.toUpperCase()], 0.35);
        } else if (event.key.toUpperCase() === "C") {
            minimal.recordSample().then((recordedChunks) => {
                let recordedBlob   = new Blob(recordedChunks, { type: "audio/webm" });
                minimal.setSample(recordedBlob);
                    
                console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
                    recordedBlob.type + " media.");

                // load interface for changing sample parameters
                let sampleControl     = document.getElementById("minimalSampleControl"),
                    sampleNoteDiv     = document.createElement("div"),
                    sampleNoteLabel   = document.createElement("label"),
                    sampleNoteSelect  = document.createElement("select"),
                    sampleDetuneDiv   = document.createElement("div"),
                    sampleDetuneLabel = document.createElement("label"),
                    sampleDetuneInput = document.createElement("input"),
                    playSampleDiv     = document.createElement("div"),
                    playSampleLabel   = document.createElement("label"),
                    playSampleInput   = document.createElement("input");
                sampleControl.innerHTML     = "";

                sampleNoteLabel.innerHTML   = "Sample note";
                for (let idx = minimal.noteNames.length - 1; idx >= 0; idx--) {
                    let option = document.createElement("option");
                    option.value = idx;
                    option.text  = minimal.noteNames[idx];
                    if (idx === minimal.sampleNoteIdx) {
                        option.selected = true;
                    }
                    sampleNoteSelect.appendChild(option);
                }
                sampleNoteSelect.addEventListener("change", () => {
                    minimal.sampleNoteIdx = parseInt(sampleNoteSelect.value);
                    document.activeElement.blur();
                });

                sampleDetuneLabel.innerHTML = "Sample detune";
                sampleDetuneInput.type = "number";
                sampleDetuneInput.value = minimal.detune;
                sampleDetuneInput.max = 99;
                sampleDetuneInput.min = -99;
                sampleDetuneInput.addEventListener("change", () => {
                    minimal.detune = parseInt(sampleDetuneInput.value);
                    document.activeElement.blur();
                });

                playSampleLabel.innerHTML = "Play sample";
                playSampleInput.type = "checkbox";
                playSampleInput.checked = minimal.playSample;
                playSampleInput.addEventListener("change", () => {
                    minimal.playSample = playSampleInput.checked;
                    document.activeElement.blur();
                });

                sampleNoteDiv.classList.add("sampleControl");
                sampleDetuneDiv.classList.add("sampleControl");
                playSampleDiv.classList.add("sampleControl");
                sampleNoteDiv.appendChild(sampleNoteLabel)
                sampleNoteDiv.appendChild(sampleNoteSelect);
                sampleDetuneDiv.appendChild(sampleDetuneLabel);
                sampleDetuneDiv.appendChild(sampleDetuneInput);
                playSampleDiv.appendChild(playSampleLabel);
                playSampleDiv.appendChild(playSampleInput);
                sampleControl.appendChild(playSampleDiv);
                sampleControl.appendChild(sampleNoteDiv);
                sampleControl.appendChild(sampleDetuneDiv);
                sampleControl.classList.remove("hidden");
            });
        }
    }
});
document.addEventListener('keyup', function (event) {
    if (!event.repeat) {
        if (minimal.keymap[event.key.toUpperCase()]) {
            minimal.stopNote(minimal.keymap[event.key.toUpperCase()]);
        } else if (event.key.toUpperCase() === "C") {
            if (minimal.recorder && minimal.recorder.state == "recording") {
                minimal.recorder.stop();
            }
        }
    } 
});

// midi events
navigator.requestMIDIAccess({ sysex: true })
    .then((res) => {
        minimal.midiInputs = Array.from(res.inputs);
        minimal.midiInputs.forEach((midi) => {
            midi[1].onmidimessage = (e) => {
                switch (e.data[0]) {
                    case 129: // Akai
                        minimal.stopNote(minimal.midimap[e.data[1]]);
                        break;
                    case 144: // Yamaha
                        if (e.data[2] > 0) {
                            minimal.playNote(minimal.midimap[e.data[1]], e.data[2] / 127);
                        } else {
                            minimal.stopNote(minimal.midimap[e.data[1]]);
                        }
                        break;
                    case 145: // Akai
                        minimal.playNote(minimal.midimap[e.data[1]], e.data[2] / 127);
                        break;
                    case 176: // sustain pedal
                        if (e.data[2] > 0) {
                            minimal.sustainPedal = true;
                        } else {
                            minimal.sustainPedal = false;
                            minimal.stopSustainning();
                        }
                        break;
                    default:
                        break;
                }
        }});
    })
    .catch((error) => {
        console.log("Unable to get midi access", error);
    });

// audio input
navigator.getUserMedia({audio: true, video: false},
    (stream) => {
        minimal.audioStream = stream;
    },
    (error) => {
        console.log("Unable to get the user media", error);
    }
);
