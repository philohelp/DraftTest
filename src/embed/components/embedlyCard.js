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

import _ from "lodash";

var moment = require('moment');
moment.locale('fr');
var embedly = require('embedly')

export default class EmbedMe extends Component {
    state = {
        data: {},
        name: '',
        image: '',
        published: ''
    }

    componentWillMount = () => {
        console.log(this.props, "mounting comp")
        this.extractApi()
    }

    extractApi = () => {
        const imtem = "https://firebasestorage.googleapis.com/v0/b/philosophie-3bc46.appspot.com/o/images%2Flibguidant_ret_sm.png?alt=media&token=8e737702-8a72-4612-8533-2dd9032756f1"
        const EMBEDLY_KEY = "fd66b66abd8c4bea86a9373499d464d6";
        let api = new embedly({key: EMBEDLY_KEY, secure: true});
        const setState = this.setState.bind(this)
        api.extract({url: this.props.blockProps.src}, function(err, objs) {
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
            <div style={{display:"flex", flexDirection:"row", justifyContent:"center"}}>
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

/*
const ArticleCard = props => <Card style={{flex: 0}}>
            <CardItem>
              <Left>
                <Thumbnail source={{uri:props.item.favicons[2] ? props.item.favicons[2] : props.item.favicons[0] }} />
                <Body>
                  <Text>{_.truncate(props.item.title, {length:80})}</Text>
                </Body>
              </Left>
            </CardItem>
            <CardItem>
              <Body>
                <Image source={{uri: props.item.images[0]}} style={{height: 200, width: 200, flex: 1}}/>
                <Text>
                {_.truncate(props.item.description, {length:100})}
                </Text>
              </Body>
            </CardItem>
            <CardItem>
              <Left>
                <Button transparent textStyle={{color: '#87838B'}}>
                  <Icon name="md-open" />
                  <Text>{props.item.url}</Text>
                </Button>
              </Left>
            </CardItem>
          </Card>
*/
