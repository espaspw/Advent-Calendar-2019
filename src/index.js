import topbarStyles from './top-bar.mcss'

function getDocumentOffsetOfNode(node) {
  return node.getBoundingClientRect().top + window.pageYOffset
}

function getDocumentOffsets(nodes) {
  return Array.from(nodes).map(entry => {
    return getDocumentOffsetOfNode(entry)
  })
}

function debounce(ms, func) {
  let debouncing = false
  return () => {
    if (debouncing) return;
    func()
    debouncing = true
    setTimeout(() => {
      debouncing = false;
    }, ms)
  }
}

setTimeout(() => {
  const entries = document.querySelectorAll('article')
  const topbar = document.querySelector(`.${topbarStyles['main-container']}`)
  const topbarButtons = document.querySelectorAll(`.${topbarStyles.button}`)

  let scrollOffsets = getDocumentOffsets(entries) 

  topbarButtons.forEach((topbarButton, idx) => {
    topbarButton.addEventListener('click', () => {
      window.scrollTo({
        top: scrollOffsets[idx] - 130,
        left: 0,
        behavior: 'smooth',
      })
    })
  })

  function updateTopbar() {
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
  }

  updateTopbar()
  document.addEventListener('scroll', debounce(50, updateTopbar))
  window.addEventListener('resize', debounce(50, () => {
    scrollOffsets = getDocumentOffsets(entries)
  }))
}, 5000)