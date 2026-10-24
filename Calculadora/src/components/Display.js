import { View, Text, StyleSheet } from 'react-native';
import { useTema } from '../tema';

export default function Display({ expressao, resultado, memoria }) {
  const tema = useTema();

  return (
    <View style={[styles.box, { backgroundColor: tema.painel }]}>
      <Text style={[styles.mem, { color: tema.textoSecundario }]}>{memoria !== 0 ? 'M' : ' '}</Text>
      <Text style={[styles.expr, { color: tema.textoPainel }]} numberOfLines={1} adjustsFontSizeToFit>
        {expressao || '0'}
      </Text>
      <Text style={[styles.res, { color: tema.textoSecundario }]}>{resultado}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  box: { width: '100%', padding: 10, alignItems: 'flex-end', marginBottom: 10 },
  mem: { alignSelf: 'flex-start', fontSize: 14 },
  expr: { fontSize: 36, fontWeight: 'bold' },
  res: { fontSize: 24, minHeight: 30 },
});
