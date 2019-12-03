const getCaptions = () => {
  const captionContainer = document.querySelector('.caption-container')

  if (!captionContainer) return []

  const captions = captionContainer.querySelectorAll('.caption')
  const subtitle = []

  captions.forEach((item) => {
    const startTime = item.querySelector('.caption-start-time > span')
    const sentence = item.querySelector('.caption-text p')
    subtitle.push(`${startTime.innerHTML} ${sentence.innerHTML}`)
  })

  return subtitle
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request === 'detect-transcript') {
    sendResponse(getCaptions())
  }
})
