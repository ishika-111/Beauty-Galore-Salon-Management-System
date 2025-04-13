import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

export default function Payment({ amount }) {
  const transaction_uuid = uuidv4();
  const tax_amount = 10;
  const product_service_charge = 0;
  const product_delivery_charge = 150;

  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  const product_code = "EPAYTEST";

  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
  const hash = CryptoJS.HmacSHA256(message, "8gBm/:&EnhH.1/q");
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <form
      action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
      method="POST"
      className="bg-white p-6 rounded shadow-md w-full max-w-md"
    >
      <input type="hidden" name="amount" value={amount} />
      <input type="hidden" name="tax_amount" value={tax_amount} />
      <input
        type="hidden"
        name="product_service_charge"
        value={product_service_charge}
      />
      <input
        type="hidden"
        name="product_delivery_charge"
        value={product_delivery_charge}
      />
      <input type="hidden" name="total_amount" value={total_amount} />
      <input type="hidden" name="transaction_uuid" value={transaction_uuid} />
      <input type="hidden" name="product_code" value={product_code} />
      <input
        type="hidden"
        name="success_url"
        value="http://localhost:3000/customer/success"
      />
      <input
        type="hidden"
        name="failure_url"
        value="http://localhost:3000/customer/failure"
      />
      <input
        type="hidden"
        name="signed_field_names"
        value="total_amount,transaction_uuid,product_code"
      />
      <input type="hidden" name="signature" value={hashInBase64} />

      <button
        type="submit"
        className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded"
      >
        Pay with eSewa
      </button>
    </form>
  );
}
