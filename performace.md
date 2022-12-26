# Renderização
- Ao mudar um estado em um contexto
  - Todos filhos do provider são renderizados novamente

## Evitando renderizações desnecessárias
- Cuidar para não tentar resolver problemas de performace que ainda nem existem
  - Ao tentar criar código tentando evitar problemas de perfomace pode acabar criando problemas de performace
    - React por si só já é rápido
      - Algoritmo que cálcula é rápido
- Quando quer olhar pra perfoce, olhar em react dev tools -> profiler e ver oq poderia ser evitado de renderizar
- React ainda não possui api interna para selecionar campos especificos de um contexto
  - Não consegue falar para qual informação mudar deve ser renderizado
  - Enquanto não existe nativamente, foi criado uma lib **use-context-selector**


# Use context selector
```sh
npm i use-context-selector scheduler
```

## Uso da lib
- No transaction context
  - create context importar da lib
```ts
import { createContext } from 'use-context-selector'
```
- Na Hora de utilizar importar useContextSelector
```tsx
// sem use context selector
const { createTransaction } = useContext(TransactionsContext)
// com use context selector
const createTransaction = useContextSelector(
  TransactionsContext,
  (context) => context.createTransaction,
)
```