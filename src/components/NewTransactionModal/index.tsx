import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from '@radix-ui/react-radio-group';

export function NewTransactionModal() {
  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form action="">
            <input placeholder="Descrição"/>
            <input type="number" placeholder="Preço"/>
            <input placeholder="Categoria" />

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
            <button type="submit">Cadastrar</button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
