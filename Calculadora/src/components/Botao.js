import { Pressable, Text, StyleSheet } from 'react-native';
import { useTema } from '../tema';

export default function Botao({ label, onPress, tipo }) {
  const tema = useTema();
  const cor = {
    funcao: tema.teclaFuncao,
    operador: tema.teclaOperador,
    numero: tema.tecla,
  }[tipo];

  return (
    <Pressable
      style={({ pressed }) => [
        styles.btn,
        tipo === 'funcao' ? styles.funcao : styles.numero,
        { backgroundColor: cor, borderColor: tema.borda, opacity: pressed ? 0.6 : 1 },
      ]}
      onPress={() => onPress(label)}
    >
      <Text style={[tipo === 'funcao' ? styles.txtFuncao : styles.txt, { color: tema.textoTecla }]}>
        {label}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    borderRadius: 10,
    borderWidth: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  funcao: { width: '17%', height: 50 },
  numero: { width: '22%', height: 60 },
  txt: { fontSize: 24 },
  txtFuncao: { fontSize: 14 },
});
