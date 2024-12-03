import PageBreadcrumbs from '@/components/App/PageBreadcrumbs'
import { Panels } from '@/components/Panels'
import SectionTitle from '@/components/Text/SectionTitle'
import React from 'react'
import InitiatePricingAudit from './_components/InitiatePricingAudit'

const PricingPage = async () => {



    return (
        <div>
            <PageBreadcrumbs />

            <Panels.Root>
                queue / to price
            </Panels.Root>

            <Panels.Root>
                latest
            </Panels.Root>

            <Panels.Root>
                <SectionTitle>Initiate Pricing</SectionTitle>

                <InitiatePricingAudit />
            </Panels.Root>

        </div>
    )
}

export default PricingPage
