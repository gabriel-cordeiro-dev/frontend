import { zodResolver } from '@hookform/resolvers/zod'
import * as Dialog from '@radix-ui/react-dialog'
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react'
import { Controller, useForm } from 'react-hook-form'
import { useContextSelector } from 'use-context-selector'
import * as z from 'zod'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from './styles'

const newTransactionFormSchema = z.object({
  ano: z.string(),
  capacidade: z.string(),
  mes: z.string(),
  type: z.enum(['Servidor', 'Mini']),
})

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => {
      return context.createTransaction
    },
  )

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: {
      type: 'Servidor',
    },
  })

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { ano, capacidade, mes, type } = data
    console.log(data)
    await createTransaction({
      ano,
      capacidade,
      mes,
      type,
    })

    reset()
  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title>Nova Capacidade</Dialog.Title>

        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Ano"
            required
            {...register('ano')}
          />
          <input
            type="text"
            placeholder="Capcacidade"
            required
            {...register('capacidade')}
          />
          <input
            type="text"
            placeholder="Mês"
            required
            {...register('mes')}
          />

          <Controller
            control={control}
            name='type'
            render={({field}) =>{
              return(
                <TransactionType onValueChange={field.onChange} value={field.value}>
                  <TransactionTypeButton variant="Servidor" value="Servidor">
                    <ArrowCircleUp size={24} />
                    Servidor
                  </TransactionTypeButton>
                  <TransactionTypeButton variant="Mini" value="Mini">
                    <ArrowCircleDown size={24} />
                    Mini
                  </TransactionTypeButton>
                </TransactionType>
              )
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            Cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  )
}
