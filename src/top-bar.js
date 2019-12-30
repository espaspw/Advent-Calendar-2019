import crel from 'crel'
import style from './top-bar.mcss'


export default (options = { entryDates: [] }) => {
  const buttons = []
  options.entryDates.forEach(entryDate => {
    buttons.push(crel('button', {class: style['button'], id: `button-${entryDate}`}, entryDate))
  })
  return (
    crel('nav', {class: `${style['main-container']} ${style['top-of-page']}`}, 
      crel('div', {class: style['button-container']}, 
        ...buttons
      )
    )
  )
}