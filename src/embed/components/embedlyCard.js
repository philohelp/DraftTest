import React, { Component } from 'react';
import { EditorState } from 'draft-js';
import Editor from 'draft-js-plugins-editor';
import {
    Card,
    CardHeader,
    CardContent,
    CardHeaderTitle,
    CardHeaderIcon,
    Icon,
    CardImage,
    Media,
    MediaLeft,
    Image,
    MediaContent,
    Title,
    Subtitle,
    Content
} from "bloomer";

import './../embedStyles.module.css';

import Embedly from 'react-embedly';

import _ from "lodash";

const testimg = "https://resize-parismatch.ladmedia.fr/r/625,417,center-middle,ffffff/img/var/news/storage/images/paris-match/people/angelina-jolie-et-brad-pitt-la-treve-apres-deux-ans-de-conflit-1575880/25567685-1-fre-FR/Angelina-Jolie-et-Brad-Pitt-la-treve-apres-deux-ans-de-conflit.jpg"

const testvid = "https://www.youtube.com/watch?v=TbppXMGrsvw"

const testpage = "http://www.slate.fr/story/168491/twitter-propage-freine-theories-du-complot"

var moment = require('moment');
moment.locale('fr');
var embedly = require('embedly')

class EmbedMe extends React.Component {

    constructor(props) {
      super(props);
  
      this.state = {
        showIframe: false,
      };
  
      this.enablePreview = this.enablePreview.bind(this);
    }
  
    componentDidMount() {
      this.renderEmbedly();
    }
  
    componentDidUpdate(prevProps, prevState) {
      if (prevState.showIframe !== this.state.showIframe && this.state.showIframe === true) {
        this.renderEmbedly();
      }
    }
  
    getScript() {
      const script = document.createElement('script');
      script.async = 1;
      script.src = '//cdn.embedly.com/widgets/platform.js';
      script.onload = () => {
        window.embedly();
      };
      document.body.appendChild(script);
    }
  
    renderEmbedly() {
      if (window.embedly) {
        window.embedly();
      } else {
        this.getScript();
      }
    }
  
    enablePreview() {
      this.setState({
        showIframe: true,
      });
    }
  
    render() {
      const url = this.props.blockProps.src;
      const innerHTML = `<div><a class="embedly-card" href="${url}" data-card-controls="0" data-card-theme="light">Embedded ― ${url}</a></div>`;
      return (
        <div className="md-block-atomic-embed">
          <div dangerouslySetInnerHTML={{ __html: innerHTML }}/>
        </div>
      );
    }
  }


class EmbedMeANC2 extends Component {
    state = {
        data: {},
        name: '',
        image: '',
        published: ''
    }

    componentWillMount = () => {
        this.extractApi()
    }

    extractApi = () => {
        const imtem = "https://firebasestorage.googleapis.com/v0/b/philosophie-3bc46.appspot.com/o/images%2Flibguidant_ret_sm.png?alt=media&token=8e737702-8a72-4612-8533-2dd9032756f1"
        const EMBEDLY_KEY = "fd66b66abd8c4bea86a9373499d464d6";
        let api = new embedly({key: EMBEDLY_KEY, secure: true});
        const setState = this.setState.bind(this)
        console.log(this.props, "mounting comp")
        const imageReg = /[\/.](gif|jpg|jpeg|tiff|png)$/i;
        const urlfromprops = this.props.blockProps.src
        console.log(imageReg.test(urlfromprops))
        api.extract({url:urlfromprops}, function(err, objs) {
          if (!!err) {
            console.error(err.stack, objs);
            return;
          };
          const data = objs[0];
        //   console.log(data)
          const published = (data.published) ? moment(data.published).format("Do MMMM YYYY") : null
          setState({
            data,
            name:(data.authors.length >= 1) ? data.authors[0].name : "",
            image:(data.images.length >= 1) ? data.images[0].url : imtem,
            published
          })
        })
    }

    render(){
        const {data, name, image, published} = this.state;
        return(
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center", marginTop:10, marginBottom:10}}>
                <a href={data.original_url} target={"_blank"} style={{width:"50%"}}>
                    <Card style={{lineHeight:"1.4rem"}}>
                        <CardContent>
                            <Media>
                                <MediaLeft>
                                    <Image src={image} style={{maxWidth:180}}/>
                                    <small style={{fontWeight:"100", color:"grey"}}>{published}</small>
                                </MediaLeft>
                                <MediaContent>
                                <Title isSize={5}  style={{marginBottom:10}}>
                                {data.title}
                                </Title>
                                <small>
                                {_.truncate(data.description, { 'length': 170,'separator': /,? +/ } )}
                                </small>
                                <Subtitle isSize={6} style={{color:"grey", fontWeight:"700", marginTop:10, textAlign:"right"}}>
                                {data.provider_url}
                                </Subtitle>
                                </MediaContent>
                            </Media>
                        </CardContent>
                    </Card>
                </a>
            </div>
        )
    }
}

const EmbedMeANCFFF = (props) => <div style={{display:"flex", flexDirection:"row", justifyContent:"center", margin:20}}>
    <Embedly
        url={props.blockProps.src}
        apiKey="fd66b66abd8c4bea86a9373499d464d6"
    /> 
</div>

export default EmbedMe