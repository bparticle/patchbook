export default {
  addPatchPoint(state, payload) {
    state.patchPoints.push({
      selected: false,
      placement: {
        left: 0,
        top: 0
      },
      id: payload.id + "_" + (state.patchPoints.length + 1),
      name: payload.name,
      transform:
        "matrix(1,0,0,1," +
        payload.event.layerX +
        "," +
        payload.event.layerY +
        ")"
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
        patchPoint.transform = payload.transform;
      }
    });
  },
  selectPatchPoint(state, id) {
    state.patchPoints.forEach(patchPoint => {
      if (patchPoint.id === id) {
        patchPoint.selected = true;
      } else {
        patchPoint.selected = false;
      }
    });
  },
  unselectAll(state) {
    state.patchPoints.forEach(patchPoint => {
      patchPoint.selected = false;
    });
  },
  removePatchPoint(state, id) {
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
  toggleSetMode(state) {
    state.setMode = !state.setMode;
  },
  toggleClearMode(state) {
    state.clearMode = !state.clearMode;
  }
};
