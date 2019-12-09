import { Caption, DETECT_TRANSCRIPT } from '@/types/transcript'

const getCaptions = (): Array<Caption> => {
  const captions: Array<Caption> = []
  const elements: NodeListOf<Element>= document.querySelectorAll('.caption-container .caption')

  elements.forEach((item: Element): void => {
    const startTime: Element|null = item.querySelector('.caption-start-time > span')
    const sentence: Element|null = item.querySelector('.caption-text p')

    if (startTime && sentence) {
      captions.push({
        startTime: startTime.innerHTML,
        content: sentence.innerHTML,
      })
    }
  })

  return captions
}

chrome.runtime.onMessage.addListener((request: string, _, sendResponse: Function):void => {
  if (request === DETECT_TRANSCRIPT) {
    sendResponse(getCaptions())
  }
})
