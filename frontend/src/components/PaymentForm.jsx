import React from "react";
import { v4 as uuidv4 } from "uuid";
import CryptoJS from "crypto-js";

const PaymentForm = () => {
  const domain = "http://localhost:5173";

  const success = `${domain}/payment-success`;
  const failure = `${domain}/payment-failure`;
  const transaction_uuid = uuidv4();

  // Base amounts
  const amount = 999;
  const tax_amount = 10;
  const product_service_charge = 0;
  const product_delivery_charge = 0;

  // eSewa requires total = sum of all
  const total_amount =
    amount + tax_amount + product_service_charge + product_delivery_charge;

  // Signed fields
  const signed_field_names = "total_amount,transaction_uuid,product_code";
  const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=EPAYTEST`;

  // Secret key (⚠️ keep this only in backend for production)
  const secret = "8gBm/:&EnhH.1/q";

  // Generate signature
  const hash = CryptoJS.HmacSHA256(message, secret);
  const hashInBase64 = CryptoJS.enc.Base64.stringify(hash);

  return (
    <div>
      <form
        action="https://rc-epay.esewa.com.np/api/epay/main/v2/form"
        method="POST"
      >
        <input type="text" name="amount" value={amount} readOnly />
        <input type="text" name="tax_amount" value={tax_amount} readOnly />
        <input type="text" name="total_amount" value={total_amount} readOnly />
        <input type="text" name="transaction_uuid" value={transaction_uuid} readOnly />
        <input type="text" name="product_code" value="EPAYTEST" readOnly />
        <input type="text" name="product_service_charge" value={product_service_charge} readOnly />
        <input type="text" name="product_delivery_charge" value={product_delivery_charge} readOnly />
        <input type="text" name="success_url" value={success} readOnly />
        <input type="text" name="failure_url" value={failure} readOnly />
        <input type="text" name="signed_field_names" value={signed_field_names} readOnly />
        <input type="text" name="signature" value={hashInBase64} readOnly />

        <input type="submit" value="Pay with eSewa" />
      </form>
    </div>
  );
};

export default PaymentForm;
