import crel from 'crel'
import globalStyles from './global.css'
import pageStyles from './page.mcss'
import entry from './entry'


function replaceAll(str, map) {
  const regEx = new RegExp(Object.keys(map).join('|'), "gi")
  return str.replace(regEx, (matched) => {
    console.log(matched)
    return map[matched]
  })
}

function zipArraysIntoObj(arr1, arr2) {
  const output = {}
  arr1.forEach((val1, idx) => {
    output[val1] = arr2[idx]
  })
  return output
}

function combineEmojiNamesWithImageData(emojiNames, emojiData) {
  const wrappedEmojiNames = emojiNames.map(emojiName => `:${emojiName}:`)
  const emojiMap = zipArraysIntoObj(wrappedEmojiNames, emojiData)
  for (const key in emojiMap) {
    emojiMap[key] = `<img class="${pageStyles['emoji']}" src=${emojiMap[key].default}>`
  }
  return emojiMap
}

function createImageMapFromImageArray(images) {
  const output = {}
  images.forEach((image, idx) => {
    output[`::${idx}::`] = `<img class="${pageStyles['image']}" src=${image.default}>`
  })
  return output
}

function fetchEntryPromises(entryNumbers) {
  const entryDataPromises = entryNumbers.map((entryNumber) => {
    return import(`./data/entries/${entryNumber}.js`).then((entryData) => {
        return import(`./data/avatars/${entryData.default.avatar}`).then((avatar) => {
            return {...entryData.default, avatar: avatar.default}
        })
      })
  })
  return entryDataPromises
}

async function main() {
  const entryNumbers = [1, 2, 22, 24]
  const entryDataPromises = fetchEntryPromises(entryNumbers)
  
  await Promise.all(entryDataPromises).then(async (entryData) => {
    const entryComponentPromises = entryData.map(async (entryData) => {
      let entryText = entryData.entry
      if (entryData.emojis) {
        const emojiImagePromises = entryData.emojis.map((emojiName) => {
          return import(`./data/emojis/${emojiName}.png`)
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
          const imageMap = createImageMapFromImageArray(images)
          console.log(imageMap)
          entryText = replaceAll(entryText, imageMap)
        })
      }
      return entry({...entryData, entry: entryText})
    })

    await Promise.all(entryComponentPromises)
      .then(entryComponents => {
        document.body.appendChild(
          crel('div', {class: pageStyles['container']}, 
            crel('h1', {class: pageStyles['title']}, 'EJLX Advent Calendar 2019'),
            ...entryComponents
          )
        )
      })
  })
}

main();

// export default main