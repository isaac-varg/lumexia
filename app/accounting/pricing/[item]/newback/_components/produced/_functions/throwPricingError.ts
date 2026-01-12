type PricingErrorPayload = {
    message: string
    errorOnFunction: string
    data?: string[]
}

export const throwPricingError = (error: PricingErrorPayload) => {
    const { message, errorOnFunction, data } = error;

    console.error(`${errorOnFunction}: ${message}`, data)

    return ({
        message,
        errorOnFunction,
        data,
        isError: true,
    })
}

export type PricingError = ReturnType<typeof throwPricingError>

