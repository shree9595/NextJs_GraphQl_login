import { gql } from '@apollo/client';


/**
 * Records to select from user
 */
const userPayload = `
  id
  username
  email
  fullName
  MyInvitationCode
  image
  imagePublicId
  coverImage
  coverImagePublicId
  createdAt
`;

/**
 * Gets specific user by username
 */

/**
 * Sign up user
 */
export const SIGN_UP = gql`
  mutation($input: SignUpInput!) {
    signup(input: $input) {
      token
    }
  }
`;

/**
 * Sign in user
 */
export const SIGN_IN = gql`
  mutation($input: SignInInput!) {
    signin(input: $input) {
      token
    }
  }
`;
