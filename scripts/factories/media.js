export default function mediaFactory(
    { image, video, likes, title },
    { name }
  ) {
    const path = (el) => `../assets/images/${name.split(' ')[0].split('-').join(' ')}/${el}`
  
    function videoDOM(controle = false) {
      const videoEL = document.createElement('video')
      if (controle) videoEL.setAttribute('controls', true)
      videoEL.innerHTML = `
        <source src="${path(video)}" type='video/mp4'>
        <p>Votre navigateur ne supporte pas les vidéos HTML5.</p>`
      videoEL.tabIndex = -1
      videoEL.title = title
      videoEL.setAttribute('aria-label', title)
      return videoEL
    }
  
    function imageDOM() {
      const img = document.createElement('img')
      img.src = `${path(image.split('.')[0])}.jpg`
      img.alt = title
      return img
    }
  
    function getMediaDOM(index) {
      const figure = document.createElement('figure')
      figure.classList.add('media_card')
      figure.classList.toggle('video', !!video)
      figure.tabIndex = index
      figure.innerHTML = `
        <figcaption>
          <h2>${title}</h2>
          <span id="like">
            <p>${likes}</p>
            <i class="fas fa-heart" aria-label="likes" tabIndex="${index + 1}"></i>
          </span>
        </figcaption>
      `
      figure.prepend(image ? imageDOM(true) : videoDOM())
      return figure
    }
  
    function getLightboxMediaDOM() {
      let mediaElement
      if (video) {
        mediaElement = videoDOM(true)
      } else {
        mediaElement = imageDOM()
      }
      return mediaElement
    }
  
    return { getMediaDOM, getLightboxMediaDOM }
  }