/** VISEO COMPANION **/
'use strict';
import React, {
  Component,
} from 'react';

import{
AppRegistry,
StyleSheet,
Text,
Image,
ScrollView,
View,
TouchableOpacity,
ListView,
Dimensions,
} from 'react-native';


var HomePage=require('./HomePage');

var{
height: deviceHeight,
width: deviceWidth
} = Dimensions.get('window');


var REQUEST_URL7P1 = 'http://10.33.170.242:8080/C360/api/compte/getIdCompte/';
var REQUEST_URL7P2 = '/events'
var REQUEST_URL7 = ''

var REQUEST_URL5P1 = 'http://10.33.170.242:8080/C360/api/compte/participateEvent/';
var REQUEST_URL5P2 = '/events/'
var REQUEST_URL5 = ''

var REQUEST_URL9P1 = 'http://10.33.170.242:8080/C360/api/compte/cancelEvent/';
var REQUEST_URL9P2 = '/events/'
var REQUEST_URL9 = ''

var REQUEST_URL10P1 = 'http://10.33.170.242:8080/C360/api/compte/getParticipation/';
var REQUEST_URL10P2 = '/events/'
var REQUEST_URL10 = ''

var REQUEST_URL11P1 = 'http://10.33.170.242:8080/C360/api/compte/doneParticipation/';
var REQUEST_URL11P2 = '/events/'
var REQUEST_URL11 = ''

const okButton= require('./okButton.png');
const okButton2= require('./okButton2.png');
const crossButton= require('./crossButton.png');
const crossButton2= require('./crossButton2.png');

function addZero(i) {
  if (i < 10) {
      i = "0" + i;
  }
  return i;
}


class EventDetails extends React.Component{

  constructor(props) {
    super(props);
    this._showParticipation=this._showParticipation.bind(this);
    this.state = {
      statut:'',
      _okButton:okButton,
      _crossButton:crossButton
    };
  }

  componentDidMount() {
    this._showParticipation();
  }

  _showParticipation(){
    console.log("showParticipation");
    var REQUEST_URL7main=this.props.email;
    REQUEST_URL7=REQUEST_URL7P1+REQUEST_URL7main+REQUEST_URL7P2;
    fetch(REQUEST_URL7)
      .then((response) => response.json())
      .then((responseData1) => {
        REQUEST_URL11=REQUEST_URL11P1+responseData1+REQUEST_URL11P2+this.props.event.id;
        fetch(REQUEST_URL11)
        .then((response) => response.json())
        .then((responseData2) => {
          if(responseData2===true){
            this.setState({statut: ''});
          }
          else{
            REQUEST_URL10=REQUEST_URL10P1+responseData1+REQUEST_URL10P2+this.props.event.id;
            fetch(REQUEST_URL10)
            .then((response) => response.json())
            .then((responseData3) => {
              if(responseData3===true){
                this.setState({statut_color: 'green',
                               statut: 'Je participe.',
                               _okButton: okButton2});
              }
              else{
                this.setState({statut_color: 'red',
                               statut: 'Je ne participe pas.',
                               _crossButton: crossButton2});
              }
            })
            .done();
          }
        })
        .done();
        })
      .done();

  }

