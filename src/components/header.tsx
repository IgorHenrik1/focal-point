'use client'
import Image from "next/image";
import '@/components/header.scss';
import { useEffect, useState } from "react";

export default function Header() {
  const [dataAtual, setDataAtual] = useState('');

  useEffect(() => {
    const hoje = new Date();
    const opcoes: Intl.DateTimeFormatOptions = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    const dataFormatada = hoje.toLocaleDateString('pt-BR', opcoes);
    const diaComLetraMaiuscula = dataFormatada.charAt(0).toUpperCase() + dataFormatada.slice(1);
    setDataAtual(diaComLetraMaiuscula);
  }, []);

  return (
    <header>
      <div className="container">
        <div>
          <Image src="/images/logo.webp" alt="Logo Focal Point" width={150} height={36} />
        </div>
        <h2>Bem-vindo de volta, Marcus</h2>
        <p>{dataAtual}</p>
      </div>
    </header>
  );
}
