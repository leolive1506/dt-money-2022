# Acessibilidade
- Ex de libs
  - radix-ui (usado no curso)
  - ariakit
  - headlessui
  - chakra-ui

## Radix ui
- Cada component é instalado separadamente
```sh
npm install @radix-ui/react-dialog
```
```tsx
// antes
<NewTransactionButton>Nova transação</NewTransactionButton>
// dps
<Dialog.Root>
  <Dialog.Trigger asChild>
    <NewTransactionButton>
      Nova transação
    </NewTransactionButton>
  </Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Overlay>
      <Dialog.Content>
        <Dialog.Title>Nova transação</Dialog.Title>
        <Dialog.Close />
      </Dialog.Content>
    </Dialog.Overlay>
  </Dialog.Portal>
</Dialog.Root>
```
- root -> provider
- trigger -> é um button por padrão que faz abrir ou fechar
  - Caso queira que o botao seja elemnto filho usar propridade **asChild**
- Portal -> uma funcionalidade do react
  - Forma de renderizar um elemento filho dentro de outro local da dom 
    - ex: modal fica por cima de toda pá gina e somente o header
- Overlay -> fundo preto
- Content -> conteudo
  - Tem algumas pre-definições de conteúdo como Title, Description, Close
  
# Json server
```sh
# -w -> monitora mudança no arquivo
npx json-server server.json -w -d 500
```

# Dicas gerais
- css
  - transition hover
    - Ao colocar transition no elemento (button) a transição acontece na entrade e saida do mouse
    - ao colocar dentro :hover acontece somente na entrada do mouse
```scss
  cursor: pointer;
  // entrada e saída
  // transition: background-color 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme['green-700']};
    // somente na entrada
    transition: background-color 0.2s;
  }
```
  - Separa linhas table
```css
table {
  border-collapse: separate;
  border-spacing: 0 0.5rem;
}
```

## React hook form
- Inserir informação que não vem através de um input
  - Preciso utilizar api react hook form de controle
    - Uncontroller -> busca informação somente quando realizar submit
    - Controlled -> anota valor toda vez que usuário mudar essa informação
```tsx
// antes
<TransactionType>            
  <TransactionTypeButton value="income" variant="income">
    <ArrowCircleUp size={24} />
    Entrada
  </TransactionTypeButton>
  <TransactionTypeButton value="outcome" variant="outcome">
    <ArrowCircleDown size={24} />
    Saída
  </TransactionTypeButton>
</TransactionType>

// dps
<Controller
  control={control}
  name="type"
  render={({ field }) => (
    <TransactionType onValueChange={field.onChange}>            
      <TransactionTypeButton value="income" variant="income">
        <ArrowCircleUp size={24} />
        Entrada
      </TransactionTypeButton>
      <TransactionTypeButton value="outcome" variant="outcome">
        <ArrowCircleDown size={24} />
        Saída
      </TransactionTypeButton>
    </TransactionType>
  )}
/>
```