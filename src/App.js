import React, { Component } from 'react';
import { EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import createVideoPlugin from 'draft-js-video-plugin';
import createEmbedlyPlugin from "./embed/embedlyPlugin";
import VideoAdd from './videoAdd';
import EmbedlyAdd from './embed/modifiers/EmbedButton';
import editorStyles from './editorStyles.module.css';
import {
  Section
} from "bloomer";

const embedlyPlugin = createEmbedlyPlugin();
const videoPlugin = createVideoPlugin();
const { types } = videoPlugin;

const initialState = {
  "entityMap": {
    "0": {
      "type": "draft-js-embedly-plugin",
      "mutability": "IMMUTABLE",
      "data": {
        "src": "https://www.youtube.com/watch?v=KLDZt948AHk&index=2&t=2s&list=PL02WGlXJ28I5EIPb3Oywn71tk69CKfiJ5",
        'type': 'draft-js-embedly-plugin'
      }
    }
  },
  "blocks": [
  {
    "key": "9gddfs3s",
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
    "key": "dfs3s",
    "text": "blabla",
    "type": "unstyled",
    "depth": 0,
    "inlineStyleRanges": [],
    "entityRanges": [],
    "data": {}
  }
]
};

const plugins = [embedlyPlugin, videoPlugin];

export default class CustomVideoEditor extends Component {

  state = {
    editorState: EditorState.createWithContent(convertFromRaw(initialState))
    // editorState: EditorState.createEmpty()
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
    const currentContent = this.state.editorState.getCurrentContent();
    const es = convertToRaw(currentContent);
    console.log(es)
    return (
      <Section>
        <EmbedlyAdd
          editorState={this.state.editorState}
          onChange={this.onChange}
          modifier={embedlyPlugin.addEmbed}
        />   
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

/*
import EmbedMe from "./embedlyCard";
<EmbedMe />
const embedlyPlugin = createEmbedlyPlugin({
  options: {
    onReturn: async ({ url }) => {
      console.log("from embedly props",url)
      try {
        const response = await fetch(
          `http://iframe.ly/api/iframely?url=${url}&api_key=9a7e256dd6704948d25abc`
        );

        const data = response.json();
        console.log("from embedly props",data)

        return data;
      } catch (error) {
        console.error('error', error);
        return error;
      }
    },
  },
  theme:{}
});
*/