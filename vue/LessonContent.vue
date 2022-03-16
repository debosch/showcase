<template>
  <div class="lesson-collapse">
    <button
      class="lesson-collapse__head d-flex align-items-center justify-content-between cursor-pointer w-100"
      @click="
        toggle();
        setLesson();
      "
    >
      <h4 class="lesson-collapse__title font-weight-bold text-title text-navy m-0">{{ lesson.title }}</h4>
      <fa-icon class="lesson-collapse__icon" icon="chevron-down" :class="{ 'lesson-collapse__icon--rotated': show }" />
    </button>
    <SlideUpDown :active="show" class="position-relative">
      <ul class="lesson-collapse__body m-0">
        <Overlay v-if="!purchased && index !== 0">
          <RoundedButton theme="red" :disabled="purchaseLoading" @click="onBuy()">{{ $t('course.buyCourseNow') }}</RoundedButton>
        </Overlay>
        <h4 v-if="lesson && lessonContents.length === 0" class="text-center text-muted">{{ $t('course.noTimelines') }}</h4>
        <LessonContentItem v-for="lessonContent in lessonContents" :key="lessonContent.id" class="mb-2" :lesson-content="lessonContent" @onTimelineClick="onTimelineClick" />
        <Loader :active="loading" />
      </ul>
    </SlideUpDown>
  </div>
</template>

<script>
import LessonContentItem from '@/components/Lesson/LessonContentItem';
import Overlay from '@/components/Shared/Overlay.vue';
import HasLoading from '@/mixins/HasLoading';

export default {
  name: 'LessonContent',
  components: {
    LessonContentItem,
    Overlay
  },
  mixins: [HasLoading],
  props: {
    open: {
      type: Boolean,
      default() {
        return false;
      }
    },
    lesson: {
      type: Object,
      required: true
    },
    purchased: {
      type: Boolean,
      default: false
    },
    purchaseLoading: {
      type: Boolean,
      default: false
    },
    index: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      show: false,
      fetchedQuizzes: [],
      lessonContents: this.lesson.lesson_content || []
    };
  },
  computed: {
    lessons() {
      return this.course.lessons;
    },
    needToFetchQuizzes() {
      return !this.lesson.quizzes && this.fetchedQuizzes === null;
    }
  },
  watch: {
    open: {
      immediate: true,
      handler(value) {
        this.show = value;
        if (value && this.needToFetchQuizzes) {
          this.fetchQuizzes();
        }
      }
    },
    show(value) {
      if (value && this.needToFetchQuizzes) {
        this.fetchQuizzes();
      }
    }
  },
  methods: {
    /**
     * Toggle open value
     *
     * @returns {void}
     */
    toggle() {
      this.show = !this.show;
    },
    fetchQuizzes() {
      this.startLoading();
      this.$LessonService
        .getLessonQuizzes(this.lesson.id)
        .then(({ quizzes }) => {
          this.fetchedQuizzes = quizzes;
        })
        .finally(this.stopLoading);
    },
    onBuy() {
      this.$emit('buy');
    },
    onTimelineClick(time) {
      this.$emit('onTimelineClick', time);
    },
    setLesson() {
      if (this.purchased || this.index === 0) {
        this.$emit('setLesson', this.lesson);
      }
    }
  }
};
</script>

<style lang="scss">
.lesson-collapse {
  border-radius: 15px;
  box-shadow: 0 10px 10px 0 rgba(14, 57, 107, 0.07);
  @include background-color('white');
}

.lesson-collapse__title {
  font-size: rem(16);
  overflow: hidden;
}

.lesson-collapse__head {
  @include background-color('bg-color');
  border: 1px solid color('light-blue');
  border-radius: 15px;
  padding: 22px 15px;
}

.lesson-collapse__icon {
  transition: transform $transition-duration-base;

  &--rotated {
    transform: rotate(180deg);
  }
}

.lesson-collapse__body {
  padding: 30px 15px;
  border-radius: 0 0 15px 15px;
}
</style>
