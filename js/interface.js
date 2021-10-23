console.log("-= minimal synth =-");
console.log("usage: minimal.play(<frequency in Hz>, <velocity - 0.8 by default>, <length in seconds - 8 by default>)");
console.log("press and hold 'space' to record a C4 (or whatever) then play!");

var minimalControl = (label, type, options) => {
    let cDiv   = document.createElement("div"),
        cLabel = document.createElement("label"),
        cInput = document.createElement(type === "select" ? type : "input");
    cLabel.innerHTML = label;
    cDiv.appendChild(cLabel);
    cDiv.appendChild(cInput);
    cDiv.classList.add("sampleControl");

    switch (type) {
        case "checkbox":
            cInput.type    = "checkbox";
            cInput.checked = options.checked;
            cInput.addEventListener("change", options.onChange);
            break;
        case "number":
            cInput.type  = "number";
            cInput.value = options.value;
            cInput.min   = options.min;
            cInput.max   = options.max;
            cInput.step  = options.step;
            cInput.addEventListener("change", options.onChange);
            break;
        case "select":
            for (let idx = options.options.length - 1; idx >= 0; idx--) {
                let option = document.createElement("option");
                option.value = idx;
                option.text  = options.options[idx];
                if (idx === options.selectedIdx) {
                    option.selected = true;
                }
                cInput.appendChild(option);
            }
            cInput.addEventListener("change", options.onChange);
            break;
        default:
            return;
    }

    return cDiv;
};

// load interface for changing minimal parameters
let synthControl = document.getElementById("minimalSynthControl"),
    playSynth = minimalControl("Play synth", "checkbox", {
        checked: minimal.playSynth,
        onChange: (event) => {
            minimal.playSynth = event.target.checked;
            document.activeElement.blur();
        },
    }),
    portamento = minimalControl("Synth portamento", "number", {
        value: minimal.portamento,
        max: 1,
        min: 0,
        step: 0.01,
        onChange: (event) => {
            if (event.target.value === "") {
                event.target.value = minimal.portamento;
            }
            minimal.portamento = parseFloat(event.target.value);
            document.activeElement.blur();
        },
    }),
    volume = minimalControl("Synth volume", "number", {
        value: minimal.synthVolume,
        max: 1,
        min: 0,
        step: 0.01,
        onChange: (event) => {
            if (event.target.value === "") {
                event.target.value = minimal.synthVolume;
            }
            minimal.synthVolume = parseFloat(event.target.value);
            document.activeElement.blur();
        },
    });
synthControl.appendChild(playSynth);
synthControl.appendChild(portamento);
synthControl.appendChild(volume);

// keyboard events
document.addEventListener('keydown', function (event) {
    console.log(event);
    if (!event.repeat) {
        if (minimal.keymap[event.key.toUpperCase()]) {
            minimal.playNote(minimal.keymap[event.key.toUpperCase()], 0.35);
        } else if (event.keyCode === 32) {
            let sampleControl = document.getElementById("minimalSampleControl");
            sampleControl.innerHTML = "recording...";
            minimal.recordSample().then((recordedChunks) => {
                let recordedBlob   = new Blob(recordedChunks, { type: "audio/webm" });
                minimal.setSample(recordedBlob);
                    
                console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
                    recordedBlob.type + " media.");

                // load interface for changing sample parameters
                let playSample = minimalControl("Play sample", "checkbox", {
                        checked: minimal.playSample,
                        onChange: (event) => {
                            minimal.playSample = event.target.checked;
                            document.activeElement.blur();            
                        },
                    }),
                    volume = minimalControl("Sample volume", "number", {
                        value: minimal.sampleVolume,
                        max: 1,
                        min: 0,
                        step: 0.01,
                        onChange: (event) => {
                            if (event.target.value === "") {
                                event.target.value = minimal.sampleVolume;
                            }
                            minimal.sampleVolume = parseFloat(event.target.value);
                            document.activeElement.blur();
                        },
                    }),
                    sampleNote = minimalControl("Sample note", "select", {
                        options: minimal.noteNames,
                        selectedIdx: minimal.sampleNoteIdx,
                        onChange: (event) => {
                            minimal.sampleNoteIdx = parseInt(event.target.value);
                            document.activeElement.blur();                            
                        },
                    });
                    detune = minimalControl("Sample detune", "number", {
                        value: minimal.detune,
                        max: 99,
                        min: -99,
                        step: 1,
                        onChange: (event) => {
                            if (event.target.value === "") {
                                event.target.value = minimal.detune;
                            }
                            minimal.detune = parseFloat(event.target.value);
                            document.activeElement.blur();
                        },
                    });
                sampleControl.innerHTML = "";
                sampleControl.appendChild(playSample);
                sampleControl.appendChild(sampleNote);
                sampleControl.appendChild(detune);
                sampleControl.appendChild(volume);
                sampleControl.classList.remove("hidden");
            });
        }
    }
});
document.addEventListener('keyup', function (event) {
    if (!event.repeat) {
        if (minimal.keymap[event.key.toUpperCase()]) {
            minimal.stopNote(minimal.keymap[event.key.toUpperCase()]);
        } else if (event.keyCode === 32) {
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
navigator.mediaDevices.getUserMedia({audio: true, video: false})
    .then((stream) => {
        minimal.audioStream = stream;
    })
    .catch((error) => {
        console.log("Unable to get the user media", error);
    });
