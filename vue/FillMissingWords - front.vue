<template>
  <div class="fill-missing-words">
    <div class="question text-center">{{ question.title }}</div>
    <div v-if="question.audio" class="text-center col-12 my-3">
      <RoundedButton class="d-inline-flex flex-center" @click="playAudio()"> <i class="nbr-sound mr-2 text-lg"></i> {{ $t('quiz.playSound') }} </RoundedButton>
    </div>
    <div style="text-align: center">
      <span v-for="(word, index) in availableWords" :key="index" class="fill-missing-words__word">{{ word }}</span>
    </div>
    <div ref="textContainer" class="fill-missing-words__text-container"></div>
    <div class="col-12 text-center mt-3">
      <SubmissionStatus v-if="question.submission" :correct="question.submission.correct" />
      <RoundedButton v-else @click="submit()">{{ $t('general.submit') }}</RoundedButton>
    </div>
  </div>
</template>

<script>
import Question from '@/mixins/Question';
import HasLoading from '~/mixins/HasLoading';
import SubmissionStatus from '~/components/Quiz/SubmissionStatus';

export default {
  name: 'FillMissingWords',
  components: {
    SubmissionStatus
  },
  mixins: [Question, HasLoading],
  data: () => ({
    answers: []
  }),
  computed: {
    availableWords() {
      return this.question.answers.map((answer) => answer.value.value.trim());
    },
    splitText() {
      return this.question.text.split(' ');
    }
  },
  mounted() {
    this.getTextWithInputs(this.splitText);
  },
  methods: {
    setAnswer(event) {
      const updatedAnswers = [...this.answers];

      const { target } = event;
      updatedAnswers[target.dataset.id] = target.value;
      this.answers = updatedAnswers;
    },
    getTextWithInputs() {
      const answer = this.question.answers.map((a) => a.value);
      const container = this.$refs.textContainer;
      let newText = this.question.text;

      answer.forEach((value, index) => {
        newText = newText.replace('%BLANK%', `<input data-id="${index}" placeholder="_" type="text" class="fill-missing-words__input" />`);
      });

      container.innerHTML = newText;

      for (let i = 0; i < container.children.length; i++) {
        const input = container.children[i];
        input.addEventListener('change', this.setAnswer);
      }
    },
    submit() {
      this.startLoading();
      const answer = this.answers.map((answer) => answer.trim().toLowerCase());
      this.$QuizService
        .sendAnswer(this.question.id, answer)
        .then(this.handleSubmission)
        .finally(this.stopLoading);
    }
  }
};
</script>

<style lang="scss">
.fill-missing-words {
  color: #031d3c;
  font-family: 'GalanoGrotesqueAltDEMO', sans-serif;

  &__input {
    font-weight: bold;
    position: relative;
    max-width: 150px;
    min-width: 50px;
    width: min-content;
    height: 35px;
    margin: 0 5px;
    padding: 11px 15px;
    box-shadow: 0 10px 10px 0 rgba(14, 57, 107, 0.1);
    background-color: white;
    border: 1px solid #eeeeee;
    border-radius: 14px;

    &::placeholder {
      position: absolute;
      background-color: #eeeeee;
      border-radius: 10px;
      height: 1px;
      bottom: 7px;
      left: 15px;
      right: 15px;
    }
  }

  &__word {
    color: #031d3c;
    font-weight: bold;

    &:not(:last-of-type)::after {
      content: '/';
      margin: 0 15px;
    }
  }

  &__input {
  }

  &__text-container {
    font-family: 'Open Sans', sans-serif;
    color: #031d3c;
    line-height: 40px;
    padding: 10px 25px;
  }
}
</style>
