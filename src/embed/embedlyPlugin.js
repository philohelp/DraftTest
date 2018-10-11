import decorateComponentWithProps from 'decorate-component-with-props';
import addEmbed from './modifiers/addEmbed';
import DefaultEmbedComponent from './components/embedlyCard';
import * as types from './constants';
import embedStyles from './embedStyles.module.css';

const defaultTheme = embedStyles;

const embedlyPlugin = (config = {}) => {
  const theme = config.theme ? config.theme : defaultTheme;
  let Embed = config.embedComponent || DefaultEmbedComponent;
  if (config.decorator) {
    Embed = config.decorator(Embed);
  }
  const ThemedEmbed = decorateComponentWithProps(Embed, { theme });
  return {
    blockRendererFn: (block, { getEditorState }) => {
      if (block.getType() === types.ATOMIC) {
        // TODO subject to change for draft-js next release
        const contentState = getEditorState().getCurrentContent();
        const entity = contentState.getEntity(block.getEntityAt(0));
        const type = entity.getType();
        const { src } = entity.getData();
        if (type === types.EMBEDLYTYPE) {
          return {
            component: ThemedEmbed,
            editable: false,
            props: {
              src,
            },
          };
        }
      }

      return null;
    },
    addEmbed,
    types,
  };
};

export default embedlyPlugin;