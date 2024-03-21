export const required = value => {
    if (value) return undefined
    return  "Поле обязательное"
}

export const maxLengthCreator = (maxLength) => value => {
    if (value && value.length > maxLength) return  `Максимальное число символов ${maxLength}`
    return  undefined
}