import Image from "next/image";
import '@/components/header.scss'

export default function Header(){
  return (
    <header>
      <div className="container">
        <Image src="/images/logo.webp" alt="Logo Focal Point" width={150} height={36}/>
        <h2>Bem-vindo de volta, Marcus</h2>
        <p>Segunda, 01 de dezembro de 2025</p>
      </div>

    </header>
  )
}