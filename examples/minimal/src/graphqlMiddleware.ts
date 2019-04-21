import { and, or, rule, shield } from 'graphql-shield';
import { ShieldRule } from 'graphql-shield/dist/types';
import { NexusGenArgTypes } from './generated/nexus';
type NexusPermissions = {
  [T in keyof NexusGenArgTypes]?: {
    [P in keyof NexusGenArgTypes[T]]?: ShieldRule   
  }
}
const isAuthenticated = rule('isAuthenticated')(async (parent, args, ctx, info) => {
  console.log('You are not Authenticated')
  return false
})


const ruleTree: NexusPermissions = {
  Query:{
    filterPosts: isAuthenticated
  },
  Mutation:{
    createDraft: isAuthenticated,
    deletePost: isAuthenticated
  }
}

const permissions = shield(ruleTree)

export default [permissions]