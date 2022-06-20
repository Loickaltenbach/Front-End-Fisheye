import mediaFactory from '../factories/media.js'
import photographerFactory from '../factories/photographer.js'

async function getPhotographer(id) {
  const response = await fetch('../data/photographers.json')
  const data = await response.json()
  const photographer = data.photographers.find((photographer) => photographer.id === id)
  const media = data.media.filter((media) => media.photographerId === id)
  return {
    photographer: photographer,
    media: media
  }
}

// main
(async () => {
  // recupere l'id du photographe dans l'url
  const url = new URL(window.location.href)
  const photographersId = parseInt(url.searchParams.get('id'))

  // Récupère les datas du photographe
  const photographerData = await getPhotographer(photographersId)
  let { media } = photographerData
  const { photographer } = photographerData

  photographer.likeCount = media.map((m) => m.likes).reduce((a, b) => a + b, 0)

  const lightbox = document.querySelector('.lightbox')
  const lbMedia = document.querySelector('#lightbox-media')
  const lbTitle = document.querySelector('#lightbox-title')

  let lbIndex = 0
  let lbOpen = false

  async function displayHeader() {
    const photographerModel = photographerFactory(photographer)

    // page header
    const photographerHeader = document.querySelector('.photograph-header')
    photographerHeader.prepend(photographerModel.getHeaderInfoDOM())
    photographerHeader.append(photographerModel.getHeaderPortraitDOM())

    // form header
    document
      .querySelector('#contact_modal header')
      .appendChild(photographerModel.getFormHeaderDOM())
  }

  async function displayMedia(medias) {
    const container = document.querySelector('#media-container')
    container.innerHTML = ''
    for (const media of medias) {
      const mediaModel = mediaFactory(media, photographer)
      const mediaDOM = mediaModel.getMediaDOM()
      container.appendChild(mediaDOM)
    }
  }

  function openLightbox(m) {
    const mediaModel = mediaFactory(m, photographer)
    const mediaElement = mediaModel.getLightboxMediaDOM()

    lbMedia.innerHTML = ''
    lbTitle.innerHTML = m.title
    lbMedia.appendChild(mediaElement)
    lightbox.classList.add('active')
    lbOpen = true
  }

  function lbClose() {
    lightbox.classList.remove('active')
    lbMedia.innerHTML = ''
    lbOpen = false
  }

  function lbPrev() {
    lbIndex--
    if (lbIndex < 0) lbIndex = media.length - 1
    openLightbox(media[lbIndex])
  }

  function lbNext() {
    lbIndex++
    if (lbIndex > media.length - 1) lbIndex = 0
    openLightbox(media[lbIndex])
  }

  function sortByDate(a, b) {
    return new Date(b.date) - new Date(a.date)
  }

  function sortByLikes(a, b) {
    return b.likes - a.likes
  }

  function sortByTitle(a, b) {
    return a.title.localeCompare(b.title)
  }

  function sortAndDisplayMedia(sort) {
    media = media.sort(sort)
    displayMedia(media, photographer)
    const mediasCardDOM = document.querySelectorAll('.media_card')
    mediasCardDOM.forEach((el, i) => {
      el.addEventListener('click', (e) => {
        if (e.target.closest('figure') && !lbOpen && !e.target.closest('figcaption')) {
          lbIndex = i
          openLightbox(media[lbIndex])
        }
        if (e.target.closest('#like > i')) {
          const likeBtn = e.target.closest('#like > i')
          const likeLocal = e.target.closest('#like').childNodes[1]
          const likeGlobal = document.querySelector('.photograph-like > .like-count')

          const likeInc = (el, decr = false) =>
            (el.innerHTML = parseInt(el.innerHTML) + (decr ? -1 : 1))

          if (likeBtn.classList.contains('liked')) {
            likeBtn.classList.toggle('liked', false)
            likeInc(likeLocal, true)
            likeInc(likeGlobal, true)
          } else {
            likeBtn.classList.toggle('liked', true)
            likeInc(likeLocal)
            likeInc(likeGlobal)
          }
        }
      })
    })
  }

  document.querySelector('#ctrl-prev').addEventListener('click', lbPrev)
  document.querySelector('#ctrl-next').addEventListener('click', lbNext)
  document.querySelector('#ctrl-close').addEventListener('click', lbClose)

  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        if (lbOpen) lbClose()
        break
      case 'ArrowLeft':
        if (lbOpen) lbPrev()
        break
      case 'ArrowRight':
        if (lbOpen) lbNext()
        break
      default:
        break
    }
  })
  document.querySelector('#sort-select').addEventListener('click', (e) => {
    switch (e.target.getAttribute('value').toLowerCase()) {
      case 'date':
        sortAndDisplayMedia(sortByDate)
        break
      case 'popularity':
        sortAndDisplayMedia(sortByLikes)
        break
      case 'title':
        sortAndDisplayMedia(sortByTitle)
        break
      default:
        break
    }
  })

  displayHeader(photographer)
  sortAndDisplayMedia(sortByLikes)
})()