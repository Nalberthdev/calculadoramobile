import { StatusBar } from "expo-status-bar";
import { StyleSheet, TouchableOpacity, View, Text, codegenNativeCommands} from "react-native";

function App(){  // inicio para o app ser trabalaho
  return(

  

  <View style={styles.container}>


    <StatusBar style="auto" />


    <Text style={styles.titulo}>Calculadora Mobile</Text>

    <Text style={styles.painel}>0</Text>



      <View style={styles.colunas}>
        <TouchableOpacity style={styles.botao}>
        <Text>MRC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
        <Text>M-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
        <Text>M+</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
        <Text>RAIZ</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botao}>
        <Text>OFF</Text>
        </TouchableOpacity>
      </View>



       <View style={styles.colunas}>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>AC</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>C-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>+/-</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>%</Text>
        </TouchableOpacity>
      </View>

       <View style={styles.colunas}>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>/</Text>
        </TouchableOpacity>
      </View>


       <View style={styles.colunas}>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>X</Text>
        </TouchableOpacity>
      </View>


      <View style={styles.colunas}>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros} >2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros} >3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>-</Text>
        </TouchableOpacity>
      </View>




      <View style={styles.colunas}>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>0</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>.</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>=</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.botaoNumeros}>
        <Text style={styles.textNumeros}>+</Text>
        </TouchableOpacity>
      </View>


  </View>


 )
}


export default App;


const styles = StyleSheet.create({
  container:
  {
    flex:1,
    backgroundColor: 'orange',
    alignItems:'center',
    justifyContent: 'flex-start',
    marginTop: 40,
    padding: 0
  },

  titulo:{
    textAlign:'center',
    backgroundColor: 'black',
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
    height: 35,
    width: '100%'
  },

  painel:{
    width:'100%',
    textAlign: 'right',
    fontSize: 36,
    fontWeight:'bold',
    backgroundColor: 'white',
    borderColor: 'black',
    border: 2,
    padding: 10,
    marginBottom: 20,
    },

  colunas:{
    alignItems:'flex-start',
    justifyContent:'flex-start',
    flexDirection:'row',
    gap:10 
  },

  botao:{
    backgroundColor:'pink',
    color: 'black',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'gray',
    height: '50',
    paddin: '10',
    marginTop: 20,
    width:'17%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  botaoNumeros:{
    backgroundColor:'#f0e9e9',
    color: 'black',
    borderRadius: 10,
    borderWidth: 3,
    borderColor: 'gray',
    height: '60',
    paddin: '10',
    marginTop: 20,
    width:'22%',
    alignItems: 'center',
    justifyContent: 'center'
  },

  textNumeros:{
    fontSize: 24,
    fontWeight: '',
    textAlign: 'center',
  }

  


})

