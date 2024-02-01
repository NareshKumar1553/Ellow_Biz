import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    container: {
        flex:1,
        flexBasis: 'auto',
        flexDirection:'column',
        
      },
    subContainer: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        marginTop:5,
        borderBottomColor:'#e6ed79',
        borderBottomWidth:2,
        
    },
    subContainer1: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        marginTop:5,
     },
    subContainerBanner: {
        flexDirection:'column',
        justifyContent: 'flex-start',
        
    },
    header: {
        flexDirection:'row',
        top:0,
        backgroundColor:'#e6ed79',
        height:'auto',
        width:'100%',
        alignItems:'center',
        justifyContent:'space-between',
        borderBottomLeftRadius:20,
        borderBottomRightRadius:20,
    },
    headerText: {
        fontSize: 20,
        color: '#333',
        textAlign:'center',
        justifyContent:'center'
    },
    headerImage: {
        width: 50,
        height: 40,
        marginRight: 10,
        borderRadius: 40,
    },
    categories: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        marginLeft: 10,
        marginRight: 10,
    },
    categoriesImage: {
        width: 150,
        height: 100,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 10,
    },
    imageText: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign:'center'
    },
    button: {
        backgroundColor:'#eef2b6',
        padding:10,
        borderRadius:24,
        width:200,
        alignItems:'center',
        justifyContent:'center',
        marginTop:10,
        marginLeft:10,
    },
    image: {
        width: 50,
        height: 50,
        borderRadius: 50,
        borderWidth: 3,
        borderColor: '#fff',
        marginBottom: 10,
        marginTop: 10,
        marginRight: 10,
    },
    bannerImage: {
        width: '100%',
        height: 200,
        borderWidth: 0,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        borderColor: '#fff',
        marginBottom: 10,
        
    },
    headerTouch: {
        marginLeft: 10,
        marginBottom: 10,
    },
    subHeadingText: {
        fontSize: 20,
        color: '#333',
        fontWeight: 'bold',
        backgroundColor:'#e6ed79',
        padding:10,
        width:200,
        borderTopRightRadius:24,
        
    },
    card: {
        flexDirection:'row',
        justifyContent: 'flex-start',
        alignItems:'center',
        marginLeft: 10,
        marginRight: 10,
        backgroundColor:'#eef2b6',
        padding:10,
        borderRadius:24,
        
    },
    cardImage: {
        overflow: 'hidden',
        width: 250,
        height: 150,
        marginRight: 5,
        marginBottom: 10,
        marginTop: 20,
        borderRadius: 20,
        justifyContent: 'flex-start',
        alignItems: 'flex-end',
    },
    cardText: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign:'center'
    },
    cardPrice: {
        fontSize: 15,
        color: '#333',
        marginLeft: 10,
        marginTop: 10,
        fontWeight: 'bold',
        textAlign:'center'
    },
    
    
});

export default styles;