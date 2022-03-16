<template>
  <li class="quiz-item d-flex align-items-center justify-content-between" :class="{ 'quiz-item--active': active }" @click="onTimelineClick(lessonContent.start_time)">
    <span class="quiz-item__title text-navy font-weight-bold text-bold">
      <i class="quiz-item__icon" :style="{ backgroundColor: transparentize(lessonContent.color, 30) }">
        <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="play" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512" class="svg-inline--fa fa-play fa-w-14 fa-xs" data-v-16602578="">
          <path :fill="lessonContent.color" d="M424.4 214.7L72.4 6.6C43.8-10.3 0 6.1 0 47.9V464c0 37.5 40.7 60.1 72.4 41.3l352-208c31.4-18.5 31.5-64.1 0-82.6z" data-v-16602578=""></path>
        </svg>
      </i>
      {{ lessonContent.title }}
    </span>
    <span class="quiz-item__time font-weight-bold text-bold">
      <fa-icon :icon="['far', 'clock']" class="mr-1" />
      {{ lessonContent.start_time | formatTime }} - {{ lessonContent.end_time | formatTime }}
    </span>
  </li>
</template>

<script>
const zeroPad = (num, places = 2) => String(num).padStart(places, '0');

export default {
  name: 'LessonContentItem',
  filters: {
    formatTime(value) {
      return `${zeroPad(Math.floor(value / 60))}:${zeroPad(value % 60)}`;
    }
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    lessonContent: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      iconColor: this.lessonContent.color
    };
  },
  methods: {
    onTimelineClick(time) {
      this.$emit('onTimelineClick', time);
    },
    transparentize(color, transparency) {
      return color + transparency;
    }
  }
};
</script>

<style lang="scss" scoped>
.quiz-item {
  border-radius: 15px;
  padding: 20px 15px;
  background-color: transparentize(color('bg-color'), 0.4);

  &:hover {
    background-color: darken(color('bg-color'), 2);
  }

  &__time {
    @include text-color('blue-grey');
    transition: color $transition-duration-base;
  }

  &__icon {
    display: inline-flex;
    @include flex-center;
    border-radius: 100px;
    width: 35px;
    height: 35px;
  }

  &--active {
    background-color: transparentize(color('bg-color'), 0.2);
  }

  &--active &__time {
    @include text-color('nice-blue');
  }
}
</style>
