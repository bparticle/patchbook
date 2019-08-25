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
  }
};
