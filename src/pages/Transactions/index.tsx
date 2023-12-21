import { useContextSelector } from 'use-context-selector'
import { Header } from '../../components/Header'
import { TransactionsContext } from '../../contexts/TransactionsContext'

import {
  PriceHighlight,
  TransactionsContainer,
  TransactionsTable,
} from './styles'

export function Transactions() {
  const transactions = useContextSelector(TransactionsContext, (context) => {
    return context.transactions
  })

  return (
    <div>
      <Header />

      <TransactionsContainer>

        <TransactionsTable>
          <thead>
            <th>Tipo</th>
            <th>Capacidade</th>
            <th>Mês</th>
            <th>Ano</th>
          </thead>
          <tbody>
            {transactions.map((transaction) => {
              return (
                
                <tr key={transaction.id}>
                  <td width="50%">
                    <PriceHighlight variant={transaction.type}>
                      {transaction.type}
                    </PriceHighlight>
                  </td>
                  <td>{transaction.capacidade}</td>
                  <td>{transaction.mes}</td>
                  <td>{transaction.ano}</td>
                </tr>
              )
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  )
}
