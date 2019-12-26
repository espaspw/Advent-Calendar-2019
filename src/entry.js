import crel from 'crel'
import entryStyles from './entry.mcss'


export default (props = {}) => {
  const entryDiv = crel('div', {class: entryStyles['entry-text']})
  entryDiv.innerHTML = props.entry
  return crel('article', {class: `${entryStyles['container']} ${props.lang === 'Japanese' ? entryStyles['japanese'] : ''}`}, 
    crel('div', {class: entryStyles['header']},
      crel('img', {src: props.avatar, class: entryStyles['avatar']}),
      crel('div', {class: entryStyles['author-info']},
        crel('h3', {class: entryStyles['username']}, props.username),
        crel('div', {class: entryStyles['date']}, props.date)
      )
    ),
    entryDiv
  )
}