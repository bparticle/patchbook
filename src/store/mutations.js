export default {
  addPatchPoint(state, payload) {
    console.log(payload.event);

    state.instruments.forEach(instrument => {
      if (instrument.id === payload.instrument) {
        instrument.patchPoints.push({
          selected: false,
          placement: {
            left: 0,
            top: 0
          },
          id:
            payload.id +
            "_" +
            (instrument.patchPoints.length + 1) +
            "-" +
            Math.floor(100000 + Math.random() * 900000),
          name: payload.name,
          transform: {
            x: payload.event.layerX,
            y: payload.event.layerY
          }
        });
      }
    });
  },
  clearPatchPoints(state, instrumentId) {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    localStorage.removeItem("patchpoints"); // clear memory in local storage
    i.patchPoints = [];
  },
  setMessage(state, message) {
    state.message = message;
  },
  setPatchingMode(state, value) {
    state.setPatchingMode = value;
  },
  moveCableEnd(state, event) {
    const c = state.patchCables.find(cable => {
      return cable.active === true;
    });
    c.placement.toPosition = {
      x: event.offsetX,
      y: event.offsetY
    };
  },
  moveGhost(state, payload) {
    const i = state.instruments.find(instrument => {
      return payload.instrumentId === instrument.id;
    });
    i.position = payload.position;
  },
  updatePatchpointPosition(state, payload) {
    const i = state.instruments.find(instrument => {
      return payload.instrumentId === instrument.id;
    });
    i.patchPoints.forEach(patchpoint => {
      patchpoint.placement.left = payload.movement.x;
      patchpoint.placement.top = payload.movement.y;
    });
  },
  initializeStore(state) {
    // Check if patch points are stored in browser memory
    if (localStorage.getItem("instruments")) {
      // Replace the volatile memory object with the stored state
      state.instruments = JSON.parse(localStorage.getItem("instruments"));
    }
  },
  setInstrumentSize(state, payload) {
    state.instruments.forEach(instrument => {
      if (instrument.id === payload.instrumentId) {
        instrument.size = payload.size;
        instrument.offset = payload.offset;
      }
    });
  },
  setNewPosition(state, payload) {
    state.instruments.forEach(instrument => {
      if (instrument.id === payload.instrument) {
        instrument.patchPoints.forEach(patchPoint => {
          if (patchPoint.id === payload.id) {
            patchPoint.transform = payload.transform;
          }
        });
      }
    });
  },
  selectPatchPoint(state, payload) {
    state.instruments.forEach(instrument => {
      if (payload.instrument === instrument.id) {
        instrument.patchPoints.forEach(patchPoint => {
          if (patchPoint.id === payload.id) {
            patchPoint.selected = true;
          } else {
            patchPoint.selected = false;
          }
        });
      } else {
        instrument.patchPoints.forEach(patchPoint => {
          patchPoint.selected = false;
        });
      }
    });
  },
  unselectAll(state) {
    state.instruments.forEach(instrument => {
      instrument.patchPoints.forEach(patchPoint => {
        patchPoint.selected = false;
      });
    });
  },
  removePatchPoint(state, id) {
    // :TODO
    state.patchPoints.forEach(patchPoint => {
      if (patchPoint.id === id) {
        // console.log(state.patchPoints.indexOf(patchPoint));
        // state.patchPoints = state.patchPoints.splice(
        //   state.patchPoints.indexOf(patchPoint),
        //   1
        // );
      }
    });
  },
  toggleSetMode(state, instrumentId) {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    i.mode.setMode = !i.mode.setMode;
    i.mode.clearMode = false;
    // Set instrument states
    if (i.mode.setMode === true) {
      i.mode.reference = true;
    } else {
      i.mode.reference = false;
    }
  },
  toggleReference(state, instrumentId) {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    i.mode.reference = !i.mode.reference;
    console.log(i.mode.reference);
  },
  toggleClearMode(state, instrumentId) {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    i.mode.clearMode = !i.mode.clearMode;
    i.mode.setMode = false;
  },
  modeReset(state) {
    state.instruments.forEach(instrument => {
      instrument.mode.clearMode = false;
      instrument.mode.setMode = false;
    });
  }
};
