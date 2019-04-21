
export default ({ app }) => {
  app.post(
    '/subscribe', 
    [
      (req, res, next) => console.log("Express Middleware - /subscribe")
    ]
  )
  
 
  // Graphql Post Handling
  app.post(
    '/',
    [ 

      //checkJwt,
      //handleTokenError,
      (req, res, next) => console.log("Express Middleware")
    ]
  );
}