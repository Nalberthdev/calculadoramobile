// Lógica da calculadora, sem eval.
// A expressão é guardada como texto, ex.: "12+3X-4". O "X" é a multiplicação.

export const OPERADORES = ['+', '-', 'X', '/'];

// Quebra a expressão em números e operadores. Um "-" no início ou logo
// depois de outro operador é o sinal do número, não uma subtração.
export function tokenizar(expressao) {
  const tokens = [];
  // true quando o último token é um número (ou o sinal de um número)
  let emNumero = false;
  for (const c of expressao) {
    if (OPERADORES.includes(c) && !(c === '-' && !emNumero)) {
      tokens.push(c);
      emNumero = false;
    } else if (emNumero) {
      tokens[tokens.length - 1] += c;
    } else {
      tokens.push(c);
      emNumero = true;
    }
  }
  return tokens;
}

// Calcula respeitando a precedência: primeiro X e /, depois + e -.
// Devolve null se a expressão estiver incompleta ou houver divisão por zero.
export function calcular(expressao) {
  const tokens = tokenizar(expressao);
  if (tokens.length === 0 || OPERADORES.includes(tokens[tokens.length - 1])) return null;

  const somas = [Number(tokens[0])];
  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const n = Number(tokens[i + 1]);
    if (op === 'X') somas[somas.length - 1] *= n;
    else if (op === '/') {
      if (n === 0) return null;
      somas[somas.length - 1] /= n;
    } else somas.push(op === '-' ? -n : n);
  }

  const total = somas.reduce((a, b) => a + b, 0);
  return Number.isFinite(total) ? formatar(total) : null;
}

// Evita resultados como 0.30000000000000004.
export function formatar(numero) {
  return String(Number(numero.toPrecision(12)));
}

// Troca o último número da expressão pelo que a função devolver.
export function alterarUltimoNumero(expressao, funcao) {
  const tokens = tokenizar(expressao);
  const ultimo = tokens[tokens.length - 1];
  if (ultimo === undefined || isNaN(Number(ultimo))) return expressao;
  tokens[tokens.length - 1] = funcao(ultimo);
  return tokens.join('');
}

export function ultimoNumero(expressao) {
  const tokens = tokenizar(expressao);
  const ultimo = tokens[tokens.length - 1];
  return ultimo === undefined || OPERADORES.includes(ultimo) ? '' : ultimo;
}
