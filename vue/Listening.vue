<template>
  <CRow>
    <CCol lg="12">
      <CInput v-model="question.question" label="Question"/>
    </CCol>
    <CCol lg="12">
      <CButton color="primary" @click="addColumn()">Add Column</CButton>
    </CCol>
    <CCol lg="12">
      <CCardGroup class="py-2 d-flex flex-column listening__card-group">
        <CCard v-if="question.answers[0]" lg="4" v-for="column in question.answers" :key="column.id" class="listening__columns-container my-2 py-3">
          <CCol lg="12">
            <CInput label="Letter" v-model="column.title"/>
          </CCol>
          <div class="d-flex align-items-end flex-wrap my-1" v-for="(audio, index) in column.media" :key="index">
            <CCol lg="4" class="listening__audio-input-container">
              <InputFile class="listening__audio-input" :value="audio.fileInput" @input="setAudioFile(audio, $event)"/>
            </CCol>
            <CCol lg="2">
              <CInput class="listening__audio-text my-1" v-model="audio.label" label="Audio text" />
            </CCol>
            <CCol lg="3" class="my-1">
              <CButton color="danger" @click="removeAudio(column, audio.id)">Remove audio</CButton>
            </CCol>
          </div>
          <CCol lg="12">
            <CButton color="primary" @click="addAudioTo(column)">+ Add</CButton>
            <CButton color="danger" @click="removeColumn(column.id)" class="mx-2">Remove Column</CButton>
          </CCol>
        </CCard>
        <CCard v-else lg="4" v-for="column in columns" :key="column.id" class="listening__columns-container my-2 py-3">
          <CCol lg="12">
            <CInput label="Letter" v-model="column.title"/>
          </CCol>
          <div class="d-flex align-items-end flex-wrap my-1" v-for="(audio, index) in column.media" :key="index">
            <CCol lg="4" class="listening__audio-input-container">
              <InputFile class="listening__audio-input" :value="audio.fileInput" @input="setAudioFile(audio, $event)"/>
            </CCol>
            <CCol lg="2">
              <CInput class="listening__audio-text my-1" v-model="audio.label" label="Audio text" />
            </CCol>
            <CCol lg="3" class="my-1">
              <CButton color="danger" @click="removeAudio(column, audio.id)">Remove audio</CButton>
            </CCol>
          </div>
          <CCol lg="12">
            <CButton color="primary" @click="addAudioTo(column)">+ Add</CButton>
            <CButton color="danger" @click="removeColumn(column.id)" class="mx-2">Remove Column</CButton>
          </CCol>
        </CCard>
      </CCardGroup>
    </CCol>
  </CRow>
</template>


<script lang="ts">
import { Component, Mixins, Watch } from 'vue-property-decorator';
import Question from '@/mixins/Question';
import InputFile from '@/components/FormControls/InputFile.vue';
import { Nullable } from '@/types';

interface IMedia {
  id: number,
  fileInput: Nullable<File>,
  file: string;
  label: string;
  collection: string,
}

interface IColumn {
  id: number;
  title: string;
  media: IMedia[],
}

@Component({
  components: {
    InputFile,
  },
  mixins: [Question],
})

export default class Listening extends Mixins(Question) {
  columns: IColumn[] = [];
  @Watch('columns', { deep: true })
  
  onColumnsChange(value: any) {
    this.question.answers = value
  }

  addColumn() {
    this.columns.push({
      id: this.columns.length,
      title: '',
      media: [],
    });
  }

  addAudioTo(column: IColumn) {
    const newItem = {
      id: column.media.length,
      fileInput: null,
      file: '',
      label: '',
      collection: 'audio',
    };
    this.$set(column, 'media', column.media.concat(newItem));
  }

  removeColumn(id: number) {
    this.columns = this.columns.filter((column) => column.id !== id);
  }

  removeAudio(column: IColumn, id: number) {
    column.media = column.media.filter((audio) => audio.id !== id);
  }

  setAudioFile(audio: any, file: File) {
    this.$QuestionService.saveNameAudioFile(file).then(({ name }) => {
      audio.fileInput = file;
      audio.file = name;
   }).catch((e) => console.log(e));
  }
};
</script>

<style lang="scss">
.listening__card-group {
  .card {
    border-left: 1px solid #d8dbe0;
  }
}

.listening__columns-container {
  height: fit-content;
  border-left-color: #d8dbe0;
}

.listening__audio-text {
  margin-bottom: 0;
}
</style>
