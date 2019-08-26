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
  },
  previousInstrumentHeight: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    if (state.instruments.indexOf(i) !== 0) {
      return state.instruments[state.instruments.indexOf(i) - 1].size.h; // + 200
    } else {
      return 0;
    }
  },
  instrumentDimensions: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return {
      width: i.size.w,
      height: i.size.h,
      x: i.position.left,
      y: i.position.top
    };
  },
  instrumentOffset: state => instrumentId => {
    const i = state.instruments.find(instrument => {
      return instrument.id === instrumentId;
    });
    return {
      x: i.offset.x,
      y: i.offset.y
    };
  }
};
