export const successResponse = (data) => ({
    success: true,
    data
})

export const failedResponse = (reason) => ({
    success: false,
    data: null,
    reason
})