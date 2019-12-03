const transcriptContentBox = document.querySelector('#detected-transcript-content')
const transcriptHeaderBox = document.querySelector('#detected-transcript-header')
const btnDownload = document.querySelector('#btn-download-transcript')
const btnReload = document.querySelector('#btn-reload-transcript')

const showTranscripts = () => {
  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    chrome.tabs.sendMessage(tabs[0].id, 'detect-transcript', (transcript = []) => {
      if (transcript.length) {
        transcriptHeaderBox.style.display = 'block'
        transcriptContentBox.innerHTML = transcript.join('<br/>\n')
      } else {
        transcriptHeaderBox.style.display = 'none'
      }
    })
  })
}

window.addEventListener('load', showTranscripts)
btnReload.addEventListener('click', showTranscripts)
btnDownload.addEventListener('click', () => alert('This feature is comming soon!'))
