
// setTimeout(() => {
//   const entries = document.querySelectorAll('article')
//   entries.forEach(entry => {
//     console.log(entry.getBoundingClientRect().top + window.pageYOffset)
//   })

//   for (let i = 0; i < entries.length; i++) {
//     setTimeout(() => {
//       window.scrollTo({
//         top: entries[i].getBoundingClientRect().top + window.pageYOffset,
//         left: 0,
//         behavior: 'smooth',
//       })
//     }, 1000 * i)
//   }

// }, 2000)