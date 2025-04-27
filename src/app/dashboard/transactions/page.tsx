"use client"

import { useState, useEffect } from "react"
import {
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Send,
  CreditCard,
  AlertCircle,
  CheckCircle2,
  Repeat,
} from "lucide-react"
import TransactionSkeleton from "@/app/components/skeletons/transaction-skeleton"

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)

  // Form state
  const [formData, setFormData] = useState({
    transactionType: "transfer",
    accountNumber: "",
    amount: "",
    description: "",
  })

  // Mock user data
  const userData = {
    balance: 24568.8,
    currency: "USD",
    recentTransactions: [
      {
        id: 1,
        type: "incoming",
        name: "KenyaExport",
        date: "Apr 18, 2024",
        time: "10:24 AM",
        amount: 5240.0,
        status: "Completed",
      },
      {
        id: 2,
        type: "outgoing",
        name: "GhanaConnect",
        date: "Apr 16, 2024",
        time: "2:38 PM",
        amount: 3180.0,
        status: "Completed",
      },
      {
        id: 3,
        type: "exchange",
        name: "Currency Exchange",
        date: "Apr 15, 2024",
        time: "9:12 AM",
        amount: 2000.0,
        status: "Completed",
        details: "USD → NGN",
      },
      {
        id: 4,
        type: "incoming",
        name: "SenegalShip",
        date: "Apr 12, 2024",
        time: "4:45 PM",
        amount: 4750.0,
        status: "Completed",
      },
    ],
  }

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])


const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
        ...formData,
        [name]: value,
    });
};

interface TransactionTypeChangeHandler {
    (type: string): void;
}

const handleTransactionTypeChange: TransactionTypeChangeHandler = (type) => {
    setFormData({
        ...formData,
        transactionType: type,
    });
};

interface SubmitEvent {
    preventDefault: () => void;
}

