export default {
  addPatchCable({ state }, payload) {
    const rnd = Math.floor(100000 + Math.random() * 900000);
    return new Promise(resolve => {
      state.patchCables.push({
        active: true,
        from: "",
        to: "",
        placement: {
          fromPosition: { x: payload.placement.x, y: payload.placement.y },
          toPosition: { x: payload.placement.x + 25, y: payload.placement.y }
        },
        id: "cable_" + rnd
      });
      resolve(rnd);
    });
  },
  resetPositions({ state }) {
    return new Promise(done => {
      for (let i = 0; i < state.instruments.length; i++) {
        // Reset position
        state.instruments[i].position = {
          left: 0,
          top: 0
        };
        // Reset all modes to false
        state.instruments[i].mode = {
          clearMode: false,
          setMode: false,
          reference: false
        };
        // Return promise when done
        if (i === state.instruments.length) {
          done();
        }
      }
    });
  }
};
