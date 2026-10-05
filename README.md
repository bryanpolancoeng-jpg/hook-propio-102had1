# hook-propio-102had1

Demostración de un custom hook propio, useTemporizador, usado en dos componentes independientes (Estudio y Descanso).

## Qué hace la demostración

La aplicación muestra dos temporizadores a la vez: uno de estudio (25 min) y uno de descanso (5 min). Cada uno se inicia, pausa y reinicia por separado, y accionar uno no afecta al otro. La documentación del hook está en [src/hooks/README.md](src/hooks/README.md).

## Cómo ejecutarla

```bash
npm install
npm run dev
```

Luego abrir `http://localhost:5173/`.

## Estructura

```
src/hooks/useTemporizador.js   # el hook
src/hooks/README.md            # su documentación
src/components/Estudio.jsx     # primer componente que lo usa
src/components/Descanso.jsx    # segundo componente que lo usa
src/App.jsx                    # muestra ambos a la vez
```

## Análisis escrito

**1. ¿Qué lógica encapsula el hook y por qué es un hook y no una función utilitaria?**

El hook encapsula una cuenta regresiva: guarda los segundos restantes y si el temporizador está activo, programa un intervalo que resta un segundo cada vez y lo limpia al pausar o desmontar el componente. Es un hook porque necesita estado propio (useState) y efectos (useEffect) ligados al ciclo de vida del componente. Una función como las de formato.js recibe un valor y devuelve otro, sin memoria entre llamadas ni re-renderizados; el temporizador, en cambio, cambia con el tiempo y debe provocar que el componente se vuelva a dibujar.

**2. ¿Por qué los dos componentes no comparten el estado aunque usen el mismo hook?**

Porque cada llamada al hook crea su propio estado dentro del componente que lo llama. El hook es una receta, no un almacén compartido: Estudio y Descanso reciben cada uno su copia de segundos y activo. En las capturas se ve que, al iniciar el temporizador de estudio, su cuenta avanza mientras el de descanso se queda en 05:00.

**3. Versionado semántico si se publicara como paquete 1.0.0**

Obligaría a publicar la **2.0.0** un cambio que rompa a quienes ya lo usan, por ejemplo renombrar iniciar a comenzar, quitar pausar o cambiar el objeto devuelto por un arreglo. Bastaría la 1.1.0 un cambio compatible que agrega algo, por ejemplo devolver además una función agregarSegundos, o un segundo parámetro opcional, sin alterar lo que ya existía.
