<template>
  <section class="v-lat-section v-lat-detected-transcript">
    <header v-if="hasTranscript" id="detected-transcript-header">
      <button class="v-lat-button" @click="downloadSubtitle">Download transcript</button>
      <button class="v-lat-button" @click="detectTranscripts">Detect again</button>
    </header>

    <article id="detected-transcript-content">
      <p v-for="(transcript, key) in transcripts" :key="key">
        {{ transcript.content }}
      </p>
    </article>
  </section>
</template>

<script lang="ts">
import _get from 'lodash/get'
import _transform from 'lodash/transform'
import { Component, Vue } from 'vue-property-decorator'
import { Caption, DETECT_TRANSCRIPT } from '@/types/transcript'

@Component
export default class TranscriptSection extends Vue {
  transcripts: Array<Caption> = []

  get hasTranscript(): Boolean {
    return Boolean(this.transcripts.length)
  }

  detectTranscripts = (): void => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs: Array<Object>): void => {
      const activeTabId: number|null = _get(tabs, '[0].id')

      if (!activeTabId) return

      chrome.tabs.sendMessage(
        activeTabId,
        DETECT_TRANSCRIPT,
        (transcripts: Array<Caption> = []) => {
          this.transcripts = transcripts
        }
      )
    })
  }

  downloadSubtitle = (): void => {
    alert('This feature is comming soon!')
  }

  mounted(): void {
    window.addEventListener('load', this.detectTranscripts)
  }
}
</script>
