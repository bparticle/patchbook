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
  }
};
