import { createContext, useReducer, useMemo, type Dispatch, type ReactNode } from "react";
import {type BudgetActions, budgetReducer, type BudgetState, initialState} from "../reducers/budget-reducer.ts";

type BudgetContextProps = {
  state: BudgetState
  dispatch: Dispatch<BudgetActions>
  totalExpenses: number
  remainingBudget: number
}

type BudgetProviderProps = {
  children: ReactNode
}

export const BudgetContext = createContext<BudgetContextProps>(null!);

export const BudgetProvider = ({children}: BudgetProviderProps) => {

  const [state, dispatch] = useReducer(budgetReducer, initialState);

  const totalExpenses = useMemo(() => state.expenses.reduce((acc, expense) => expense.amount + acc, 0), [state.expenses])

  const remainingBudget = state.budget - totalExpenses;

  return (
    <BudgetContext.Provider
      value={{
        state,
        dispatch,
        totalExpenses,
        remainingBudget
      }}
    >
      {children}
    </BudgetContext.Provider>
  )
}