const CURRENCY_FORMATTER = new Intl.NumberFormat('sr', {currency: "RSD", style: "currency"})

export function formatCurrency(number: number) {
    return CURRENCY_FORMATTER.format(number)
}