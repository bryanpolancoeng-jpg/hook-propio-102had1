# Hooks propios

## useTemporizador(segundosIniciales = 60)

Cuenta regresiva con estado propio: permite iniciar, pausar y reiniciar un temporizador, y se detiene sola al llegar a cero.

**Parámetros**

| Nombre | Tipo | Por defecto | Descripcion |
|---|---|---|---|
| segundosIniciales | number | 60 | Duracion de la cuenta regresiva, en segundos. |

**Devuelve**

```js
{ segundos, activo, iniciar, pausar, reiniciar }
```

- `segundos` (number): segundos que quedan.
- `activo` (boolean): `true` mientras la cuenta está corriendo.
- `iniciar` (function): comienza o reanuda la cuenta. No hace nada si `segundos` ya es 0.
- `pausar` (function): detiene la cuenta sin perder el tiempo restante.
- `reiniciar` (function): detiene la cuenta y vuelve a `segundosIniciales`.

**Ejemplo de uso**

```jsx
import { useTemporizador } from '../hooks/useTemporizador'

export function Estudio() {
  const { segundos, activo, iniciar, pausar, reiniciar } = useTemporizador(25 * 60)

  const minutos = String(Math.floor(segundos / 60)).padStart(2, '0')
  const resto = String(segundos % 60).padStart(2, '0')

  return (
    <section>
      <p>{minutos}:{resto}</p>
      <p>{activo ? 'Estudiando...' : 'En pausa'}</p>
      <button onClick={iniciar}>Iniciar</button>
      <button onClick={pausar}>Pausar</button>
      <button onClick={reiniciar}>Reiniciar</button>
    </section>
  )
}
```

**Limitaciones**

- Cuenta en pasos de 1 segundo; no sirve para decimas ni milesimas.
- Usa `setInterval`, así que puede atrasarse unos instantes si la pestaña queda en segundo plano.
- Si cambia `segundosIniciales` mientras el hook está montado, el valor nuevo solo se aplica al llamar a `reiniciar`.
- Solo cuenta hacia atrás y no ejecuta ninguna accion al llegar a cero; eso lo decide el componente.
- Como todo hook, debe llamarse en el nivel superior del componente, nunca dentro de condiciones, ciclos o manejadores de eventos.