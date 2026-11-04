import { useState } from 'react';
import { View, FlatList, Text, Pressable, StyleSheet } from 'react-native';
import { limpar, salvar } from '../storage/historico';
import { useTema } from '../tema';

export default function HistoricoScreen({ route, navigation }) {
  const tema = useTema();
  // A lista vira estado para a tela mudar ao limpar ou excluir.
  const [lista, setLista] = useState(route.params.historico);

  async function limparTudo() {
    await limpar();
    setLista([]);
  }

  // filter cria uma lista nova sem o item, sem alterar a que está no estado.
  async function excluir(id) {
    const nova = lista.filter((item) => item.id !== id);
    setLista(nova);
    await salvar(nova);
  }

  // Volta para a Home que já existe levando o resultado da conta.
  // O "toque" muda a cada vez para a Home reagir mesmo repetindo a conta.
  function reutilizar(item, toque) {
    navigation.popTo('Home', { valor: item.resultado, toque });
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <FlatList
        data={lista}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[styles.linha, { backgroundColor: tema.painel }]}>
            <Pressable
              style={({ pressed }) => [styles.conta, { opacity: pressed ? 0.6 : 1 }]}
              onPress={(evento) => reutilizar(item, evento.timeStamp)}
            >
              <Text style={[styles.textoConta, { color: tema.textoPainel }]}>
                {item.conta} = {item.resultado}
              </Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.excluir,
                { backgroundColor: tema.teclaFuncao, opacity: pressed ? 0.6 : 1 },
              ]}
              onPress={() => excluir(item.id)}
            >
              <Text style={[styles.textoExcluir, { color: tema.textoTecla }]}>Excluir</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={
          <Text style={[styles.vazio, { color: tema.textoPainel }]}>Nenhuma conta ainda</Text>
        }
      />
      {lista.length > 0 && (
        <Pressable style={[styles.botao, { backgroundColor: tema.cabecalho }]} onPress={limparTudo}>
          <Text style={[styles.textoBotao, { color: tema.textoCabecalho }]}>Limpar histórico</Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10 },
  linha: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    marginBottom: 6,
    borderRadius: 8,
  },
  conta: { flex: 1, marginRight: 8 },
  textoConta: { fontSize: 24, textAlign: 'right' },
  excluir: { paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  textoExcluir: { fontSize: 14, fontWeight: 'bold' },
  vazio: { fontSize: 18, textAlign: 'center', marginTop: 20 },
  botao: { padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 10 },
  textoBotao: { fontSize: 18, fontWeight: 'bold' },
});
