class ApiError extends Error {
  constructor(
    statusCode,
    message="someting went rong",
    error = [],
    stack = ""
  ){
    super(message)
    this.statusCode = statusCode
    this.data = null
    this.message = message
    // this.success = success
    this.error = error 

    if (stack) {
      this.stack = stack
      
    }else{
      Error.captureStackTrace(this,this.constructor)
    }

  }
}


export { ApiError } 