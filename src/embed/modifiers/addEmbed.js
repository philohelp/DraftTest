import {
    AtomicBlockUtils,
    RichUtils,
  } from 'draft-js';
  
import * as types from '../constants';
  
export default function addEmbed(editorState, { src }) {
if (RichUtils.getCurrentBlockType(editorState) === types.ATOMIC) {
    return editorState;
}
const contentState = editorState.getCurrentContent();
const contentStateWithEntity = contentState.createEntity(
    types.EMBEDLYTYPE,
    'IMMUTABLE',
    { src }
);
const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
return AtomicBlockUtils.insertAtomicBlock(editorState, entityKey, ' ');
}