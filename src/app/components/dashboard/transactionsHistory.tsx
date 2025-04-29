import React from "react";
import { useContext, useState } from "react";
import { AuthContext } from "@/app/context/AuthContext";
import { ArrowDownLeft, ArrowUpRight } from "lucide-react";
import { useRouter } from "next/navigation";
const TransactionsHistory = () => {
  const auth = useContext(AuthContext);
  const transactionHistory = auth?.transactionHistory || [];
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  return (
    <div className="lg:col-span-2 bg-gray-800/80 rounded-xl border border-amber-500/20 overflow-hidden">
      <div className="p-6 border-b border-amber-900/30">
        <h2 className="text-lg font-bold text-amber-400">
          Recent Transactions
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4">
          {transactionHistory
            ?.sort(
              (a, b) =>
                new Date(b.timestamp).getTime() -
                new Date(a.timestamp).getTime()
            )
            .slice(0, 5)
            .map((txn) => {
              const isIncoming = txn.transaction_direction === "incoming";
              const amountColor = isIncoming
                ? "text-emerald-400"
                : "text-red-400";
              const bgColor = isIncoming
                ? "bg-emerald-500/20"
                : "bg-red-500/20";
              const icon = isIncoming ? (
                <ArrowDownLeft className="h-5 w-5 text-emerald-500" />
              ) : (
                <ArrowUpRight className="h-5 w-5 text-red-500" />
              );
              const formattedAmount = `${isIncoming ? "+" : "-"}₦${parseFloat(
                txn.amount
              ).toLocaleString()}`;
              const transactionLabel = isIncoming
                ? `Payment from ${txn.sender_name}`
                : `Payment to ${
                    txn.receiver_name_display || txn.receiver_name
                  }`;
              const formattedDate = new Date(txn.timestamp).toLocaleString(
                "en-NG",
                {
                  dateStyle: "medium",
                  timeStyle: "short",
                }
              );

              return (
                <div
                  key={txn.transaction_id}
                  className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
                >
                  <div className="flex items-center">
                    <div
                      className={`w-10 h-10 ${bgColor} rounded-lg flex items-center justify-center mr-4`}
                    >
                      {icon}
                    </div>
                    <div>
                      <p className="font-medium text-amber-100">
                        {transactionLabel}
                      </p>
                      <p className="text-xs text-amber-100/60">
                        {formattedDate}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-medium ${amountColor}`}>
                      {formattedAmount}
                    </p>
                    <p className="text-xs text-amber-100/60">Completed</p>
                  </div>
                </div>
              );
            })}
        </div>
        <div className="mt-4 text-center">
          <button
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              setTimeout(() => {
                setLoading(true);
                router.push("/dashboard/transactions/history");
              }, 2000);
              setLoading(false);
            }}
            className="text-amber-400 text-sm hover:underline"
          >
            {loading == true ? (
              <div className="flex items-center justify-center gap-2">
                <div
                  className="h-4 w-4 border-2 border-t-transparent border-amber-600 rounded-full animate-spin"
                  role="status"
                  aria-label="Loading"
                />
                <span className="text-sm text-amber-600">Loading...</span>
              </div>
            ) : (
              "View All Transactions"
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TransactionsHistory;
