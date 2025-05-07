type PricingError = {
    message: string
    errorOnFunction: string
    data?: string[]
}

export const throwPricingError = (error: PricingError) => {
    const { message, errorOnFunction, data } = error;

    console.error(`${errorOnFunction}: ${message}`, data)

    return ({
        message,
        errorOnFunction,
        data,
    })
}
