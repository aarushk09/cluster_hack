'use client'

import { useState, useEffect } from 'react'
import { Plus, DollarSign, TrendingUp, TrendingDown, PiggyBank, CreditCard, Trash2 } from 'lucide-react'
import toast from 'react-hot-toast'

interface Transaction {
  id: string
  amount: number
  description: string
  category: string
  type: 'income' | 'expense'
  date: string
  createdAt: string
}

interface Budget {
  id: string
  category: string
  amount: number
  spent: number
  period: 'monthly' | 'weekly'
}

const expenseCategories = [
  'Food & Dining', 'Transportation', 'Shopping', 'Entertainment', 
  'Bills & Utilities', 'Healthcare', 'Education', 'Travel', 'Other'
]

const incomeCategories = [
  'Salary', 'Freelance', 'Business', 'Investments', 'Gifts', 'Other'
]

export default function FinanceTab() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [budgets, setBudgets] = useState<Budget[]>([])
  const [showAddTransaction, setShowAddTransaction] = useState(false)
  const [showAddBudget, setShowAddBudget] = useState(false)
  const [activeTab, setActiveTab] = useState<'overview' | 'transactions' | 'budgets'>('overview')
  const [newTransaction, setNewTransaction] = useState({
    amount: '',
    description: '',
    category: 'Food & Dining',
    type: 'expense' as Transaction['type'],
    date: new Date().toISOString().split('T')[0]
  })
  const [newBudget, setNewBudget] = useState({
    category: 'Food & Dining',
    amount: '',
    period: 'monthly' as Budget['period']
  })

  // Load data from localStorage
  useEffect(() => {
    const savedTransactions = localStorage.getItem('transactions')
    const savedBudgets = localStorage.getItem('budgets')
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions))
    if (savedBudgets) setBudgets(JSON.parse(savedBudgets))
  }, [])

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem('transactions', JSON.stringify(transactions))
  }, [transactions])

  useEffect(() => {
    localStorage.setItem('budgets', JSON.stringify(budgets))
  }, [budgets])

  const addTransaction = () => {
    if (!newTransaction.amount || !newTransaction.description) {
      toast.error('Please fill in all required fields')
      return
    }

    const transaction: Transaction = {
      id: Date.now().toString(),
      amount: Number(newTransaction.amount),
      description: newTransaction.description,
      category: newTransaction.category,
      type: newTransaction.type,
      date: newTransaction.date,
      createdAt: new Date().toISOString()
    }

    setTransactions([transaction, ...transactions])
    
    // Update budget if it's an expense
    if (transaction.type === 'expense') {
      setBudgets(budgets.map(budget => 
        budget.category === transaction.category
          ? { ...budget, spent: budget.spent + transaction.amount }
          : budget
      ))
    }

    setNewTransaction({
      amount: '',
      description: '',
      category: 'Food & Dining',
      type: 'expense',
      date: new Date().toISOString().split('T')[0]
    })
    setShowAddTransaction(false)
    toast.success('Transaction added successfully!')
  }

  const addBudget = () => {
    if (!newBudget.amount) {
      toast.error('Please enter a budget amount')
      return
    }

    const budget: Budget = {
      id: Date.now().toString(),
      category: newBudget.category,
      amount: Number(newBudget.amount),
      spent: 0,
      period: newBudget.period
    }

    setBudgets([...budgets, budget])
    setNewBudget({
      category: 'Food & Dining',
      amount: '',
      period: 'monthly'
    })
    setShowAddBudget(false)
    toast.success('Budget added successfully!')
  }

  const deleteTransaction = (id: string) => {
    const transaction = transactions.find(t => t.id === id)
    if (transaction && transaction.type === 'expense') {
      setBudgets(budgets.map(budget => 
        budget.category === transaction.category
          ? { ...budget, spent: Math.max(0, budget.spent - transaction.amount) }
          : budget
      ))
    }
    setTransactions(transactions.filter(t => t.id !== id))
    toast.success('Transaction deleted!')
  }

  const deleteBudget = (id: string) => {
    setBudgets(budgets.filter(b => b.id !== id))
    toast.success('Budget deleted!')
  }

  // Calculate financial summary
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)
  
  const balance = totalIncome - totalExpenses

  // Get recent transactions
  const recentTransactions = transactions.slice(0, 5)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Finance Tracker</h2>
          <p className="text-gray-600">Manage your income, expenses, and budgets</p>
        </div>
        <button
          onClick={() => setShowAddTransaction(true)}
          className="btn-primary"
        >
          <Plus size={20} />
          Add Transaction
        </button>
      </div>

      {/* Navigation Tabs */}
      <div className="flex bg-gray-100 rounded-lg p-1 w-fit">
        {(['overview', 'transactions', 'budgets'] as const).map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium rounded transition-colors ${
              activeTab === tab
                ? 'bg-white text-primary-600 shadow-sm'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Add Transaction Form */}
      {showAddTransaction && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add Transaction</h3>
          <div className="space-y-4">
            <div className="flex gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="expense"
                  checked={newTransaction.type === 'expense'}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as Transaction['type'] })}
                  className="text-red-600"
                />
                <span>Expense</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="type"
                  value="income"
                  checked={newTransaction.type === 'income'}
                  onChange={(e) => setNewTransaction({ ...newTransaction, type: e.target.value as Transaction['type'] })}
                  className="text-green-600"
                />
                <span>Income</span>
              </label>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="number"
                step="0.01"
                placeholder="Amount"
                value={newTransaction.amount}
                onChange={(e) => setNewTransaction({ ...newTransaction, amount: e.target.value })}
                className="input-field"
              />
              <input
                type="date"
                value={newTransaction.date}
                onChange={(e) => setNewTransaction({ ...newTransaction, date: e.target.value })}
                className="input-field"
              />
            </div>
            
            <input
              type="text"
              placeholder="Description"
              value={newTransaction.description}
              onChange={(e) => setNewTransaction({ ...newTransaction, description: e.target.value })}
              className="input-field"
            />
            
            <select
              value={newTransaction.category}
              onChange={(e) => setNewTransaction({ ...newTransaction, category: e.target.value })}
              className="input-field"
            >
              {(newTransaction.type === 'expense' ? expenseCategories : incomeCategories).map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddTransaction(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addTransaction}
                className="btn-primary"
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Budget Form */}
      {showAddBudget && (
        <div className="card animate-slide-up">
          <h3 className="text-lg font-semibold mb-4">Add Budget</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select
                value={newBudget.category}
                onChange={(e) => setNewBudget({ ...newBudget, category: e.target.value })}
                className="input-field"
              >
                {expenseCategories.map(category => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
              <select
                value={newBudget.period}
                onChange={(e) => setNewBudget({ ...newBudget, period: e.target.value as Budget['period'] })}
                className="input-field"
              >
                <option value="monthly">Monthly</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            
            <input
              type="number"
              step="0.01"
              placeholder="Budget Amount"
              value={newBudget.amount}
              onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              className="input-field"
            />
            
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowAddBudget(false)}
                className="btn-secondary"
              >
                Cancel
              </button>
              <button
                onClick={addBudget}
                className="btn-primary"
              >
                Add Budget
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Content based on active tab */}
      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Financial Summary Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 text-green-600 rounded-lg">
                  <TrendingUp size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Income</p>
                  <p className="text-2xl font-bold text-green-600">${totalIncome.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-100 text-red-600 rounded-lg">
                  <TrendingDown size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Total Expenses</p>
                  <p className="text-2xl font-bold text-red-600">${totalExpenses.toFixed(2)}</p>
                </div>
              </div>
            </div>

            <div className="card">
              <div className="flex items-center gap-3">
                <div className={`p-3 rounded-lg ${balance >= 0 ? 'bg-blue-100 text-blue-600' : 'bg-orange-100 text-orange-600'}`}>
                  <PiggyBank size={24} />
                </div>
                <div>
                  <p className="text-gray-600 text-sm">Balance</p>
                  <p className={`text-2xl font-bold ${balance >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                    ${balance.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Transactions */}
          <div className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold">Recent Transactions</h3>
              <button
                onClick={() => setActiveTab('transactions')}
                className="text-primary-600 hover:text-primary-700 text-sm"
              >
                View all
              </button>
            </div>
            {recentTransactions.length > 0 ? (
              <div className="space-y-3">
                {recentTransactions.map(transaction => (
                  <div key={transaction.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                        {transaction.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                      </div>
                      <div>
                        <p className="font-medium">{transaction.description}</p>
                        <p className="text-sm text-gray-600">{transaction.category}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                        {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                      </p>
                      <p className="text-sm text-gray-500">{new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 text-center py-4">No transactions yet</p>
            )}
          </div>
        </div>
      )}

      {activeTab === 'transactions' && (
        <div className="space-y-4">
          {transactions.length > 0 ? (
            transactions.map(transaction => (
              <div key={transaction.id} className="card">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${transaction.type === 'income' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                      {transaction.type === 'income' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                    </div>
                    <div>
                      <p className="font-medium">{transaction.description}</p>
                      <p className="text-sm text-gray-600">{transaction.category} • {new Date(transaction.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className={`font-semibold ${transaction.type === 'income' ? 'text-green-600' : 'text-red-600'}`}>
                      {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                    </p>
                    <button
                      onClick={() => deleteTransaction(transaction.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12">
              <CreditCard size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No transactions yet</h3>
              <p className="text-gray-500 mb-6">Start tracking your finances by adding your first transaction!</p>
              <button
                onClick={() => setShowAddTransaction(true)}
                className="btn-primary"
              >
                <Plus size={20} />
                Add Transaction
              </button>
            </div>
          )}
        </div>
      )}

      {activeTab === 'budgets' && (
        <div className="space-y-6">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold">Budget Overview</h3>
            <button
              onClick={() => setShowAddBudget(true)}
              className="btn-primary"
            >
              <Plus size={20} />
              Add Budget
            </button>
          </div>

          {budgets.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {budgets.map(budget => {
                const percentage = (budget.spent / budget.amount) * 100
                const isOverBudget = percentage > 100
                
                return (
                  <div key={budget.id} className="card">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{budget.category}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">{budget.period}</span>
                        <button
                          onClick={() => deleteBudget(budget.id)}
                          className="text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Spent: ${budget.spent.toFixed(2)}</span>
                        <span>Budget: ${budget.amount.toFixed(2)}</span>
                      </div>
                      
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className={`h-2 rounded-full transition-all duration-300 ${
                            isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-yellow-500' : 'bg-green-500'
                          }`}
                          style={{ width: `${Math.min(percentage, 100)}%` }}
                        />
                      </div>
                      
                      <div className={`text-sm ${isOverBudget ? 'text-red-600' : 'text-gray-600'}`}>
                        {isOverBudget 
                          ? `Over budget by $${(budget.spent - budget.amount).toFixed(2)}`
                          : `$${(budget.amount - budget.spent).toFixed(2)} remaining`
                        }
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <PiggyBank size={64} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-medium text-gray-600 mb-2">No budgets set</h3>
              <p className="text-gray-500 mb-6">Create budgets to track your spending in different categories!</p>
              <button
                onClick={() => setShowAddBudget(true)}
                className="btn-primary"
              >
                <Plus size={20} />
                Add Your First Budget
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
