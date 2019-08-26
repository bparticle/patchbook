export default {
  patchPoints: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return i.patchPoints;
  },
  setMode: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return i.mode.setMode;
  },
  clearMode: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return i.mode.clearMode;
  },
  activeCable: state => {
    return state.patchCables.find(cable => {
      return cable.active === true;
    });
  },
  instrumentSize: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return i.size;
  }
};
