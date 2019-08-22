<template>
  <div class="instrument">
    <svg
      v-if="size"
      ref="stage"
      class="instrument__stage"
      version="1.1"
      :width="size.w"
      :viewBox="svgViewBox"
      @click="addPatchPoint($event)"
    >
      <rect
        ref="rect"
        class="instrument__rect"
        x="0"
        y="0"
        width="100%"
        height="100%"
      />
      <PatchPoint
        v-for="PatchPoint in PatchPoints"
        :placement="PatchPoint.placement"
        :rect="$refs.rect"
        :id="PatchPoint.id"
        :key="PatchPoint.id"
      />
    </svg>
    <img class="instrument__img" ref="img" :src="imgSrcPath" alt="" />
  </div>
</template>

<script>
import PatchPoint from "@/components/PatchPoint";

export default {
  name: "Instrument",
  components: {
    PatchPoint
  },
  props: {
    id: {
      type: String,
      required: true
    },
    imgSrc: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      size: null,
      svgViewBox: null,
      PatchPoints: []
    };
  },
  computed: {
    imgSrcPath() {
      return "/img/" + this.imgSrc;
    }
  },
  methods: {
    addPatchPoint(e) {
      this.PatchPoints.push({
        placement: {
          x: e.layerX,
          y: e.layerY
        },
        id: this.id + "_" + (this.PatchPoints.length + 1)
      });
    },
    setSize() {
      this.size = {
        w: this.$refs.img.width,
        h: this.$refs.img.height
      };
      this.svgViewBox =
        "0 0 " + this.$refs.img.width + " " + this.$refs.img.height;
    }
  },
  mounted() {
    this.$refs.img.onload = this.setSize;
  }
};
</script>

<style lang="scss" scoped>
.instrument {
  position: relative;
  &__img {
    width: 100%;
  }
  &__stage {
    width: 100%;
    position: absolute;
    fill: transparent;
  }
  &__rect {
    fill: transparent;
    &.overlay {
      fill: rgba($color: #15c, $alpha: 0.5);
    }
  }
}
</style>