const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Validate form
    if (!formData.accountNumber || !formData.amount) {
        setShowError(true)
        setIsSubmitting(false)
        setTimeout(() => setShowError(false), 3000)
        return
    }

    // Simulate API call
    setTimeout(() => {
        setIsSubmitting(false)
        setShowSuccess(true)

        // Reset form
        setFormData({
            transactionType: "transfer",
            accountNumber: "",
            amount: "",
            description: "",
        })

        // Hide success message after 3 seconds
        setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
}

const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount)
}

  if (isLoading) {
    return <TransactionSkeleton />
  }

  return (
    <>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-amber-400 mb-2">Transactions</h1>
        <p className="text-amber-100/60">Send money, make payments, and manage your transactions.</p>
      </div>

      {/* Success and error messages */}
      {showSuccess && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 flex items-center text-emerald-400">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          <span>Transaction completed successfully!</span>
        </div>
      )}

      {showError && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>Please fill in all required fields.</span>
        </div>
      )}

      {/* Balance card */}
      <div className="mb-8">
        <div className="bg-gray-800/80 rounded-xl p-6 border border-amber-500/20 relative overflow-hidden group hover:border-amber-500/40 transition-all duration-300">
          <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500 to-orange-600 opacity-50 group-hover:opacity-100 transition-opacity"></div>
          <div className="flex justify-between items-start">
            <div>
              <p className="text-amber-100/60 text-sm mb-1">Available Balance</p>
              <h2 className="text-3xl font-bold text-amber-100">{formatCurrency(userData.balance)}</h2>
            </div>
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center">
              <DollarSign className="h-6 w-6 text-amber-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Transaction form and recent transactions */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Make a Transaction</h2>
          </div>
          <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Transaction type */}
              <div>
                <label className="block mb-2 text-amber-100">Transaction Type</label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      formData.transactionType === "transfer"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                        : "bg-gray-700/50 border-amber-500/10 text-amber-100/60 hover:bg-gray-700/70"
                    }`}
                    onClick={() => handleTransactionTypeChange("transfer")}
                  >
                    <Send className="h-5 w-5 mb-1" />
                    <span className="text-sm">Transfer</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      formData.transactionType === "payment"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                        : "bg-gray-700/50 border-amber-500/10 text-amber-100/60 hover:bg-gray-700/70"
                    }`}
                    onClick={() => handleTransactionTypeChange("payment")}
                  >
                    <ArrowDownLeft className="h-5 w-5 mb-1" />
                    <span className="text-sm">Receive</span>
                  </button>
                  <button
                    type="button"
                    className={`flex flex-col items-center justify-center p-3 rounded-lg border ${
                      formData.transactionType === "request"
                        ? "bg-amber-500/20 border-amber-500/40 text-amber-400"
                        : "bg-gray-700/50 border-amber-500/10 text-amber-100/60 hover:bg-gray-700/70"
                    }`}
                    onClick={() => handleTransactionTypeChange("request")}
                  >
                    <Repeat className="h-5 w-5 mb-1" />
                    <span className="text-sm">Exchange</span>
                  </button>
                </div>
              </div>

              {/* Recipient field */}
              <div>
                <label htmlFor="accountNumber" className="block mb-2 text-amber-100">
                  {formData.transactionType === "request" ? "Request From" : "Recipient"} Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={formData.accountNumber}
                  onChange={handleChange}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                  placeholder="Enter account number"
                />
              </div>

              {/* Amount field */}
              <div>
                <label htmlFor="amount" className="block mb-2 text-amber-100">
                  Amount ({userData.currency})
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-amber-100/60">$</span>
                  </div>
                  <input
                    type="number"
                    id="amount"
                    name="amount"
                    value={formData.amount}
                    onChange={handleChange}
                    className="w-full bg-gray-700 rounded-lg pl-8 pr-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                    placeholder="0.00"
                    step="0.01"
                    min="0"
                  />
                </div>
              </div>

              {/* Description field */}
              <div>
                <label htmlFor="description" className="block mb-2 text-amber-100">
                  Description (Optional)
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  rows={3}
                  className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                  placeholder="Add a note about this transaction"
                ></textarea>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
              >
                {isSubmitting ? (
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-900"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                ) : (
                  <>
                    {formData.transactionType === "transfer" && "Send Money"}
                    {formData.transactionType === "payment" && "Make Payment"}
                    {formData.transactionType === "request" && "Request Money"}
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userData.recentTransactions.map((transaction) => (
                <div
                  key={transaction.id}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${
                        transaction.type === "incoming"
                          ? "bg-emerald-500/20"
                          : transaction.type === "outgoing"
                            ? "bg-red-500/20"
                            : "bg-amber-500/20"
                      }`}
                    >
                      {transaction.type === "incoming" ? (
                        <ArrowDownLeft
                          className={`h-5 w-5 ${
                            transaction.type === "incoming"
                              ? "text-emerald-500"
                              : transaction.type === "outgoing"
                              ? "text-red-500"
                              : "text-amber-500"
                          }`}
                        />
                      ) : transaction.type === "outgoing" ? (
                        <ArrowUpRight
                          className={`h-5 w-5 ${
                            transaction.type === "incoming"
                              ? "text-emerald-500"
                              : transaction.type === "outgoing"
                                ? "text-red-500"
                                : "text-amber-500"
                          }`}
                        />
                      ) : (
                        <CreditCard
                          className={`h-5 w-5 ${
                            transaction.type === "incoming"
                              ? "text-emerald-500"
                              : transaction.type === "outgoing"
                                ? "text-red-500"
                                : "text-amber-500"
                          }`}
                        />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">{transaction.name}</p>
                      <p className="text-xs text-amber-100/60">
                        {transaction.date} • {transaction.time}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p
                      className={`font-medium ${
                        transaction.type === "incoming"
                          ? "text-emerald-400"
                          : transaction.type === "outgoing"
                            ? "text-red-400"
                            : "text-amber-400"
                      }`}
                    >
                      {transaction.type === "incoming" ? "+" : transaction.type === "outgoing" ? "-" : ""}
                      {formatCurrency(transaction.amount)}
                      {transaction.details && <span className="text-xs ml-1">{transaction.details}</span>}
                    </p>
                    <p className="text-xs text-amber-100/60">{transaction.status}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <button className="text-amber-400 text-sm hover:underline">View all transactions</button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
