export default function photographerFactory({
    name,
    portrait,
    city,
    country,
    id,
    price,
    tagline,
    likeCount
  }) {
    const picture = `../assets/photographers/${portrait.split('.')[0]}.jpg`
    var a
    console.log(a)
    function getUserCardDOM() {
      const article = document.createElement('article')
      article.classList.add('photographer_card')
  
      const html = `
      <a href="photographer.html?id=${id}">
        <figure>
          <img src="${picture}" alt="profile" aria-label="${name}">
          <figcaption>
            <h2>${name}</h2>
          </figcaption>
        </figure>
      </a>
      <p class="location">${city}, ${country}</p>
      <p class="tagline">${tagline}</p>
      <p class="price">${price}€</p>
      `
      article.innerHTML = html
  
      return article
    }
  
    function getHeaderInfoDOM() {
      const div = document.createElement('div')
      div.classList.add('photographer-info')
      const html = `
      <h1 class="name">${name}</h1>
      <div>
        <p class="location">${city}, ${country}</p>
        <p class="tagline">${tagline}</p>
      </div>
      <span class="photograph-like">
        <p class="like-count">${likeCount
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ' ')}</p>
        <i class="fas fa-heart"></i>
        <p class="price">${price}€/jour</p>
      </span>
      `
      div.innerHTML = html
  
      return div
    }
  
    function getHeaderPortraitDOM() {
      const img = document.createElement('img')
      img.src = picture
      img.alt = name
      return img
    }
  
    function getFormHeaderDOM() {
      const chn = document.createElement('h2')
      chn.innerHTML = `${name}`
      return chn
    }
  
    return {
      name,
      picture,
      getUserCardDOM,
      getHeaderInfoDOM,
      getHeaderPortraitDOM,
      getFormHeaderDOM
    }
  }