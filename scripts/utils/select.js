const sortSelect = document.querySelector('#sort-select')

function swapNodeChilds(node1, node2) {
  const afterNode2 = node2.nextElementSibling
  const parent = node2.parentNode
  node1.replaceWith(node2)
  parent.insertBefore(node1, afterNode2)
}

const swapSelectOptions = (oldValue, newValue) => {
  swapNodeChilds(
    document.querySelector(`#sort-select *[value="${oldValue}"]`),
    document.querySelector(`#sort-select *[value="${newValue}"]`)
  )
  sortSelect.setAttribute('value', newValue)
}

sortSelect.addEventListener('click', (e) => {
  e.preventDefault()
  const el = e.target.closest('*[value]')
  const value = el.getAttribute('value')
  const oldValue = sortSelect.getAttribute('value')
  swapSelectOptions(oldValue, value)
})