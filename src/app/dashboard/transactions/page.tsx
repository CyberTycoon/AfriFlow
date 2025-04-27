"use client"

import type React from "react"

import { useState, useEffect, useContext } from "react"
import {
  ArrowUpRight,
  ArrowDownLeft,
  DollarSign,
  Send,
  AlertCircle,
  CheckCircle2,
  Repeat,
  Copy,
  QrCode,
  Share2,
  ArrowLeftRight,
  Lock,
} from "lucide-react"
import TransactionSkeleton from "@/app/components/skeletons/transaction-skeleton"
import { AuthContext } from "@/app/context/AuthContext"

// Define transaction type as a proper TypeScript type
type TransactionType = "incoming" | "outgoing" | "exchange"

// Define transaction interface
interface Transaction {
  id: number
  type: TransactionType
  name: string
  date: string
  time: string
  amount: number
  status: string
  details?: string
}

// Define form transaction type
type FormTransactionType = "transfer" | "payment" | "request"

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [showError, setShowError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("Please fill in all required fields.")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [recipientName, setRecipientName] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [showPinInput, setShowPinInput] = useState(false)
  const [pin, setPin] = useState("")

  const auth = useContext(AuthContext)
  const user = (auth?.userData as { full_name?: string; email?: string; balance?: number; accNumber?: string }) || {}
  const balance = user.balance || 24568.8
  const accNumber = user.accNumber || "2458-7896-3214-0067"
  const token = auth?.token || null

  // Form state with proper typing
  const [formData, setFormData] = useState({
    transactionType: "transfer" as FormTransactionType,
    accountNumber: "",
    amount: "",
    description: "",
  })

  // Mock user data
  const userData = {
    balance: balance,
    currency: "NGN",
    accountNumber: accNumber,
    accountName: user.full_name || "Adeola Johnson",
    bankName: "AfriFlow Bank",
    swiftCode: "AFBNIGLA",
    recentTransactions: [
      {
        id: 1,
        type: "incoming" as TransactionType,
        name: "KenyaExport",
        date: "Apr 18, 2024",
        time: "10:24 AM",
        amount: 5240.0,
        status: "Completed",
      },
      {
        id: 2,
        type: "outgoing" as TransactionType,
        name: "GhanaConnect",
        date: "Apr 16, 2024",
        time: "2:38 PM",
        amount: 3180.0,
        status: "Completed",
      },
      {
        id: 3,
        type: "exchange" as TransactionType,
        name: "Currency Exchange",
        date: "Apr 15, 2024",
        time: "9:12 AM",
        amount: 2000.0,
        status: "Completed",
        details: "USD → NGN",
      },
      {
        id: 4,
        type: "incoming" as TransactionType,
        name: "SenegalShip",
        date: "Apr 12, 2024",
        time: "4:45 PM",
        amount: 4750.0,
        status: "Completed",
      },
    ] as Transaction[],
  }

  useEffect(() => {
    // Simulate loading delay
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [])

  // Reset verification when account number changes
  useEffect(() => {
    if (formData.accountNumber) {
      setVerified(false)
      setRecipientName(null)
      setShowPinInput(false)
    }
  }, [formData.accountNumber])

  // Handle copy to clipboard
  const handleCopy = (text: string, type: string) => {
    navigator.clipboard.writeText(text).then(
      () => {
        setCopiedText(type)
        setTimeout(() => setCopiedText(null), 2000)
      },
      (err) => {
        console.error("Could not copy text: ", err)
      },
    )
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Reset verification when account number changes
    if (name === "accountNumber") {
      setVerified(false)
      setRecipientName(null)
      setShowPinInput(false)
    }
  }

  const handlePinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPin(e.target.value)
  }

  const handleTransactionTypeChange = (type: FormTransactionType) => {
    setFormData({
      ...formData,
      transactionType: type,
    })
    setVerified(false)
    setRecipientName(null)
    setShowPinInput(false)
  }

  // Update the verifyRecipient function to use the existing API route
  const verifyRecipient = async () => {
    if (!formData.accountNumber) {
      setShowError(true)
      setErrorMessage("Please enter an account number")
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      setShowError(true)
      setErrorMessage("Please enter a valid amount")
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (!token) {
      setShowError(true)
      setErrorMessage("Authentication required")
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setVerifying(true)

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          step: "verify",
          recipient_wallet_number: formData.accountNumber,
          amount: Number.parseFloat(formData.amount) || 0,
        }),
      })

      const data = await response.json()
      setVerifying(false)

      if (response.ok) {
        console.log("Recipient Name:", data.recipient_name)
        setRecipientName(data.recipient_name)
        setVerified(true)
        setShowPinInput(true)
      } else {
        setShowError(true)
        setErrorMessage(data.error || "Verification failed")
        setTimeout(() => setShowError(false), 3000)
      }
    } catch (error) {
      setVerifying(false)
      console.error("❌ Error verifying recipient:", error)
      setShowError(true)
      setErrorMessage("Failed to verify recipient. Please try again.")
      setTimeout(() => setShowError(false), 3000)
    }
  }

  // Update the processTransfer function to use the existing API route
  const processTransfer = async () => {
    if (!pin || pin.length !== 4) {
      setShowError(true)
      setErrorMessage("Please enter a valid 4-digit PIN")
      setTimeout(() => setShowError(false), 3000)
      return
    }

    if (!token) {
      setShowError(true)
      setErrorMessage("Authentication required")
      setTimeout(() => setShowError(false), 3000)
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          step: "transfer",
          recipient_wallet_number: formData.accountNumber,
          amount: Number.parseFloat(formData.amount),
          description: formData.description || "Transfer",
          pin: pin,
        }),
      })

      const data = await response.json()
      setIsSubmitting(false)

      if (response.ok) {
        setShowSuccess(true)
        // Update user balance if returned in the response
        if (data.balance && auth?.setUserData) {
          auth.setUserData({
            ...user,
            balance: data.balance,
          })
        }
        // Reset form
        setFormData({
          ...formData,
          accountNumber: "",
          amount: "",
          description: "",
        })
        setVerified(false)
        setRecipientName(null)
        setShowPinInput(false)
        setPin("")
        setTimeout(() => setShowSuccess(false), 3000)
      } else {
        setShowError(true)
        setErrorMessage(data.error || "Transfer failed")
        setTimeout(() => setShowError(false), 3000)
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error("❌ Error processing transfer:", error)
      setShowError(true)
      setErrorMessage("Failed to process transfer. Please try again.")
      setTimeout(() => setShowError(false), 3000)
    }
  }

  // Update the handleSubmit function to handle the two-step process
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Different validation based on transaction type
    if (formData.transactionType === "transfer") {
      if (!formData.accountNumber || !formData.amount) {
        setShowError(true)
        setErrorMessage("Please fill in all required fields")
        setTimeout(() => setShowError(false), 3000)
        return
      }

      if (!verified) {
        // Step 1: Verify recipient
        verifyRecipient()
        return
      }

      if (verified && showPinInput) {
        // Step 2: Process the transfer with PIN
        processTransfer()
        return
      }
    }

    // Handle other transaction types
    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setShowSuccess(true)
      setTimeout(() => setShowSuccess(false), 3000)
    }, 1500)
  }

  const formatCurrency = (amount: number): string => {
    return new Intl.NumberFormat("en-NG", {
      style: "currency",
      currency: "NGN",
    }).format(amount)
  }

  // Helper function to get transaction type-specific CSS classes and icons
  const getTransactionAppearance = (type: TransactionType) => {
    switch (type) {
      case "incoming":
        return {
          bgColor: "bg-emerald-500/20",
          textColor: "text-emerald-500",
          icon: <ArrowDownLeft className="h-5 w-5 text-emerald-500" />,
        }
      case "outgoing":
        return {
          bgColor: "bg-red-500/20",
          textColor: "text-red-500",
          icon: <ArrowUpRight className="h-5 w-5 text-red-500" />,
        }
      case "exchange":
        return {
          bgColor: "bg-amber-500/20",
          textColor: "text-amber-500",
          icon: <Repeat className="h-5 w-5 text-amber-500" />,
        }
    }
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

      {/* Update the success message to show the actual transaction details */}
      {showSuccess && (
        <div className="mb-6 bg-emerald-500/20 border border-emerald-500/30 rounded-lg p-4 flex items-center text-emerald-400">
          <CheckCircle2 className="h-5 w-5 mr-2" />
          <span>
            {formData.transactionType === "transfer"
              ? `Transaction completed successfully!`
              : formData.transactionType === "payment"
                ? "Account details copied successfully!"
                : "Currency exchange completed successfully!"}
          </span>
        </div>
      )}

      {showError && (
        <div className="mb-6 bg-red-500/20 border border-red-500/30 rounded-lg p-4 flex items-center text-red-400">
          <AlertCircle className="h-5 w-5 mr-2" />
          <span>{errorMessage}</span>
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
            <h2 className="text-lg font-bold text-amber-400">
              {formData.transactionType === "transfer"
                ? "Send Money"
                : formData.transactionType === "payment"
                  ? "Receive Money"
                  : "Exchange Currency"}
            </h2>
          </div>
          <div className="p-6">
            <div className="mb-6">
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

            {/* Update the Transfer Money Form to include a confirmation step and PIN input */}
            {formData.transactionType === "transfer" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Recipient field */}
                <div>
                  <label htmlFor="accountNumber" className="block mb-2 text-amber-100">
                    Recipient Account Number
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      className={`w-full bg-gray-700 rounded-lg px-4 py-3 border ${
                        verified ? "border-emerald-500/40" : "border-amber-500/20"
                      } focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100`}
                      placeholder="Enter account number"
                      disabled={verified}
                    />
                    {verified && recipientName && (
                      <div className="absolute right-3 top-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                  {verified && recipientName && (
                    <p className="mt-2 text-sm text-emerald-400">Sending to: {recipientName}</p>
                  )}
                </div>

                {/* Amount field */}
                <div>
                  <label htmlFor="amount" className="block mb-2 text-amber-100">
                    Amount ({userData.currency})
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <span className="text-amber-100/60">₦</span>
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
                      disabled={verified}
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
                    disabled={verified && showPinInput}
                  ></textarea>
                </div>

                {/* PIN input field - only shown after verification */}
                {verified && showPinInput && (
                  <div className="mt-4">
                    <label htmlFor="pin" className="block mb-2 text-amber-100">
                      Enter your 4-digit PIN
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Lock className="h-4 w-4 text-amber-100/60" />
                      </div>
                      <input
                        type="password"
                        id="pin"
                        name="pin"
                        value={pin}
                        onChange={handlePinChange}
                        className="w-full bg-gray-700 rounded-lg pl-10 pr-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                        placeholder="****"
                        maxLength={4}
                        pattern="[0-9]*"
                        inputMode="numeric"
                      />
                    </div>
                    <p className="mt-2 text-xs text-amber-100/60">Enter your PIN to authorize this transaction</p>
                  </div>
                )}

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting || verifying}
                  className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
                >
                  {isSubmitting || verifying ? (
                    <>
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
                      {verifying ? "Verifying..." : "Processing..."}
                    </>
                  ) : verified && showPinInput ? (
                    "Confirm Transfer"
                  ) : (
                    "Verify Recipient"
                  )}
                </button>
              </form>
            )}

            {/* Receive Money UI */}
            {formData.transactionType === "payment" && (
              <div className="space-y-6">
                <div className="bg-gray-700/30 rounded-xl p-6 border border-amber-500/20">
                  <div className="flex justify-center mb-6">
                    <div className="w-32 h-32 bg-white p-2 rounded-lg">
                      <QrCode className="w-full h-full text-gray-900" />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-sm text-amber-100/60">Account Number</p>
                        <p className="text-amber-100 font-medium">{userData.accountNumber}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(userData.accountNumber, "accountNumber")}
                        className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        {copiedText === "accountNumber" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Copy className="h-5 w-5 text-amber-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-sm text-amber-100/60">Account Name</p>
                        <p className="text-amber-100 font-medium">{userData.accountName}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(userData.accountName || "", "accountName")}
                        className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        {copiedText === "accountName" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Copy className="h-5 w-5 text-amber-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-sm text-amber-100/60">Bank Name</p>
                        <p className="text-amber-100 font-medium">{userData.bankName}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(userData.bankName, "bankName")}
                        className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        {copiedText === "bankName" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Copy className="h-5 w-5 text-amber-400" />
                        )}
                      </button>
                    </div>

                    <div className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="text-sm text-amber-100/60">SWIFT/BIC Code</p>
                        <p className="text-amber-100 font-medium">{userData.swiftCode}</p>
                      </div>
                      <button
                        onClick={() => handleCopy(userData.swiftCode, "swiftCode")}
                        className="p-2 bg-amber-500/10 rounded-lg hover:bg-amber-500/20 transition-colors"
                      >
                        {copiedText === "swiftCode" ? (
                          <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                        ) : (
                          <Copy className="h-5 w-5 text-amber-400" />
                        )}
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      // In a real app, this would share account details
                      setShowSuccess(true)
                      setTimeout(() => setShowSuccess(false), 3000)
                    }}
                    className="w-full mt-6 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-amber-500 transition-all duration-300 flex items-center justify-center shadow-lg shadow-amber-900/20"
                  >
                    <Share2 className="h-5 w-5 mr-2" />
                    Share Account Details
                  </button>
                </div>
              </div>
            )}

            {/* Currency Exchange UI */}
            {formData.transactionType === "request" && (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="bg-gray-700/30 rounded-xl p-6 border border-amber-500/20">
                  <div className="flex items-center justify-center mb-4">
                    <ArrowLeftRight className="h-8 w-8 text-amber-400" />
                  </div>

                  {/* From Currency */}
                  <div className="mb-4">
                    <label className="block mb-2 text-amber-100">From</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <select
                          name="fromCurrency"
                          className="w-full bg-gray-700 rounded-lg px-3 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                          defaultValue="USD"
                        >
                          <option value="USD">USD</option>
                          <option value="NGN">NGN</option>
                          <option value="GHS">GHS</option>
                          <option value="KES">KES</option>
                          <option value="ZAR">ZAR</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <div className="relative">
                          <input
                            type="number"
                            name="fromAmount"
                            className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exchange Rate */}
                  <div className="flex justify-center items-center my-4">
                    <div className="px-4 py-2 bg-amber-500/10 rounded-lg text-amber-400 text-sm">1 USD = 920 NGN</div>
                  </div>

                  {/* To Currency */}
                  <div className="mb-4">
                    <label className="block mb-2 text-amber-100">To</label>
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <select
                          name="toCurrency"
                          className="w-full bg-gray-700 rounded-lg px-3 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                          defaultValue="NGN"
                        >
                          <option value="NGN">NGN</option>
                          <option value="USD">USD</option>
                          <option value="GHS">GHS</option>
                          <option value="KES">KES</option>
                          <option value="ZAR">ZAR</option>
                        </select>
                      </div>
                      <div className="col-span-2">
                        <div className="relative">
                          <input
                            type="number"
                            name="toAmount"
                            className="w-full bg-gray-700 rounded-lg px-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                            placeholder="0.00"
                            step="0.01"
                            min="0"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Fee information */}
                  <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-amber-100/60">Exchange Fee</span>
                      <span className="text-amber-100">$2.50</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-amber-100/60">Delivery Time</span>
                      <span className="text-amber-100">Instant</span>
                    </div>
                  </div>
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
                    "Exchange Currency"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Recent transactions */}
        <div className="bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
          <div className="p-6 border-b border-amber-900/30">
            <h2 className="text-lg font-bold text-amber-400">Recent Transactions</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {userData.recentTransactions.map((transaction) => {
                // Get the appropriate appearance for this transaction type
                const appearance = getTransactionAppearance(transaction.type)

                return (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                  >
                    <div className="flex items-center">
                      <div
                        className={`w-10 h-10 rounded-lg flex items-center justify-center mr-4 ${appearance.bgColor}`}
                      >
                        {appearance.icon}
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
                        className={`font-medium ${transaction.type === "incoming" ? "text-emerald-400" : transaction.type === "outgoing" ? "text-red-400" : "text-amber-400"}`}
                      >
                        {transaction.type === "incoming" ? "+" : transaction.type === "outgoing" ? "-" : ""}
                        {formatCurrency(transaction.amount)}
                        {transaction.details && <span className="text-xs ml-1">{transaction.details}</span>}
                      </p>
                      <p className="text-xs text-amber-100/60">{transaction.status}</p>
                    </div>
                  </div>
                )
              })}
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
