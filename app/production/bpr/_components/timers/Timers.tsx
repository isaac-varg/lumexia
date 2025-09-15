'use client'
import Card from "@/components/Card"
import SectionTitle from "@/components/Text/SectionTitle"
import { useTranslation } from "@/hooks/useTranslation"
import { translationsBprProduction } from "../../_configs/translations"

const Timers = () => {
  const { t } = useTranslation()
  return (
    <div className="flex flex-col gap-6">
      <SectionTitle>{t(translationsBprProduction, 'titleTimers')}</SectionTitle>

      <p className="text-2xl text-base-content font-medium">
        {t(translationsBprProduction, 'contentNoTimers')}
      </p>
    </div>
  )
}

export default Timers
