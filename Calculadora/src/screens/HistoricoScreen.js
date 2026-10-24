import { useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { salvar } from '../storage/historico';
import { useTema } from '../tema';

export default function HistoricoScreen({ route }) {
  const tema = useTema();
  const [historico, setHistorico] = useState(route.params.historico);

  async function limpar() {
    setHistorico([]);
    await salvar([]);
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={historico}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Text style={[styles.linha, { backgroundColor: tema.painel, color: tema.textoPainel }]}>
            {item.conta} = {item.resultado}
          </Text>
        )}
        ListEmptyComponent={
          <Text style={[styles.vazio, { color: tema.textoPainel }]}>Nenhuma conta ainda</Text>
        }
      />
      {historico.length > 0 && (
        <Pressable style={[styles.botao, { backgroundColor: tema.cabecalho }]} onPress={limpar}>
          <Text style={[styles.textoBotao, { color: tema.textoCabecalho }]}>Limpar histórico</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  linha: { fontSize: 24, padding: 8, marginBottom: 6, borderRadius: 8, textAlign: 'right' },
  vazio: { fontSize: 18, textAlign: 'center', marginTop: 20 },
  botao: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  textoBotao: { fontSize: 18, fontWeight: 'bold' },
});
