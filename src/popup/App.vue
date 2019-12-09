<template>
  <app id="#app" class="v-lat-app">
    <Header />

    <main class="v-lat-content">
      <TranscriptSection />
    </main>

    <Footer />
  </app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Header from '~/components/Header.vue'
import Footer from '~/components/Footer.vue'
import TranscriptSection from '~/components/Sections/Transcript.vue'

@Component({
  components: {
    Header,
    Footer,
    TranscriptSection,
  }
})
export default class App extends Vue {}
</script>

<style lang="scss">
#app {
  background: red;
}
</style>
