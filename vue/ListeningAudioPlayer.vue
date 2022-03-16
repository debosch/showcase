<template>
  <span class="listening-audio">
    <audio ref="audioPlayer" :src="src" @ended="onEnded" @pause="onPause" @play="onPlay" />
    <span class="listening-audio__controls">
      <button class="listening-audio__control-button listening-audio__control-button-playing" :class="{ 'listening-audio__control-button_playing': isPlaying }" @click="onControlClick">
        <svg stroke-width="0" viewBox="0 0 16 16" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.536 14.01A8.473 8.473 0 0 0 14.026 8a8.473 8.473 0 0 0-2.49-6.01l-.708.707A7.476 7.476 0 0 1 13.025 8c0 2.071-.84 3.946-2.197 5.303l.708.707z"></path>
          <path d="M10.121 12.596A6.48 6.48 0 0 0 12.025 8a6.48 6.48 0 0 0-1.904-4.596l-.707.707A5.483 5.483 0 0 1 11.025 8a5.483 5.483 0 0 1-1.61 3.89l.706.706z"></path>
          <path
            d="M10.025 8a4.486 4.486 0 0 1-1.318 3.182L8 10.475A3.489 3.489 0 0 0 9.025 8c0-.966-.392-1.841-1.025-2.475l.707-.707A4.486 4.486 0 0 1 10.025 8zM7 4a.5.5 0 0 0-.812-.39L3.825 5.5H1.5A.5.5 0 0 0 1 6v4a.5.5 0 0 0 .5.5h2.325l2.363 1.89A.5.5 0 0 0 7 12V4zM4.312 6.39 6 5.04v5.92L4.312 9.61A.5.5 0 0 0 4 9.5H2v-3h2a.5.5 0 0 0 .312-.11z"
          ></path>
        </svg>
      </button>
      <span class="listening-audio__label">{{ label }}</span>
    </span>
  </span>
</template>

<script>
export default {
  name: 'ListeningAudioPlayer',
  props: {
    src: {
      default: '',
      type: String
    },
    label: {
      default: '',
      type: String
    }
  },
  data() {
    return {
      isPlaying: false
    };
  },
  methods: {
    onControlClick() {
      if (this.isPlaying) {
        this.$refs.audioPlayer.pause();
        this.isPlaying = false;
      } else {
        this.$refs.audioPlayer.play();
        this.isPlaying = true;
      }
    },

    onEnded() {
      this.isPlaying = false;
    },

    onPause() {
      this.isPlaying = false;
    },

    onPlay() {
      this.isPlaying = true;
    }
  }
};
</script>

<style lang="scss">
.listening-audio {
  &__controls {
    display: flex;
    align-items: center;
    margin: 0.25rem;
  }

  &__label {
    color: #031d3c;
    font-weight: bold;
  }

  &__control-button {
    margin-right: 1rem;
    background-color: #f4f7fc;
    border: none;
    width: 40px;
    height: 40px;
    border-radius: 50%;

    &:hover {
      transform: scale(1.1);
      background-color: #dadce1;
    }

    svg {
      width: 100%;
      height: 100%;
      fill: #1968c3;
    }
  }
}

.listening-audio__control-button_playing {
  position: relative;
  background-color: #1968c3;
  border-radius: 50%;
  transition: all 0.1s linear;

  &:hover {
    transform: scale(1.1);
    background-color: #207ae2;
  }

  svg {
    display: none;
  }

  &:after {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 15px;
    content: '';
    display: block;
    height: 15px;
    width: 2px;
    border-radius: 5px;
    background-color: #ffffff;
  }

  &:before {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    right: 15px;
    content: '';
    display: block;
    height: 15px;
    width: 2px;
    border-radius: 5px;
    background-color: #ffffff;
  }
}
</style>
