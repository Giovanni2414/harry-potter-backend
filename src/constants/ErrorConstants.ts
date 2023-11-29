export enum ErrorCodes {
    USERNAME_NOT_AVAILABLE = 'The username entered already belongs to someone else, please change the current username.',
    EMAIL_ALREADY_USED = 'The email address you have already entered belongs to someone else, please try to access it and try to change the password or enter a new email address',
    EXISTING_PRODUCT = 'The product you are trying to create already exists in the database.',
    PRODUCT_NOT_FOUND = 'The product you are looking for was not found',
    EXISTING_BRAND = 'The brand you are trying to create already exists in the database.',
    BRAND_NOT_FOUND = 'The brand you are looking for was not found',
    REVIEW_NOT_FOUND = 'The review you are looking for was not found',
    USER_NOT_FOUND = 'The user you are looking for was not found'
}