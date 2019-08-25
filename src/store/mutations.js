export default {
  addPatchPoint(state, payload) {
    state.instruments.forEach(instrument => {
      if (instrument.id === payload.instrument) {
        instrument.patchPoints.push({
          selected: false,
          placement: {
            left: 0,
            top: 0
          },
          id: payload.id + "_" + (instrument.patchPoints.length + 1),
          name: payload.name,
          transform:
            "matrix(1,0,0,1," +
            payload.event.layerX +
            "," +
            payload.event.layerY +
            ")"
        });
      }
    });
  },
  addPatchCable(state, payload) {
    console.log(payload.element);

    state.patchCables.push({
      from: "",
      to: "",
      placement: {
        fromPosition: { x: payload.placement.x, y: payload.placement.y },
        toPosition: { x: 50, y: 150 }
      },
      id: Math.floor(100000 + Math.random() * 900000)
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
  initializeStore(state) {
    // Check if patch points are stored in browser memory
    if (localStorage.getItem("instruments")) {
      // Replace the volatile memory object with the stored state
      state.instruments = JSON.parse(localStorage.getItem("instruments"));
    }
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
