'use client';
import Image from "next/image";
import '@/components/items.scss';

interface Tarefa {
  id: number;
  title: string;
  completed: boolean;
}

interface ItemsProps {
  tarefa: Tarefa;
  onDelete: (id: number) => void;
  onToggleComplete: (id: number) => void;
}

export default function Items({ tarefa, onDelete, onToggleComplete }: ItemsProps) {
  return (
    <div className="item">
      <div className="container">
        <div className="checkbox">
          <button
            className={`check ${tarefa.completed ? 'ativo' : ''}`}
            onClick={() => onToggleComplete(tarefa.id)}
          >
            {tarefa.completed && (
              <Image
                src='/images/icon-check.svg'
                width={16}
                height={16}
                alt="Ícone check"
              />
            )}
          </button>
          <p className={tarefa.completed ? 'ativo' : ''}>{tarefa.title}</p>
        </div>
        <Image
          src='/images/icon.svg'
          className="delete"
          width={18}
          height={18}
          alt="Ícone lixeira"
          onClick={() => onDelete(tarefa.id)}
        />
      </div>
    </div>
  );
}
