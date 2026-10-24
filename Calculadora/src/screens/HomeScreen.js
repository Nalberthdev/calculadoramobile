import { useCallback, useState } from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import Display from '../components/Display';
import Teclado from '../components/Teclado';
import { carregar, salvar } from '../storage/historico';
import {
  OPERADORES,
  calcular,
  formatar,
  alterarUltimoNumero,
  ultimoNumero,
} from '../utils/calculadora';
import { useTema } from '../tema';

export default function HomeScreen({ navigation }) {
  const tema = useTema();
  const [expressao, setExpressao] = useState('');
  const [resultado, setResultado] = useState('');
  const [historico, setHistorico] = useState([]);
  const [memoria, setMemoria] = useState(0);
  // true logo depois do "=": o próximo número começa uma conta nova
  const [calculado, setCalculado] = useState(false);

  // Carrega o histórico salvo sempre que a tela aparece, inclusive ao
  // voltar da tela de histórico depois de limpá-lo.
  useFocusEffect(
    useCallback(() => {
      carregar().then(setHistorico);
    }, [])
  );

  // Valor atual: o resultado da conta digitada ou, se ela estiver
  // incompleta, o último resultado.
  function valorAtual() {
    return calcular(expressao) ?? (resultado || null);
  }

  async function registrar(conta, valor) {
    const item = { id: Date.now().toString(), conta, resultado: valor };
    const novo = [item, ...historico];
    setHistorico(novo);
    await salvar(novo);
  }

  function aoTocar(tecla) {
    if (/^\d$/.test(tecla)) aoNumero(tecla);
    else if (tecla === '.') aoPonto();
    else if (OPERADORES.includes(tecla)) aoOperador(tecla);
    else if (tecla === '=') aoIgual();
    else if (tecla === 'AC') limpar();
    else if (tecla === 'OFF') {
      limpar();
      setMemoria(0);
    } else if (tecla === 'C-') {
      setExpressao(calculado ? '' : expressao.slice(0, -1));
      setCalculado(false);
    } else if (tecla === '+/-') {
      setExpressao(alterarUltimoNumero(expressao, (n) => (n.startsWith('-') ? n.slice(1) : '-' + n)));
    } else if (tecla === '%') {
      setExpressao(alterarUltimoNumero(expressao, (n) => formatar(Number(n) / 100)));
    } else if (tecla === 'RAIZ') aoRaiz();
    else if (tecla === 'M+' || tecla === 'M-') {
      const valor = valorAtual();
      if (valor === null) return;
      const sinal = tecla === 'M+' ? 1 : -1;
      setMemoria(Number(formatar(memoria + sinal * Number(valor))));
    } else if (tecla === 'MRC') aoMemoria();
  }

  function limpar() {
    setExpressao('');
    setResultado('');
    setCalculado(false);
  }

  function aoNumero(digito) {
    if (calculado) {
      setExpressao(digito);
      setResultado('');
      setCalculado(false);
      return;
    }
    // não deixa o número começar com zeros repetidos, ex.: "007"
    const atual = ultimoNumero(expressao);
    if (atual === '0' || atual === '-0') {
      setExpressao(expressao.slice(0, -1) + digito);
    } else {
      setExpressao(expressao + digito);
    }
  }

  function aoPonto() {
    if (calculado) {
      setExpressao('0.');
      setResultado('');
      setCalculado(false);
      return;
    }
    const atual = ultimoNumero(expressao);
    if (atual.includes('.')) return;
    setExpressao(expressao + (atual === '' || atual === '-' ? '0.' : '.'));
  }

  function aoOperador(op) {
    // depois do "=", a conta continua a partir do resultado
    if (calculado) {
      setExpressao(resultado + op);
      setCalculado(false);
      return;
    }
    if (expressao === '' || expressao === '-') return;
    const ultimo = expressao[expressao.length - 1];
    if (OPERADORES.includes(ultimo)) {
      setExpressao(expressao.slice(0, -1) + op);
    } else {
      setExpressao(expressao + op);
    }
  }

  async function aoIgual() {
    if (calculado || expressao === '') return;
    const valor = calcular(expressao);
    if (valor === null) {
      setResultado('Erro');
      return;
    }
    setResultado(valor);
    setCalculado(true);
    await registrar(expressao, valor);
  }

  async function aoRaiz() {
    const valor = valorAtual();
    if (valor === null) return;
    const base = calculado ? resultado : expressao;
    if (Number(valor) < 0) {
      setResultado('Erro');
      return;
    }
    const raiz = formatar(Math.sqrt(Number(valor)));
    setExpressao(`√(${base})`);
    setResultado(raiz);
    setCalculado(true);
    await registrar(`√(${base})`, raiz);
  }

  function aoMemoria() {
    const valor = formatar(memoria);
    if (calculado || expressao === '') {
      setExpressao(valor);
      setResultado('');
      setCalculado(false);
    } else if (ultimoNumero(expressao) === '') {
      setExpressao(expressao + valor);
    } else {
      setExpressao(alterarUltimoNumero(expressao, () => valor));
    }
  }

  return (
    <View style={[styles.container, { backgroundColor: tema.fundo }]}>
      <Display expressao={expressao} resultado={resultado} memoria={memoria} />
      <Teclado onPress={aoTocar} />
      <Pressable
        style={[styles.botaoHistorico, { backgroundColor: tema.cabecalho }]}
        onPress={() => navigation.navigate('Historico', { historico })}
      >
        <Text style={[styles.textoHistorico, { color: tema.textoCabecalho }]}>
          Ver histórico ({historico.length})
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center' },
  botaoHistorico: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
  },
  textoHistorico: { fontSize: 18, fontWeight: 'bold' },
});
