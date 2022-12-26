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

# Use callback
- toda variavel, função criada no corpo de um componente é recriado do zero quando o componente renderizar
  - Não necessariamente é um problema
- Use callback evita recriar a função se nenhuma informação que a função dependa
  - Recebe a função como primeiro parametro e um array de depencias de quando deve recriar em memória novamente
- Antes
```ts
async function createTransaction(data: CreateTransactionInput) {
  const response = await api.post('transactions', {
    ...data,
    createdAt: new Date(),
  })

  setTransactions((state) => [response.data, ...state])
}
```
- Depois
```ts
const createTransaction = useCallback(
  async (data: CreateTransactionInput) => {
    const response = await api.post('transactions', {
      ...data,
      createdAt: new Date(),
    })

    setTransactions((state) => [response.data, ...state])
  },
  [],
)
```

# Memo
## Porque componente renderiza
- Hooks change (mudou estado, context, reducer)
- Props changed (mudou propriedades)
- parant rendered (componente pai renderizou)

## Fluxo renderização
1. React recria o HTML da interface daquele componente
2. Compara versão HTML recriada com a versão anterior
3. SE mudo alguma coisa, ele reescreve o HTML Na tela
- **isso tudo feito muito rápido**
  - Nem sempre vale a pena tentar evitar renderização
  - Caso componente tenha html grande
    - Essa comparação iria ficar lenta

- Memo é uma função usada para memorizar o componente
  - Fluxo renderização muda um pouco
  0. Hooks changed, Props changed (deep comparison -> olha de forma profunda)
    - Compara versão anterior dos hooks e props
    - SE mudou algo permite a nova renderização e segue fluxo normal

## Uso memo
- Antes
```tsx
export function SearchForm() {}
```
  
- Depois
```tsx
function SearchFormComponent() {}
export const SearchForm = memo(SearchFormComponent)
```
  
- Tomar cuidado no uso pois pode ser menos performático uso do memo do que a própria renderização padrão react