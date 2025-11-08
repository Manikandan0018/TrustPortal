import { Copy, CheckCircle2 } from 'lucide-react';
import { useState } from 'react';

const DonatePage = ({id}) => {
  const bankDetails = {
    bank: 'State Bank of India',
    branch: 'Tiruchirappalli Town (01312)',
    ifsc: 'SBIN0001312',
    AccountNumber: '32028410985',
  };

  const [copiedField, setCopiedField] = useState('');

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(''), 2000);
  };

  return (
    <section id={id} className=" py-14 px-4">
      <div className="max-w-5xl mx-auto bg-white shadow-2xl rounded-3xl p-6 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-orange-100 rounded-bl-full" />
        <div className="text-center mb-8">
          <h2 className="text-4xl font-extrabold text-orange-600 mb-4 tracking-tight">
            🪔 Donate Joy This Deepawali!
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Help{" "}
            <span className="font-bold text-orange-500">
              18 SIGARAM students
            </span>{" "}
            celebrate Deepawali with dignity. Your donation of{" "}
            <span className="font-semibold">₹1000 per child</span> buys them new
            festive clothing. Let’s light up their lives together!
          </p>
        </div>

        {/* Suggested Amounts */}
        <div className="flex justify-center gap-4 flex-wrap mb-10">
          {[1000, 2000, 5000].map((amt) => (
            <button
              key={amt}
              onClick={() => navigator.clipboard.writeText(`INR ${amt}`)}
              className="bg-orange-100 hover:bg-orange-200 text-orange-700 px-5 py-2 rounded-full text-sm font-semibold transition shadow"
            >
              ₹{amt} for {amt / 1000} student{amt > 1000 ? "s" : ""}
            </button>
          ))}
        </div>

        {/* Bank Details */}
        <div className="bg-orange-50 border border-orange-200 p-6 rounded-xl shadow-sm space-y-4">
          <h4 className="text-xl font-semibold text-orange-600 mb-3">
            💳 Bank Account Details
          </h4>
          <div className="grid gap-4 md:grid-cols-2">
            <DetailRow
              label="A/c Number"
              value={bankDetails.AccountNumber}
              copied={copiedField === "type"}
              onCopy={() => handleCopy(bankDetails.accountType, "type")}
            />
            <DetailRow
              label="Bank"
              value={bankDetails.bank}
              copied={copiedField === "bank"}
              onCopy={() => handleCopy(bankDetails.bank, "bank")}
            />
            <DetailRow
              label="Branch"
              value={bankDetails.branch}
              copied={copiedField === "branch"}
              onCopy={() => handleCopy(bankDetails.branch, "branch")}
            />
            <DetailRow
              label="IFSC Code"
              value={bankDetails.ifsc}
              copied={copiedField === "ifsc"}
              onCopy={() => handleCopy(bankDetails.ifsc, "ifsc")}
            />
          </div>
        </div>

        {/* Optional QR */}
        {/* <div className="text-center mt-10">
          <h3 className="text-lg font-semibold text-orange-600 mb-4">📱 Prefer UPI?</h3>
          <div className="flex justify-center">
            <img
              src="/images/upi-qr-placeholder.png" // Replace with your actual QR
              alt="UPI QR"
              className="w-40 h-40 rounded-lg shadow-md"
            />
          </div>
          <p className="text-sm text-gray-500 mt-2">Scan & Pay via UPI</p>
        </div> */}

        {/* Thank You + CTA */}
        <div className="text-center mt-10">
          <p className="text-gray-600 italic">
            “The smallest act of kindness is worth more than the grandest
            intention.”
          </p>
          <p className="font-semibold text-orange-500 mt-2 mb-4">
            With love,
            <br />
            FOH Team
          </p>

          <p className="text-lg text-green-700 font-medium mb-2">
            🎁 Thank you for your contribution. You're lighting up lives!
          </p>
        </div>
      </div>
    </section>
  );
};

const DetailRow = ({ label, value, copied, onCopy }) => (
  <div className="flex items-center justify-between bg-white border border-gray-200 px-4 py-3 rounded-lg hover:bg-gray-50 transition">
    <span className="font-medium text-gray-700">{label}:</span>
    <div className="flex items-center gap-2">
      <span className="font-mono text-sm">{value}</span>
      <button
        onClick={onCopy}
        className="text-orange-500 hover:text-orange-600 transition"
        title="Copy to clipboard"
      >
        {copied ? <CheckCircle2 className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
      </button>
    </div>
  </div>
);

export default DonatePage;
