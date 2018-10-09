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

const url = "https://www.aufeminin.com/beaute-de-stars/angelina-jolie-a-coupe-ses-longs-cheveux-photos-s2405824.html";

export default class EmbedMe extends Component {
    
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
        api.extract({url: url}, function(err, objs) {
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
            <a href={data.original_url} target={"_blank"}>
                <Card style={{margin:100, maxWidth:700}} >
                    <CardContent>
                        <Media>
                            <MediaLeft>
                                <Image isSize='96x96' src={image} />
                            </MediaLeft>
                            <MediaContent>
                                <Title isSize={5}>{data.title}</Title>
                                {
                                    name ?
                                    <Subtitle isSize={6} style={{color:"grey"}}>{name} - {data.provider_url}</Subtitle>
                                    :
                                    <Subtitle isSize={6}>{data.provider_url}</Subtitle>
                                }
                                
                            </MediaContent>
                        </Media>
                        <Content style={{marginTop:-20}}>
                            {_.truncate(data.description, { 'length': 170,'separator': /,? +/ } )}
                            <br/>
                            <small>{published}</small>
                        </Content>
                    </CardContent>
                </Card>
            </a>
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
