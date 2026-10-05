import { useState, useEffect } from 'react'

export function useTemporizador(segundosIniciales = 60) {
  const [segundos, setSegundos] = useState(segundosIniciales)
  const [activo, setActivo] = useState(false)

  // Cuenta regresiva: un intervalo mientras esté activo
  useEffect(() => {
    if (!activo) return
    const id = setInterval(() => setSegundos((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [activo])

  // Al llegar a 0, se detiene solo
  useEffect(() => {
    if (segundos <= 0) setActivo(false)
  }, [segundos])

  const iniciar = () => {
    if (segundos > 0) setActivo(true)
  }
  const pausar = () => setActivo(false)
  const reiniciar = () => {
    setActivo(false)
    setSegundos(segundosIniciales)
  }

  return { segundos, activo, iniciar, pausar, reiniciar }
}