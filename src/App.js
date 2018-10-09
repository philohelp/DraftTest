import React, { Component } from 'react';
import { EditorState, convertFromRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createVideoPlugin from 'draft-js-video-plugin';
import createEmbederPlugin from 'draft-js-embeder-plugin';
// import createEmbedlyPlugin from "./embedlyPlugin";
import VideoAdd from './videoAdd';
import editorStyles from './editorStyles.module.css';
import EmbedMe from "./embedlyCard";
import {
  Section
} from "bloomer";

const url = "https://www.aufeminin.com/beaute-de-stars/angelina-jolie-a-coupe-ses-longs-cheveux-photos-s2405824.html";

// const embedlyPlugin = createEmbedlyPlugin();
const videoPlugin = createVideoPlugin();
const { types } = videoPlugin;

const embederPlugin = createEmbederPlugin({
  options: {
    onReturn: async ({ url }) => {
      try {
        const response = await fetch(
          `http://iframe.ly/api/iframely?url=${url}&api_key=9a7e256dd6704948d25abc`
        );

        const data = response.json();
        console.log(data)

        return data;
      } catch (error) {
        console.error('error', error);
        return error;
      }
    },
  },
  theme:{}
});

const initialState = {
  "entityMap": {
    "0": {
      "type": types.VIDEOTYPE,
      "mutability": "IMMUTABLE",
      "data": {
        "src": "https://www.youtube.com/watch?v=iEPTlhBmwRg"
      }
    },
    "1": {
      "type": "draft-js-embeder-plugin-embeder",
      "mutability": "IMMUTABLE",
      "data": {
        "src": "https://www.aufeminin.com/beaute-de-stars/angelina-jolie-a-coupe-ses-longs-cheveux-photos-s2405824.html"
      }
    }
  },
  "blocks": [{
    "key": "9gm3s",
    "text": "You can have video in your text field.",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }, {
    "key": "ov7r",
    "text": " ",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
      "offset": 0,
      "length": 1,
      "key": 0
    }],
    "data": {}
  },
  {
    "key": "9gddfs3s",
    "text": "E",
    "type": "atomic",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [{
      "offset": 0,
      "length": 1,
      "key": 1
    }],
    "data": {}
  }
]
};

const plugins = [videoPlugin, embederPlugin];

export default class CustomVideoEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState))
  };

  onChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  focus = () => {
    this.editor.focus();
  };

  render() {
    return (
      <Section>
        <EmbedMe />
        <div className={editorStyles.editor} onClick={this.focus} >
          <Editor
            editorState={this.state.editorState}
            onChange={this.onChange}
            plugins={plugins}
            ref={(element) => {
              this.editor = element;
            }}
          />
        </div>
        <VideoAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={videoPlugin.addVideo}
        />
        
      </Section>
    );
  }
}
