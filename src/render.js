import crel from 'crel'
import globalStyles from './global.css'
import pageStyles from './page.mcss'

import entry from './entry'
import topbar from './top-bar'


function replaceAll(str, map) {
  const regEx = new RegExp(Object.keys(map).join('|'), "gi")
  return str.replace(regEx, (matched) => {
    return map[matched]
  })
}

function range(length, start = 0) {
  return [...Array(length).keys()].map(x => x + start)
}

/**
 * arr1: ['a', 'b', 'c']
 * arr2: [1, 2, 3]
 * output: { a: 1, b: 2, c: 3 }
 */
function zipArraysIntoObj(arr1, arr2) {
  const output = {}
  arr1.forEach((val1, idx) => {
    output[val1] = arr2[idx]
  })
  return output
}

function combineEmojiNamesWithImageData(emojiNames, emojiData) {
  const wrappedEmojiNames = emojiNames.map(emojiName => {
    if (typeof emojiName === 'string')
      return `:${emojiName}:`
    return `:${emojiName.name}:`
  })
  const emojiMap = zipArraysIntoObj(wrappedEmojiNames, emojiData)
  for (const key in emojiMap) {
    emojiMap[key] = `<img class="${pageStyles['emoji']}" src=${emojiMap[key].default}>`
  }
  return emojiMap
}

function createImageHTMLMapFromImageArray(images) {
  const output = {}
  images.forEach((image, idx) => {
    output[`::${idx}::`] = `<img class="${pageStyles['image']}" src=${image.default}>`
  })
  return output
}

function fetchEntryPromises(entryNumbers) {
  const entryDataPromises = entryNumbers.map((entryNumber) => {
    return import(`./data/entries/${entryNumber}.js`).then((entryData) => {
        if (entryData.default.avatar == null) 
          return { ...entryData.default, avatar: null }
        return import(`./data/avatars/${entryData.default.avatar}`).then((avatar) => {
            return {...entryData.default, avatar: avatar.default}
        })
      }).catch((error) => {
        return { username: 'Not found', date: 'Not found', entry: '' }
      })
  })
  return entryDataPromises
}

async function main() {
  const entryDates = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 19.1, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
  const entryNumbers = range(26, 1)
  const entryDataPromises = fetchEntryPromises(entryNumbers)
  
  await Promise.all(entryDataPromises).then(async (entryData) => {
    const entryComponentPromises = entryData.map(async (entryData) => {
      let entryText = entryData.entry
      if (entryData.emojis) {
        const emojiImagePromises = entryData.emojis.map((emojiName) => {
          if (typeof emojiName === 'string')
            return import(`./data/emojis/${emojiName}.png`)
          return import(`./data/emojis/${emojiName.name}.${emojiName.type}`)
        })
        await Promise.all(emojiImagePromises).then(emojiImages => {
          const emojiMap = combineEmojiNamesWithImageData(entryData.emojis, emojiImages)
          entryText = replaceAll(entryText, emojiMap)
        })
      }
      if (entryData.images) {
        const imagePromises = entryData.images.map((imageName) => {
          return import(`./data/images/${entryData.entryNumber}-${imageName}.png`)
        })
        await Promise.all(imagePromises).then(images => {
          const imageMap = createImageHTMLMapFromImageArray(images)
          entryText = replaceAll(entryText, imageMap)
        })
      }
      return entry({...entryData, entry: entryText})
    })

    await Promise.all(entryComponentPromises)
      .then(entryComponents => {
        document.body.appendChild(
          crel('h1', {class: pageStyles['title']}, 'EJLX Advent Calendar 2019'),
        )
        document.body.appendChild(
          topbar({
            entryDates,
          })
        )
        document.body.appendChild(
          crel('div', {class: pageStyles['container']}, 
            ...entryComponents
          )
        )
      })
  })
}

// main()

export default main