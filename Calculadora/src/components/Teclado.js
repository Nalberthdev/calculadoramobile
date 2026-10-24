import { View, StyleSheet } from 'react-native';
import Botao from './Botao';

const LINHAS = [
  ['MRC', 'M-', 'M+', 'RAIZ', 'OFF'],
  ['AC', 'C-', '+/-', '%'],
  ['7', '8', '9', '/'],
  ['4', '5', '6', 'X'],
  ['1', '2', '3', '-'],
  ['0', '.', '=', '+'],
];

function tipoDaTecla(tecla, linha) {
  if (linha === 0) return 'funcao';
  if (['/', 'X', '-', '+', '='].includes(tecla)) return 'operador';
  return 'numero';
}

export default function Teclado({ onPress }) {
  return (
    <View style={{ width: '100%' }}>
      {LINHAS.map((linha, i) => (
        <View key={i} style={styles.linha}>
          {linha.map((tecla) => (
            <Botao key={tecla} label={tecla} onPress={onPress} tipo={tipoDaTecla(tecla, i)} />
          ))}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  linha: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 15 },
});
