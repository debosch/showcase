<template>
  <div class="justify-content-center pt-3">
    <div class="text-center text-navy font-weight-bold font-title my-2 text-lg">
      {{ question.title }}
    </div>
    <div v-if="question.audio" class="text-center col-12 my-3">
      <RoundedButton class="d-inline-flex flex-center" @click="playAudio()"> <i class="nbr-sound mr-2 text-lg"></i> {{ $t('quiz.playSound') }} </RoundedButton>
    </div>
    <div class="matching row justify-content-center">
      <div v-if="!wordDrag" class="col-12 col-md-4">
        <div v-for="item in questionAnswers" :key="item.id" class="matching__word">
          {{ item.value[0].label }}
        </div>
      </div>
      <div class="col-12 d-flex justify-content-center flex-wrap" :class="wordDrag ? 'col-md-8' : 'col-md-4'">
        <Draggable v-model="answers" :disabled="question.submission" @start="onStart" @end="onEnd">
          <transition-group type="transition" name="list">
            <div v-for="item in answers" :key="item.id" :class="getClassName(item.id)" class="matching__item" :data-id="item.id">
              {{ item.value[0].value }}
            </div>
          </transition-group>
        </Draggable>
      </div>
    </div>
    <div class="col-12 text-center mt-3">
      <SubmissionStatus v-if="question.submission" :correct="question.submission.correct" :has-hint="question.hint" @showHint="showHint()" />
      <RoundedButton v-else @click="submit()">{{ $t('general.submit') }}</RoundedButton>
    </div>
  </div>
</template>

<script>
import Draggable from 'vuedraggable';

import SubmissionStatus from '~/components/Quiz/SubmissionStatus.vue';

import Question from '~/mixins/Question';
import HasLoading from '~/mixins/HasLoading';

export default {
  name: 'Matching',
  components: {
    Draggable,
    SubmissionStatus
  },
  mixins: [Question, HasLoading],
  props: {
    wordDrag: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  data() {
    return {
      selectedAnswerId: null,
      answers: []
    };
  },
  computed: {
    questionAnswers() {
      return this.question.answers;
    }
  },
  watch: {
    questionAnswers: {
      immediate: true,
      handler(value) {
        this.answers = value;
      }
    }
  },
  methods: {
    getClassName(itemId) {
      return {
        'matching__item--word-drag': this.wordDrag,
        'matching__item--active': itemId === this.selectedAnswerId,
        'matching__item--inactive': this.selectedAnswerId !== null && this.selectedAnswerId !== itemId
      };
    },
    onStart({ item }) {
      this.selectedAnswerId = parseInt(item.dataset.id);
    },
    onEnd() {
      this.selectedAnswerId = null;
    },
    submit() {
      this.startLoading();
      const answerIds = this.questionAnswers.map(({ id }) => id);

      const answer = answerIds.reduce((state, id, index) => {
        const question = this.questionAnswers[index].value[0].label;
        const questionAnswer = this.answers[index].value[0].value;

        state.push({ question, answer: questionAnswer });
        return state;
      }, []);

      this.$QuizService
        .sendAnswer(this.question.id, answer)
        .then(this.handleSubmission)
        .finally(this.stopLoading);
    }
  }
};
</script>

<style lang="scss" scoped>
@mixin matching-element {
  @include text-color('navy');
  padding: 8px 16px;
  margin-bottom: 8px;
  font-size: rem(16);
  text-align: center;
}

.matching {
  &__word {
    @include font-family('title');
    @include matching-element;
    font-weight: bold;
  }

  &__item {
    @include matching-element;
    @include background-color('white');
    @include font-family('regular');
    border: 1px solid transparentize(color('blue-grey'), 0.7);
    border-radius: 6px;
    box-shadow: 0 10px 10px 0 rgba(14, 57, 107, 0.07);
    cursor: pointer;
    margin-bottom: 10px;

    &--word-drag {
      display: inline-block;
      margin: 0 15px;
    }

    &--active {
      opacity: 0.6;
      border: 1px dashed color('blue-grey');
    }

    &--inactive {
      opacity: 0.4;
    }
  }
}

.list-move {
  transition: transform 0.4s;
}
</style>
