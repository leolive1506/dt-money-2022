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
