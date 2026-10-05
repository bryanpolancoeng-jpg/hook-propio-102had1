import { useTemporizador } from '../hooks/useTemporizador'

export function Estudio() {
  const { segundos, activo, iniciar, pausar, reiniciar } = useTemporizador(25 * 60)

  const minutos = String(Math.floor(segundos / 60)).padStart(2, '0')
  const resto = String(segundos % 60).padStart(2, '0')

  return (
    <section style={{ border: '1px solid #888', borderRadius: 8, padding: 16, margin: 16 }}>
      <h2>Temporizador de estudio</h2>
      <p style={{ fontSize: 48, margin: 0 }}>{minutos}:{resto}</p>
      <p>{segundos === 0 ? '¡Tiempo cumplido!' : activo ? 'Estudiando...' : 'En pausa'}</p>
      <button onClick={iniciar}>Iniciar</button>{' '}
      <button onClick={pausar}>Pausar</button>{' '}
      <button onClick={reiniciar}>Reiniciar</button>
    </section>
  )
}