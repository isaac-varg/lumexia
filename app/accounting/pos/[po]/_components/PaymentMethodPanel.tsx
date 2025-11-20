'use client'
import { accountingActions } from "@/actions/accounting"
import { PaymentMethod } from "@/actions/accounting/paymentMethods/getAll"
import { getUserId } from "@/actions/users/getUserId"
import { Panels } from "@/components/Panels"
import SectionTitle from "@/components/Text/SectionTitle"
import PaymentMethodDisplay from "@/components/UI/PaymentMethodDisplay"
import { useRouter } from "next/navigation"
import { createAccountingAuditLog } from "../../_actions/createAccountingAuditLog"
import { Dispatch, Fragment, SetStateAction, useState } from "react"
import Tag from "@/components/Text/Tag"

const PaymentMethodPanel = ({ paymentMethod, allMethods, accountingDetailId, poId }: { paymentMethod: PaymentMethod | null | undefined, allMethods: PaymentMethod[], accountingDetailId: string | null | undefined, poId: string }) => {

  const [isChoosing, setIsChoosing] = useState<boolean>(false);

  if (!accountingDetailId) return false

  return (
    <Panels.Root>
      {isChoosing && (<ChooseMethod methods={allMethods} accountingDetailId={accountingDetailId} poId={poId} setIsChoosing={setIsChoosing} />)}

      {!isChoosing && (
        <Fragment>
          <SectionTitle size="small">Payment Method</SectionTitle>

          <div>
            {paymentMethod && (
              <div className="flex flex-col gap-y-2 items-center justify-center">
                <PaymentMethodDisplay method={paymentMethod} onClick={() => setIsChoosing(true)} />
                <p className="text-sm font-poppins tracking-wide">Change method by clicking above</p>
              </div>
            )}

            {!paymentMethod && (
              <div onClick={() => setIsChoosing(true)} className="bg-neutral-200 hover:bg-neutral-300 hover:cursor-pointer rounded-xl p-8 flex items-center justify-center">

                <p className="font-poppins text-lg font-semibold">None Choosen</p>
              </div>
            )}
          </div>
        </Fragment>
      )}

    </Panels.Root>
  )
}


const ChooseMethod = ({ methods, accountingDetailId, poId, setIsChoosing }: { methods: PaymentMethod[], accountingDetailId: string, poId: string, setIsChoosing: Dispatch<SetStateAction<boolean>> }) => {

  const router = useRouter()

  const handleMethodClick = async (chosenMethod: PaymentMethod) => {
    const userId = await getUserId();
    await accountingActions.pos.details.update(accountingDetailId, {
      paymentMethodId: chosenMethod.id,
    })
    await createAccountingAuditLog({
      userId,
      poId,
      action: 'Change Payment Menthod',
      context: `Payment method changed to ${chosenMethod.methodName}`
    });
    router.refresh()
    setIsChoosing(false);



  }

  return (
    <div className="flex flex-col gap-6">

      <div className="flex justify-between items-center">
        <SectionTitle size="small">Choose Method</SectionTitle>
        <button
          onClick={() => setIsChoosing(false)}
          className="btn btn-warning btn-outline btn-md">
          Cancel
        </button>

      </div>
      <div className="grid grid-cols-1 gap-1 max-h-[275px] overflow-auto">
        {methods.map(method => {

          const { bgColorA, bgColorB } = method;
          return (
            <div
              key={method.id}
              onClick={() => handleMethodClick(method)}
              className="flex  p-4  bg-primary/20 hover:bg-accent/30  hover:cursor-pointer rounded-xl w-full justify-between"
            >

              <div className="flex gap-4 items-center">
                <div
                  className="w-12 h-12 rounded-full"
                  style={{
                    background: `linear-gradient(to left, ${bgColorA}, ${bgColorB})`,
                    opacity: 0.65
                  }}
                />

                <div>
                  <Tag
                    color="default" label={method.paymentType}
                  />
                </div>

                <div className="font-poppins text-md font-medium text-base-content ">
                  {method.identifier}
                </div>
              </div>

              <div className="flex items-center">
                <div className="font-medium font-poppins text-base-content text-md">
                  {`Ending In  ${method.accountEndingIn}`}
                </div>

              </div>

            </div>
          )
        })}
      </div>

    </div>

  )
}

export default PaymentMethodPanel
