'use client';

import '@/components/to-do.scss';
import { useEffect, useState } from 'react';
import Items from './items';

interface Tarefa {
  id: number;
  title: string;
  completed: boolean;
}

export default function ToDo() {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [titulo, setTitulo] = useState<string>('');
  const [addTarefas, setAddTarefas] = useState<boolean>(false);
  const [removeTarefas, setRemoveTarefas] = useState<{ id: number; isOpen: boolean }>({ id: 0, isOpen: false });

  useEffect(() => {
    const storedTarefas = localStorage.getItem('tarefas');
    if (storedTarefas) {
      setTarefas(JSON.parse(storedTarefas));
    }
  }, []);

  const adicionarTarefa = () => {
    if (!titulo) return;
    const novaTarefa: Tarefa = { id: Date.now(), title: titulo, completed: false };
    const novasTarefas = [...tarefas, novaTarefa];
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setTitulo('');
    setAddTarefas(false);
  };

  const toggleComplete = (id: number) => {
    const novasTarefas = tarefas.map(tarefa => 
      tarefa.id === id ? { ...tarefa, completed: !tarefa.completed } : tarefa
    );
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
  };

  const openRemoveModal = (id: number) => {
    setRemoveTarefas({ id, isOpen: true });
  };

  const confirmarRemocao = () => {
    const novasTarefas = tarefas.filter(tarefa => tarefa.id !== removeTarefas.id);
    setTarefas(novasTarefas);
    localStorage.setItem('tarefas', JSON.stringify(novasTarefas));
    setRemoveTarefas({ id: 0, isOpen: false });
  };

  const cancelarRemocao = () => {
    setRemoveTarefas({ id: 0, isOpen: false });
  };

  return (
    <>
      {addTarefas && (
        <div onClick={() => setAddTarefas(false)} className="modal-adicionar-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-adicionar">
            <h2>Nova tarefa</h2>
            <div className='titulo'>
              <label htmlFor="titulo">Título</label>
              <input
                type="text"
                placeholder="Digite"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                name="titulo"
              />
            </div>
            <div>
              <button onClick={() => setAddTarefas(false)}>Cancelar</button>
              <button onClick={adicionarTarefa}>Adicionar</button>
            </div>
          </div>
        </div>
      )}
      {removeTarefas.isOpen && (
        <div onClick={cancelarRemocao} className="modal-remover-overlay">
          <div onClick={(e) => e.stopPropagation()} className="modal-remover">
            <h2>Deletar tarefa</h2>
            <p>Tem certeza que você deseja deletar essa tarefa?</p>
            <div>
              <button onClick={cancelarRemocao}>Cancelar</button>
              <button onClick={confirmarRemocao}>Deletar</button>
            </div>
          </div>
        </div>
      )}
      <div className="lista">
        <div className="container">
          <p>Suas tarefas de hoje</p>
          {tarefas.filter(tarefa => !tarefa.completed).map(tarefa => (
            <Items 
              key={tarefa.id} 
              tarefa={tarefa} 
              onDelete={openRemoveModal} 
              onToggleComplete={toggleComplete} 
            />
          ))}
          <p>Tarefas finalizadas</p>
          {tarefas.filter(tarefa => tarefa.completed).map(tarefa => (
            <Items 
              key={tarefa.id} 
              tarefa={tarefa} 
              onDelete={openRemoveModal} 
              onToggleComplete={toggleComplete} 
            />
          ))}
        </div>
        <button onClick={() => setAddTarefas(true)}>
          Adicionar nova tarefa
        </button>
      </div>
    </>
  );
}