  _acceptEvent(){
    fetch(REQUEST_URL7)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        REQUEST_URL5=REQUEST_URL5P1+responseData+REQUEST_URL5P2+this.props.event.id;
        console.log(REQUEST_URL5);
        fetch(REQUEST_URL5)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          })
          .done()
        })
      .done();
      this.setState({statut: 'Je participe.',
                     statut_color: 'green',
                     _okButton: okButton2,
                     _crossButton: crossButton});
  }

  _refuseEvent(){

    fetch(REQUEST_URL7)
      .then((response) => response.json())
      .then((responseData) => {
        console.log(responseData);
        REQUEST_URL9=REQUEST_URL9P1+responseData+REQUEST_URL9P2+this.props.event.id;
        console.log(REQUEST_URL9);
        fetch(REQUEST_URL9)
        .then((response) => response.json())
        .then((responseData) => {
          console.log(responseData);
          })
          .done()
        })
      .done();
      this.setState({statut: 'Je ne participe pas.',
                    statut_color: 'red',
                    _okButton: okButton,
                    _crossButton: crossButton2});
  }
  render() {
     var event = this.props.event;
     var email = this.props.email;
     return (
      <View>
      		<View style={styles.topbar}>
      				<View style={styles.menu0}>
      				<Image  source={require('./Menu-52.png')} style={styles.icon}/>
      				</View>
      				<Text style={styles.viseocompanion}> VISEO COMPANION </Text>
      		</View>

          <View style={styles.titre_et_statutContainer}>
              <View style={styles.titre_et_statut} >
          		<Text style={styles.title}>Evénement:</Text>
              <Text style={[{color:this.state.statut_color}]}>{this.state.statut}</Text>
              </View>
          </View>
          <View style={styles.maincontainer}>
              <View style={styles.container}>
                    <ScrollView
                    		contentInset={{top : -50}}
                    		style={styles.scrollView}>
                            <View style={styles.Rectangle1}>
                              <View style={styles.leftRectangle1}>
                                <Text  style={styles.text_titre}>    Titre </Text>
                              </View>
                              <View style={styles.rightRectangle1}>
                                <Text  style={styles.text}> {event.event + '\n' } </Text>
                              </View>
                            </View>
                            <View style={styles.Rectangle1}>
                              <View style={styles.leftRectangle1}>
                                <Text  style={styles.text}>    Date </Text>
                              </View>
                              <View style={styles.rightRectangle1}>
                                <Text  style={styles.text}> {new Date(event.date).getDate()}/{addZero(new Date(event.date).getMonth()+1)}/{new Date(event.date).getFullYear()} à {addZero(new Date(event.date).getHours())}h{addZero(new Date(event.date).getMinutes()) + '\n' } </Text>
                              </View>
                            </View>
                            <View style={styles.Rectangle1}>
                              <View style={styles.leftRectangle1}>
                                <Text  style={styles.text}>    Lieu </Text>
                              </View>
                              <View style={styles.rightRectangle1}>
                                <Text  style={styles.text}> {event.lieu + '\n' } </Text>
                              </View>
                            </View>
                            <View style={styles.Rectangle1}>
                              <View style={styles.leftRectangle1}>
                                <Text  style={styles.text}>    Mot-clés </Text>
                              </View>
                              <View style={styles.rightRectangle1}>
                                <Text  style={styles.text}> {event.motclefs + '\n' } </Text>
                              </View>
                            </View>
                            <View style={styles.Rectangle2}>
                                <Text style={styles.text}>    Description </Text>
                                <Text style={styles.textdescription}>{event.description} </Text>
                            </View>
                            <View style={styles.MapContainer}>
                              <Image source={require('./carte-boulogne.jpg')} style={styles.carte} ></Image>
                            </View>
                  </ScrollView>

                  <View style={styles.bottomRect}>
                    <TouchableOpacity onPress={() =>{this.props.navigator.jumpBack();}}>
                      <View style={styles.BackButtonContainer}>
                          <Image source={require('./BackButton.png')} style={styles.BackButton} ></Image>
                      </View>
                    </TouchableOpacity>
                      <View style={styles.ok_cross_ButtonContainer}>
                          <TouchableOpacity onPress={() =>this._acceptEvent()}>
                          <Image source={this.state._okButton} style={styles.okButton} ></Image>
                          </TouchableOpacity>
                          <View style={styles.separator}></View>
                          <TouchableOpacity onPress={() =>this._refuseEvent()}>
                          <Image source={this.state._crossButton} style={styles.crossButton} ></Image>
                          </TouchableOpacity>
                      </View>
                  </View>
              </View>
            </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({

  titre_et_statutContainer:{
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'white',
  },

  titre_et_statut : {
    flexDirection : 'row',
    width : 0.95*deviceWidth,
    justifyContent : 'space-between',
    backgroundColor:'white',
    alignItems : 'center',
  },

  title: {
    color:'black',
  },

  _statut:{
    color : 'green',
  },

  MapContainer :{
    flexDirection : 'row',
    justifyContent : 'center',
    alignItems : 'center',
    marginBottom : 0.05*deviceHeight,
  },

  carte : {
    width : 0.9*deviceWidth,
    height: 0.4*deviceHeight,
  },

  map: {
    height: 150,
    margin: 10,
    borderWidth: 1,
    borderColor: '#000000',
  },

  bottomRect:{
    backgroundColor : 'white',
    flexDirection : 'row',
    alignItems : 'center',
    height : 0.15*deviceHeight,
  },


  maincontainer : {
    justifyContent: 'center',
    width : deviceWidth,
    alignItems: 'center',
    flexDirection : 'column',
    backgroundColor: 'white',
  },

  container: {
    width : 0.95*deviceWidth,
    height : 0.85*deviceHeight,
    marginTop : 0.01*deviceHeight,
    backgroundColor: 'white',
    flexDirection:'column',
    borderColor : 'black',
    borderWidth : 1,
    overflow: 'hidden',
  },

  Rectangle1:{
    width : 0.95*deviceWidth,
    flexDirection : 'row',
  },

  Rectangle2 :{
    width : 0.95*deviceWidth,
    flexDirection : 'column',
    marginBottom:0.02*deviceHeight,
  },

  leftRectangle1:{
		flex:0.3,
	},

	rightRectangle1:{
		flex:0.7,
	},

	menu : {
		width:30,
		height:30,
		backgroundColor:'white',
		borderRadius: 3,
    borderWidth: 1,
    borderColor: 'black',
    justifyContent : 'flex-start',
    margin:5,
	},

	menu0 : {
		width : 85,
	},

	icon:{
		width:25,
		height:25,
		marginLeft:5,
		marginTop:5,
	},

	toolbar :{
		backgroundColor:'white',

	},

	topbar:{
		height:0.06*deviceHeight,
		backgroundColor : 'white',
		flexDirection:'row',
	},

	viseocompanion:{
		justifyContent:'center',
		textAlign: 'center',
		fontSize:20,
		color:'blue',
	},

  text_titre:{
    color:'black',
    fontSize:15,
		textAlign:'left',
    fontFamily: 'Cochin',
	},

	text:{
    color:'black',
    fontSize:15,
		textAlign:'left',
    fontFamily: 'Cochin',
	},

  textdescription:{
    color:'black',
    fontSize:12,
    textAlign:'left',
    marginLeft : 0.04*deviceWidth,
  },

  rtext : {
    flex : 1,
    color :'black',
    fontSize:10,
  },

	scrollView:{
    height : deviceHeight,
	},

	details:{
		backgroundColor:'black',
		height:200,
		width:300,
	},

  back:{
    color : 'blue',
  },

  BackButtonContainer : {
    flex : 1,
    justifyContent : 'flex-start',
  },

  ok_cross_ButtonContainer : {
    flex : 3,
    flexDirection : 'row',
    justifyContent : 'center',
  },

  okButton : {
    height: 0.08*deviceHeight,
    width: 0.08*deviceHeight,
    resizeMode : 'contain',
  },

  crossButton : {
    height: 0.08*deviceHeight,
    width: 0.08*deviceHeight,
    resizeMode : 'contain',
    marginLeft: 0.05*deviceWidth,
  },

  separator : {
    width : 0.03*deviceWidth,
  },

  BackButton: {
    height: 0.1*deviceHeight,
    width: 0.15*deviceWidth,
  }
});

module.exports=EventDetails;
