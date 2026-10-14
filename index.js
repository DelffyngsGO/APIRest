
import express, { json } from 'express';
const app = express();

app.use(json());

let tarefas = [
  { id: 1, titulo: 'Aprender Express', concluida: false },
  { id: 2, titulo: 'Criar minha primeira API', concluida: false }
];

let proximoId = 3;

const TAMANHO_MAXIMO_TITULO = 100;

function validarTitulo(titulo) {
  if (typeof titulo !== 'string') {
    return 'O título deve ser um texto.';
  }

  const tituloLimpo = titulo.trim();

  if (tituloLimpo.length === 0) {
    return 'O título não pode estar vazio.';
  }

  if (tituloLimpo.length > TAMANHO_MAXIMO_TITULO) {
    return `O título deve ter no máximo ${TAMANHO_MAXIMO_TITULO} caracteres.`;
  }

  return null;
}

function obterIdValido(valor) {
  if (!/^[1-9]\d*$/.test(valor)) {
    return null;
  }

  const id = Number(valor);

  return Number.isSafeInteger(id) ? id : null;
}

app.get('/tarefas', (req, res) => {
  const { concluida } = req.query;

  if (
    concluida !== undefined &&
    concluida !== 'true' &&
    concluida !== 'false'
  ) {
    return res.status(400).json({
      erro: 'O filtro concluida deve ser true ou false.'
    });
  }

  let resultado = tarefas;

  if (concluida !== undefined) {
    resultado = tarefas.filter(
      t => t.concluida === (concluida === 'true')
    );
  }

  res.json(resultado);
});

app.get('/tarefas/:id', (req, res) => {
  const id = obterIdValido(req.params.id);

  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: 'Tarefa não encontrada.'
    });
  }

  res.json(tarefa);
});

app.post('/tarefas', (req, res) => {
  const { titulo } = req.body ?? {};
  const erro = validarTitulo(titulo);

  if (erro) {
    return res.status(400).json({ erro });
  }

  const novaTarefa = {
    id: proximoId++,
    titulo: titulo.trim(),
    concluida: false
  };

  tarefas.push(novaTarefa);

  res.status(201).json(novaTarefa);
});

app.put('/tarefas/:id', (req, res) => {
  const id = obterIdValido(req.params.id);

  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const tarefa = tarefas.find(t => t.id === id);

  if (!tarefa) {
    return res.status(404).json({
      erro: 'Tarefa não encontrada.'
    });
  }

  const { titulo, concluida } = req.body ?? {};

  if (titulo !== undefined) {
    const erro = validarTitulo(titulo);

    if (erro) {
      return res.status(400).json({ erro });
    }
  }

  if (
    concluida !== undefined &&
    typeof concluida !== 'boolean'
  ) {
    return res.status(400).json({
      erro: 'O campo concluida deve ser booleano (true ou false).'
    });
  }

  if (titulo !== undefined) {
    tarefa.titulo = titulo.trim();
  }

  if (concluida !== undefined) {
    tarefa.concluida = concluida;
  }

  res.json(tarefa);
});

app.delete('/tarefas/:id', (req, res) => {
  const id = obterIdValido(req.params.id);

  if (id === null) {
    return res.status(400).json({ erro: 'ID inválido.' });
  }

  const index = tarefas.findIndex(t => t.id === id);

  if (index === -1) {
    return res.status(404).json({
      erro: 'Tarefa não encontrada.'
    });
  }

  tarefas.splice(index, 1);

  res.status(204).send();
});

app.listen(3000, () => {
  console.log('API de tarefas rodando na porta 3000');
});
