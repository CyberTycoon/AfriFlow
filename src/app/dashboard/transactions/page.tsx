"use client"

import type React from "react"

import { useState, useEffect, useContext } from "react"
import {
  ArrowUpRight,
  ArrowDownLeft,
  Send,
  AlertCircle,
  CheckCircle2,
  Repeat,
  Copy,
  QrCode,
  Share2,
  ArrowLeftRight,
  Lock,
  X,
  Wallet,
  Edit2,
} from "lucide-react"
import TransactionSkeleton from "@/app/components/skeletons/transaction-skeleton"
import { AuthContext } from "@/app/context/AuthContext"
import TransactionsHistory from "@/app/components/dashboard/transactionsHistory"

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

// Define toast type
type ToastType = "success" | "error" | "info"

// Define toast interface
interface Toast {
  id: number
  type: ToastType
  message: string
}

export default function TransactionsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const [errorMessage, setErrorMessage] = useState("Please fill in all required fields.")
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [recipientName, setRecipientName] = useState<string | null>(null)
  const [verifying, setVerifying] = useState(false)
  const [verified, setVerified] = useState(false)
  const [showPinInput, setShowPinInput] = useState(false)
  const [pin, setPin] = useState("")
  const [showVerificationModal, setShowVerificationModal] = useState(false)
  const [showSuccessToast, setShowSuccessToast] = useState(false)
  const [successMessage, setSuccessMessage] = useState("")
  const [editMode, setEditMode] = useState(false)
  const [transactionId, setTransactionId] = useState<string | null>(null)
  const [timeStamp, setTimeStamp] = useState<string | null>(null)

  const auth = useContext(AuthContext)
  const user = (auth?.userData as { full_name?: string; email?: string; balance?: number; accNumber?: string }) || {}
  const balance = user.balance || 24568.8
  const accNumber = user.accNumber || "2458-7896-3214-0067"


  // Form state with proper typing
  const [formData, setFormData] = useState({
    transactionType: "transfer" as FormTransactionType,
    accountNumber: "",
    amount: "",
    description: "",
  })

  useEffect(() => {
    const syncData = async () => {
      await auth?.syncUserData();
    };
    syncData();
  }, [auth]);

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

  // Show toast notification
  const showToast = (type: ToastType, message: string) => {
    const id = Date.now()
    setToasts((prev) => [...prev, { id, type, message }])
    // Auto-remove toast after 5 seconds
    setTimeout(() => {
      setToasts((prev) => prev.filter((toast) => toast.id !== id))
    }, 5000)
  }

  // Remove toast
  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id))
  }

  // Reset verification when account number changes
  useEffect(() => {
    if (formData.accountNumber && !editMode) {
      setVerified(false)
      setRecipientName(null)
      setShowPinInput(false)
    }
  }, [formData.accountNumber, editMode])

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

  // Update the handleChange function to reset verification when account number changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })

    // Reset verification when account number changes, regardless of edit mode
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
    setEditMode(false)
  }

  // Enable edit mode for recipient details
  const enableEditMode = () => {
    setEditMode(true)
    // Reset verification states when entering edit mode
    setVerified(false)
    setRecipientName(null)
    setShowPinInput(false)
  }

  // Update the verifyRecipient function to use the existing API route
  const verifyRecipient = async () => {
    if (!formData.accountNumber) {
      showToast("error", "Please enter an account number")
      return
    }

    if (!formData.amount || Number.parseFloat(formData.amount) <= 0) {
      showToast("error", "Please enter a valid amount")
      return
    }

    if (!user) {
      showToast("error", "Authentication required")
      return
    }

    setVerifying(true)
    setShowVerificationModal(true)

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
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
        // Keep the verification modal open for confirmation
      } else {
        setShowVerificationModal(false)
        showToast("error", data.error || "Verification failed")
      }
    } catch (error) {
      setVerifying(false)
      setShowVerificationModal(false)
      console.error("❌ Error verifying recipient:", error)
      showToast("error", "Failed to verify recipient. Please try again.")
    }
  }

  // Confirm recipient after verification
  const confirmRecipient = () => {
    setVerified(true)
    setShowPinInput(true)
    setShowVerificationModal(false)
    setEditMode(false)
  }

  // Cancel recipient verification
  const cancelVerification = () => {
    setShowVerificationModal(false)
    setRecipientName(null)
  }

  // Update the processTransfer function to use the existing API route
  const processTransfer = async () => {
    if (!pin || pin.length !== 4) {
      showToast("error", "Please enter a valid 4-digit PIN")
      return
    }

    if (!user) {
      showToast("error", "Authentication required")
      return
    }

    // Check if amount is greater than balance
    if (Number(formData.amount) > userData.balance) {
      showToast("error", "Insufficient funds. Please enter a lower amount.")
      return
    }

    setIsSubmitting(true)

    try {
      const response = await fetch("/api/transfer", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          credentials: "include",
        },
        body: JSON.stringify({
          step: "transfer",
          recipient_wallet_number: formData.accountNumber,
          amount: Number.parseFloat(formData.amount),
          description: formData.description || "Transfer",
          pin: pin,
        }),
      })

      const transferdata = await response.json()
      console.log("Transfer Data:", transferdata)
      setIsSubmitting(false)

      if (response.ok) {
        // Show custom success toast
        setSuccessMessage(
          transferdata.message
        )
        setTransactionId(transferdata.transaction_id)
        setTimeStamp(transferdata.timestamp)
        setShowSuccessToast(true)
        setTimeout(() => setShowSuccessToast(false), 5000)

        // Update user balance if returned in the response
        if (transferdata.balance && auth?.setUserData) {
          auth.setUserData({
            ...user,
            balance: transferdata.balance,
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
        setEditMode(false)
        
      } else {
        // Handle specific error types
        if (transferdata.error && transferdata.error.toLowerCase().includes("pin")) {
          showToast("error", "Invalid PIN. Please try again.")
        } else if (
          (transferdata.error && transferdata.error.toLowerCase().includes("balance")) ||
          (transferdata.error && transferdata.error.toLowerCase().includes("insufficient"))
        ) {
          showToast("error", "Insufficient funds. Please enter a lower amount.")
        } else {
          showToast("error", transferdata.error || "Transfer failed")
        }
      }
    } catch (error) {
      setIsSubmitting(false)
      console.error("❌ Error processing transfer:", error)
      showToast("error", "Failed to process transfer. Please try again.")
    }
  }

  // Update the handleSubmit function to handle the two-step process
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Different validation based on transaction type
    if (formData.transactionType === "transfer") {
      if (!formData.accountNumber || !formData.amount) {
        showToast("error", "Please fill in all required fields")
        return
      }

      // If in edit mode or not verified, verify recipient
      if (editMode || !verified) {
        // Reset edit mode before verification
        setEditMode(false)
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
      if (formData.transactionType === "payment") {
        showToast("success", "Account details copied successfully!")
      } else {
        showToast("success", "Currency exchange completed successfully!")
      }
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

      {/* Toast notifications container */}
      <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 max-w-sm">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg animate-slide-in-right ${
              toast.type === "success"
                ? "bg-emerald-500 text-white"
                : toast.type === "error"
                  ? "bg-red-500 text-white"
                  : "bg-amber-500 text-white"
            }`}
            style={{
              animation: "slideInRight 0.3s ease-out forwards, fadeIn 0.3s ease-out forwards",
            }}
          >
            <div className="flex items-center">
              {toast.type === "success" ? (
                <CheckCircle2 className="h-5 w-5 mr-2" />
              ) : toast.type === "error" ? (
                <AlertCircle className="h-5 w-5 mr-2" />
              ) : (
                <AlertCircle className="h-5 w-5 mr-2" />
              )}
              <p>{toast.message}</p>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 p-1 rounded-full hover:bg-white/20 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Centered Verification Modal */}
      {showVerificationModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-800 border border-amber-500/30 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl animate-fade-in">
            <div className="text-center mb-4">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Send className="h-8 w-8 text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-amber-400">Confirm Recipient</h3>
            </div>

            {verifying ? (
              <div className="flex flex-col items-center justify-center py-6">
                <div className="animate-spin w-12 h-12 border-4 border-amber-500/20 border-t-amber-500 rounded-full"></div>
                <p className="mt-4 text-amber-100">Verifying recipient...</p>
              </div>
            ) : (
              <>
                <div className="bg-gray-700/50 rounded-lg p-4 mb-6">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-amber-100/60">Account Number</span>
                    <span className="text-amber-100 font-medium">{formData.accountNumber}</span>
                  </div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-amber-100/60">Amount</span>
                    <span className="text-amber-100 font-medium">{formatCurrency(Number(formData.amount))}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-amber-100/60">Recipient</span>
                    <span className="text-emerald-400 font-medium">{recipientName}</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={cancelVerification}
                    className="flex-1 py-3 px-4 bg-gray-700 text-amber-100 font-medium rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmRecipient}
                    className="flex-1 py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 text-gray-900 font-semibold rounded-lg hover:from-amber-400 hover:to-orange-500 transition-all"
                  >
                    Confirm
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* Custom Success Toast */}
      {showSuccessToast && (
        <div className="fixed inset-0 flex items-center justify-center z-50 pointer-events-none">
          <div className="bg-gray-800 border-2 border-emerald-500 rounded-lg p-6 w-full max-w-md mx-4 shadow-xl animate-fade-in-up pointer-events-auto">
            <div className="flex items-start">
              <div className="w-12 h-12 bg-emerald-500/20 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
                <CheckCircle2 className="h-6 w-6 text-emerald-500" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold text-emerald-400 mb-1">Transaction Successful</h3>
                <p className="text-amber-100">{successMessage}</p>
              </div>
              <button
                onClick={() => setShowSuccessToast(false)}
                className="p-1 rounded-full hover:bg-gray-700 transition-colors"
              >
                <X className="h-5 w-5 text-amber-100/60" />
              </button>
            </div>
            <div className="mt-4 pt-4 border-t border-gray-700">
              <div className="flex justify-between items-center text-sm">
                <span className="text-amber-100/60">Transaction ID</span>
                <span className="text-amber-100">
                   {transactionId}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm mt-2">
                <span className="text-amber-100/60">Date & Time</span>
                <span className="text-amber-100">{ timeStamp}</span>
              </div>
            </div>
          </div>
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
              <Wallet className="h-6 w-6 text-amber-500" />
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
                      disabled={verified && !editMode}
                    />
                    {verified && recipientName && !editMode && (
                      <div className="absolute right-3 top-3">
                        <CheckCircle2 className="h-5 w-5 text-emerald-400" />
                      </div>
                    )}
                  </div>
                  {verified && recipientName && (
                    <div className="mt-2 p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg flex justify-between items-center">
                      <span className="text-emerald-400 font-medium">Recipient: {recipientName}</span>
                      {!editMode && (
                        <button
                          type="button"
                          onClick={enableEditMode}
                          className="p-1 rounded-full hover:bg-emerald-500/30 transition-colors"
                        >
                          <Edit2 className="h-4 w-4 text-emerald-400" />
                        </button>
                      )}
                    </div>
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
                      type="text"
                      id="amount"
                      name="amount"
                      value={formData.amount}
                      onChange={handleChange}
                      className="w-full bg-gray-700 rounded-lg pl-8 pr-4 py-3 border border-amber-500/20 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent text-amber-100"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      disabled={verified && !editMode}
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
                    disabled={verified && showPinInput && !editMode}
                  ></textarea>
                </div>

                {/* PIN input field - only shown after verification */}
                {verified && showPinInput && !editMode && (
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
                  ) : verified && showPinInput && !editMode ? (
                    "Confirm Transfer"
                  ) : editMode ? (
                    "Verify Recipient Again"
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
                      setShowSuccessToast(true)
                      setSuccessMessage("Account details copied successfully!")
                      setTimeout(() => setShowSuccessToast(false), 5000)
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
          <TransactionsHistory />
        </div>
      </div>
    </>
  );
}
