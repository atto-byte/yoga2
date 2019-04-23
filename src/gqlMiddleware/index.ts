import  * as shield from "graphql-shield";
import { upload } from "./upload";
import { applyMiddleware } from "graphql-middleware";

const gqlMiddleware = {
  upload,
  shield,
  applyMiddleware
}
export default gqlMiddleware