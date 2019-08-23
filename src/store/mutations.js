export default {
  addPatchPoint(state, payload) {
    state.patchPoints.push({
      placement: {
        left: payload.event.layerX,
        top: payload.event.layerY
      },
      id: payload.id + "_" + (state.patchPoints.length + 1),
      details: payload.details,
      transform: "translate(0 0)"
    });
  },
  clearPatchPoints(state) {
    localStorage.removeItem("patchpoints"); // clear memory in local storage
    state.patchPoints = [];
  },
  setMessage(state, message) {
    state.message = message;
  },
  initializeStore(state) {
    // Check if patch points are stored in browser memory
    if (localStorage.getItem("patchpoints")) {
      // Replace the volatile memory object with the stored state
      state.patchPoints = JSON.parse(localStorage.getItem("patchpoints"));
    }
  },
  setNewPosition(state, payload) {
    state.patchPoints.forEach(patchPoint => {
      if (patchPoint.id === payload.id) {
        patchPoint.transform = payload.transform + "translate(0 0)";
      }
    });
  },
  toggleSetMode(state) {
    state.setMode = !state.setMode;
  },
  toggleClearMode(state) {
    state.clearMode = !state.clearMode;
  }
};
