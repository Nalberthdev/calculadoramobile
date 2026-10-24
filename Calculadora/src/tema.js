import { useColorScheme } from 'react-native';

// Cores do tema claro (o visual original da calculadora) e do tema escuro.
const TEMAS = {
  claro: {
    escuro: false,
    fundo: 'orange',
    painel: 'white',
    textoPainel: 'black',
    textoSecundario: '#666',
    tecla: '#f0e9e9',
    teclaFuncao: 'pink',
    teclaOperador: '#ffd27a',
    textoTecla: 'black',
    borda: 'gray',
    cabecalho: 'black',
    textoCabecalho: 'white',
  },
  escuro: {
    escuro: true,
    fundo: '#1c1c1e',
    painel: '#000',
    textoPainel: 'white',
    textoSecundario: '#aaa',
    tecla: '#3a3a3c',
    teclaFuncao: '#7a3b5a',
    teclaOperador: '#c77700',
    textoTecla: 'white',
    borda: '#555',
    cabecalho: '#000',
    textoCabecalho: 'white',
  },
};

// Segue o tema do aparelho (claro ou escuro).
export function useTema() {
  return useColorScheme() === 'dark' ? TEMAS.escuro : TEMAS.claro;
}
