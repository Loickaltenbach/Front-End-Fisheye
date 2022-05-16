/* modal */
function displayModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'flex'
  }
  
  function closeModal() {
    const modal = document.getElementById('contact_modal')
    modal.style.display = 'none'
  }
  
  document
    .querySelector('.photograph-header > .contact_button')
    .addEventListener('click', displayModal)
  
  document.addEventListener('keydown', (e) => {
    switch (e.key) {
      case 'Escape':
        if (document.querySelector('#contact_modal').style.display !== 'none') closeModal()
        break
      default:
        break
    }
  })
  
  document.querySelector('.modal img').addEventListener('click', closeModal)
  
  /* form */
  
  const formDatas = document.querySelectorAll('.formData')
  const firstname = document.querySelector('#firstname')
  const firstnameWrap = formDatas[0]
  const lastname = document.querySelector('#lastname')
  const lastnameWrap = formDatas[1]
  const email = document.querySelector('#email')
  const emailWrap = formDatas[2]
  const message = document.querySelector('#message')
  const messageWrap = formDatas[3]
  const sendButton = document.querySelector('#contact_modal form .contact_button')
  
  const errorMessage = [
    'Veuillez entrer 2 caractères ou plus pour le champ du prénom.',
    'Veuillez entrer 2 caractères ou plus pour le champ du nom.',
    'Veuillez entrer une adresse mail valide.',
    'Veuillez entrer un message entre 10 et 140 caractères.'
  ]
  
  // add error message
  errorMessage.forEach((message, index) => {
    formDatas[index].setAttribute('data-error', message)
  })
  
  //regEx
  const mailRegex =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ // eslint-disable-line
  const nameRegex = /^[a-zA-Zéèêëàâîïôûç\- ]+$/
  
  function checkElementError(element, condition) {
    element.setAttribute('data-error-visible', condition)
    return condition
  }
  // conditions
  const isEmpty = (element) => element.value === ''
  const textCondidtion = (element) =>
    isEmpty(element) || element.value.length < 2 || !nameRegex.test(element.value)
  const mailCondidtion = (element) => !mailRegex.test(element.value)
  const messageCondition = (element) =>
    element.value.length < 10 || element.value.length > 140
  
  // element validation
  const checkFirst = () => checkElementError(firstnameWrap, textCondidtion(firstname))
  const checkLast = () => checkElementError(lastnameWrap, textCondidtion(lastname))
  const checkEmail = () => checkElementError(emailWrap, mailCondidtion(email))
  const checkMessage = () => checkElementError(messageWrap, messageCondition(message))
  
  // form validation event
  firstname.addEventListener('focusout', checkFirst)
  lastname.addEventListener('focusout', checkLast)
  email.addEventListener('focusout', checkEmail)
  message.addEventListener('focusout', checkMessage)
  sendButton.addEventListener('click', validForm)
  // validate form
  function validForm(event) {
    event.preventDefault()
    if (!(checkFirst() || checkLast() || checkEmail() || checkMessage())) {
      // formData.forEach((e) => (e.style.opacity = 0))
  
      document.querySelectorAll('.formData input').forEach((e) => {
        console.log(e.value)
        e.value = ''
      })
      document.querySelectorAll('.formData textarea').forEach((e) => {
        console.log(e.value)
        e.value = ''
      })
      formDatas.forEach((e) => checkElementError(e, false))
    }
  }