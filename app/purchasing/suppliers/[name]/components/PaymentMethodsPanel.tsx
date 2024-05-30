import paymentMethodActions from "@/actions/accounting/paymentMethodActions";
import supplierPaymentMethodActions from "@/actions/purchasing/supplierPaymentMethods";
import SectionTitle from "@/components/Text/SectionTitle";
import React from "react";
import Layout from "@/components/Layout";
import PaymentMethodPanelTitle from "./PaymentMethodPanelTitle";
import PaymentMethodForm from "./PaymentMethodForm";
import PaymentMethodsList from "./PaymentMethodsList";

type PaymentMethodsPanelProps = {
  supplierId: string;
};

const PaymentMethodsPanel = async ({
  supplierId,
}: PaymentMethodsPanelProps) => {
  const supplierPaymentMethods = await supplierPaymentMethodActions.getAll(
    {
      supplierId,
    },
    ["paymentMethod"]
  );

  const paymentMethods = await paymentMethodActions.getAll();

  return (
    <>
      <PaymentMethodForm
        paymentMethods={paymentMethods}
        supplierId={supplierId}
      />
      <PaymentMethodPanelTitle />

      <PaymentMethodsList supplierPaymentMethods={supplierPaymentMethods} />
    </>
  );
};

export default PaymentMethodsPanel;
