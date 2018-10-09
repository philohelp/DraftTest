import React, { Component } from 'react';
import EmbedlyCard from "./embedlyCard";
import * as types from './embed/constants';

const embedlyPlugin = (config) => {
  return {
    blockRendererFn: (block, { getEditorState }) => {
      // if (block.getType() === types.ATOMIC) {
      //   // TODO subject to change for draft-js next release
      //   const contentState = getEditorState().getCurrentContent();
      //   const entity = contentState.getEntity(block.getEntityAt(0));
      //   const type = entity.getType();
      //   const { src } = entity.getData();
      //   if (type === types.VIDEOTYPE) {
      //     return {
      //       component: ThemedVideo,
      //       editable: false,
      //       props: {
      //         src,
      //       },
      //     };
      //   }
      // }

      return null;
    },
    // addVideo,
    types,
  };

};

export default embedlyPlugin;