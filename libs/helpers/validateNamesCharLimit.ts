const validateNamesCharLimit = (name: string, username: string): [boolean, boolean] => [
    name.length <= 50,
    username.length <= 15
]

export default validateNamesCharLimit