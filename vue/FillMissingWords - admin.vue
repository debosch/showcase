<template>
  <div>
    <CRow>
      <CCol col="12">
        <CInput v-model="question.question" label="Question" />
      </CCol>
    </CRow>
    <CRow>
      <CCol col="12">
        <div class="d-flex align-center" v-if="isUrl(question.audio)" >
          <audio controls>
            <source :src="question.audio" />
          </audio>
          <CButton color="danger" class="ml-3" @click="removeFile()">
            <CIcon name="cil-trash" />
          </CButton>
        </div>
        <CInputFile
            v-else
            label="Audio File"
            name="audio"
            @change="setFile"
            type="file"
            accept="audio/mp4 audio/mp3"
        />
      </CCol>
    </CRow>
    <CRow>
      <CCol lg="5">
        <CInput placeholder="Write missing word here" v-model="blankText"/>
      </CCol>
      <CCol lg="3">
        <CButton @click="handleBlankAddition" color="success" type="submit">Add blank</CButton>
      </CCol>
      <CCol lg="12">
        <ol>
          <draggable v-model="question.answers">
            <li v-for="answer in question.answers" :key="answer.id">
              <button class="mr-2 border-0 bg-transparent">&varr;</button>
              {{ answer.value }}
              <button class="ml-2 border-0" @click="removeAnswer(answer.id)">&times;</button>
            </li>
          </draggable>
        </ol>
      </CCol>
      <CCol>
        <CInputCheckbox @change="handleChange" class="my-1" label="Insert blanks" />
      </CCol>
      <CCol col="12" class="fill-blank-space__answer-container">
        <p class="fill-blank-space__textarea-label">Text</p>
        <textarea
            placeholder="Text with missing words"
            v-if="!showParsedText"
            v-model="question.text"
            class="fill-blank-space__textarea"
            ref="textarea"
        />
        <textarea
            v-else
            :placeholder="getParsedText(question.text) ||
              `You have no blanks, insert ${this.BLANK_TEMPLATE} somewhere in the field`"
            disabled
            class="fill-blank-space__textarea"
            ref="textarea" />
      </CCol>
    </CRow>
  </div>
</template>

<script lang="ts">
import { Component, Mixins } from 'vue-property-decorator';
import Question from '@/mixins/Question';
import draggable from 'vuedraggable';
import idGenerator from '@/IdGenerator';
import { IFillMissingWordsAnswer } from '@/interfaces';

@Component({
  components: {
    draggable,
  },
  mixins: [Question],
})
export default class FillBlank extends Mixins(Question) {
  readonly BLANK_TEMPLATE = '%BLANK%';

  $refs!: {
    textarea: HTMLTextAreaElement,
  };

  currentBlankText: string = '';
  parsedText: boolean = false;

  get blankText(): string {
    return this.currentBlankText;
  }

  set blankText(value: string) {
    this.currentBlankText = value;
  }

  get showParsedText(): boolean {
    return this.parsedText;
  };

  set showParsedText(value: boolean) {
    this.parsedText = value;
  }

  getParsedText(text: string): string {
    let blankIndex = 0;
    let updatedText = text;

    const answers: Array<string> = this.question.answers.map((answer: IFillMissingWordsAnswer) => answer.value);

    const blankTemplateRegEx = new RegExp(this.BLANK_TEMPLATE);

    answers.forEach((answer: string) => {
      updatedText = updatedText.replace(blankTemplateRegEx, answers[blankIndex]);
      blankIndex++;
    });

    return updatedText;
  };

  handleChange(event: Event & { target: HTMLInputElement }) {
    const { target } = event;
    this.showParsedText = target.checked;
  };

  handleBlankAddition() {
    this.question.answers.push({
      id: idGenerator.generate(),
      value: this.blankText,
    });
    this.question.text += this.BLANK_TEMPLATE;
    this.blankText = '';
  };

  removeAnswer(answerId: number) {
    this.question.answers = this.question.answers.filter((item: IFillMissingWordsAnswer) => item.id !== answerId);
  }
};
</script>

<style scoped lang="scss">
 .fill-blank-space__textarea {
   display: block;
   width: 100%;
   height: 100%;
   min-height: 150px;
   overflow-y: auto;
   padding: 0.375rem 0.75rem;
   font-size: 0.875rem;
   font-weight: 400;
   line-height: 1.5;
   background-clip: padding-box;
   border: 1px solid #d8dbe0;
   color: #768192;
   background-color: #fff;
   border-radius: 0.25rem;
   outline: none;
 }

 .fill-blank-space__textarea-label {
   margin-bottom: 5px;
 }

 .fill-blank-space__answer-container {
   height: 100%;
 }
</style>