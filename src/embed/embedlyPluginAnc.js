import decorateComponentWithProps from 'decorate-component-with-props';
import addEmbed from './modifiers/addEmbed';
import EmbedComponent from './components/embedlyCard';
import embedStyles from './embedStyles.module.css';

const defaultTheme = { embedStyles }

export default (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme
  let Embed = config.EmbedComponent || EmbedComponent
  if (config.decorator) {
    Embed = config.decorator(Embed)
  }
  const ThemedEmbed = decorateComponentWithProps(Embed, { theme })
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === 'atomic') {
        const contentState = getEditorState().getCurrentContent()
        const entity = block.getEntityAt(0)
        const type = contentState.getEntity(entity).getType()
        // console.log("found atomic", type)
        if (type === 'embedly') {
            // console.log("return from plugin", ThemedEmbed)
          return {
            component: ThemedEmbed,
            editable: false
          }
        }
      }
      return null
    },
    addEmbed
  }
}

export const Embed = EmbedComponent