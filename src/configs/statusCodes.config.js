const statusCodes = {
  OK: 200, // Standard response for successful HTTP requests. The actual response will depend on the request method used. In a GET request, the response will contain an entity corresponding to the requested resource. In a POST request, the response will contain an entity describing or containing the result of the action
  CREATED: 201, // The request has been fulfilled, resulting in the creation of a new resource
  ACCEPTED: 202, // The request has been accepted for processing, but the processing has not been completed. The request might or might not be eventually acted upon, and may be disallowed when processing occurs
  NO_CONTENT: 204, // The server successfully processed the request, and is not returning any content
  MULTIPLE_CHOICES: 300, // Indicates multiple options for the resource from which the client may choose (via agent-driven content negotiation). For example, this code could be used to present multiple video format options, to list files with different filename extensions, or to suggest word-sense disambiguation.
  MOVED_PERMANENTLY: 301, // This and all future requests should be directed to the given URI.
  BAD_REQUEST: 400, // The server cannot or will not process the request due to an apparent client error (e.g., malformed request syntax, size too large, invalid request message framing, or deceptive request routing
  UNAUTHORIZED: 401, // Similar to 403 Forbidden, but specifically for use when authentication is required and has failed or has not yet been provided. The response must include a WWW-Authenticate header field containing a challenge applicable to the requested resource. See Basic access authentication and Digest access authentication.[32] 401 semantically means "unauthorised",[33] the user does not have valid authentication credentials for the target resource.
  FORBIDDEN: 403, // The request contained valid data and was understood by the server, but the server is refusing action. This may be due to the user not having the necessary permissions for a resource or needing an account of some sort, or attempting a prohibited action (e.g. creating a duplicate record where only one is allowed). This code is also typically used if the request provided authentication by answering the WWW-Authenticate header field challenge, but the server did not accept that authentication. The request should not be repeated.
  NOT_FOUND: 404, // The requested resource could not be found but may be available in the future. Subsequent requests by the client are permissible.
  METHOD_NOT_ALLOWED: 405, // A request method is not supported for the requested resource; for example, a GET request on a form that requires data to be presented via POST, or a PUT request on a read-only resource.
  INTERNAL_SERVER_ERROR: 500, // A generic error message, given when an unexpected condition was encountered and no more specific message is suitable
  NOT_IMPLEMENTED: 501, // The server either does not recognize the request method, or it lacks the ability to fulfil the request. Usually this implies future availability (e.g., a new feature of a web-service API)
  SERVICE_UNAVAILABLE: 503, // The server cannot handle the request (because it is overloaded or down for maintenance). Generally, this is a temporary state
}

export default statusCodes
