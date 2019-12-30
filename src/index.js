import topbarStyles from './top-bar.mcss'

function getDocumentOffsetOfNode(node) {
  return node.getBoundingClientRect().top + window.pageYOffset
}

setTimeout(() => {
  const entries = document.querySelectorAll('article')
  const scrollOffsets = Array.from(entries).map(entry => {
    return getDocumentOffsetOfNode(entry)
  })

  const topbar = document.querySelector(`.${topbarStyles['main-container']}`)
  const topbarButtons = document.querySelectorAll(`.${topbarStyles.button}`)
 
  topbarButtons.forEach((topbarButton, idx) => {
    topbarButton.addEventListener('click', () => {
      window.scrollTo({
        top: scrollOffsets[idx] - 130,
        left: 0,
        behavior: 'smooth',
      })
    })
  })


  let debouncing = false
  document.addEventListener('scroll', () => {
    if (debouncing) return
    console.log(getDocumentOffsetOfNode(entries[0]))
    if (window.pageYOffset < getDocumentOffsetOfNode(entries[0])) {
      topbar.classList.add(topbarStyles['top-of-page'])
    } else {
      topbar.classList.remove(topbarStyles['top-of-page'])
    }
    topbarButtons.forEach((topbarButton, idx) => {
      if (window.pageYOffset + 150 > scrollOffsets[idx]) {
        topbarButton.classList.add(topbarStyles['active'])
      } else {
        topbarButton.classList.remove(topbarStyles['active'])
      }
    })
    debouncing = true
    setTimeout(() => {
      debouncing = false;
    }, 50)
  })
}, 5000)