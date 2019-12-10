<template>
  <section class="v-lat-section v-lat-detected-transcript">
    <header v-if="hasTranscript" class="v-lat-detected-transcript-header">
      <button class="v-lat-button" @click="onClickDownload">Download subtitle</button>
      <button class="v-lat-button" @click="onToggleShowTime">
        {{ showTime ? 'Hide start time' : 'Display start time' }}
      </button>
      <button class="v-lat-button" @click="onClickCopy">Copy transcript</button>
    </header>

    <article class="v-lat-detected-transcript-content">
      <p v-for="(transcript, key) in transcripts" :key="key">
        <span v-if="showTime">{{ transcript.startTime }}</span>
        <span>{{ transcript.content }}</span>
      </p>
    </article>
  </section>
</template>

<script lang="ts">
import _get from 'lodash/get'
import _reduce from 'lodash/reduce'
import _isEmpty from 'lodash/isEmpty'
import copy from 'clipboard-copy'

import { Component, Vue } from 'vue-property-decorator'
import { Caption, DETECT_TRANSCRIPT } from '@/types/transcript'

const SHOW_TIME_KEY: string = 'v-lat-detected-transcript.showTime'

@Component
export default class Transcript extends Vue {
  transcripts: Array<Caption> = []
  showTime: boolean

  constructor() {
    super()

    this.showTime = JSON.parse(window.localStorage.getItem(SHOW_TIME_KEY) || 'false')
  }

  get hasTranscript(): boolean {
    return !_isEmpty(this.transcripts)
  }

  get transcriptText(): string {
    return _reduce(this.transcripts, (result: string, caption: Caption) => {
      result += this.showTime
        ? `${caption.startTime}  ${caption.content}\n`
        : `${caption.content}\n`

      return result
    }, '')
  }

  beforeMount(): void {
    this.detectTranscripts()
  }

  detectTranscripts(): void {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Array<Object>): void => {
      const activeTabId: number|null = _get(tabs, '[0].id')

      if (activeTabId) {
        chrome.tabs.sendMessage(activeTabId, DETECT_TRANSCRIPT, this.onDetectedTranscripts)
      }
    })
  }

  onDetectedTranscripts(captions: Array<Caption>): void {
    this.transcripts = captions
  }

  onToggleShowTime(): void {
    this.showTime = !this.showTime
    window.localStorage.setItem(SHOW_TIME_KEY, JSON.stringify(this.showTime))
  }

  onClickDownload(): void {
    alert('This feature is comming soon!')
  }

  onClickCopy():void {
    copy(this.transcriptText)
  }
}
</script>
