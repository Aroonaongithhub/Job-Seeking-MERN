// every function will be packed in this catchAsyncError and will act as a promise
/**
 * The `catchAsyncError` function is a higher-order function that catches asynchronous errors in an
 * operation and passes them to the next middleware function.
 * @param operation - The `operation` parameter is a function that represents the asynchronous
 * operation that you want to execute within the `catchAsyncError` function. This function takes `req`,
 * `res`, and `next` as parameters, which are the request, response, and next middleware function in an
 * Express.js application.
 * @returns A function is being returned.
 */

export const catchAsyncError = (operation) => {
  return (req, res, next) => {
    Promise.resolve(operation(req, res, next).catch(next));
  };
};
