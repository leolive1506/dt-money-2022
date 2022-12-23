import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from "./styles";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as Dialog from "@radix-ui/react-dialog";
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod'

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
 type: z.enum(['income', 'outcome'])
})

type NewTransactionFormInput = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const {
    control,
    register,
    handleSubmit,
    formState: {
      isSubmitting
    }
  } = useForm<NewTransactionFormInput>({
    resolver: zodResolver(newTransactionFormSchema),
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInput) {
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.log(data);
  }

  return (
    <Dialog.Portal>
      <Overlay>
        <Content>
          <Dialog.Title>Nova transação</Dialog.Title>
          <CloseButton>
            <X size={24} />
          </CloseButton>

          <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
            <input
              placeholder="Descrição"
              {...register('description')}
            />
            <input
              type="number"
              placeholder="Preço"
              {...register('price', { valueAsNumber: true })}
            />
            <input
              placeholder="Categoria" 
              {...register('category')}
            />
            <Controller
              control={control}
              name="type"
              render={({ field }) => (
                <TransactionType
                  onValueChange={field.onChange}
                  value={field.value}
                >            
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
            
            <button
              type="submit"
              disabled={isSubmitting}
            >
              Cadastrar
            </button>
          </form>
        </Content>
      </Overlay>
    </Dialog.Portal>
  )
}
