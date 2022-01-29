import { gql } from "@apollo/client";

const SUBSCRIPTION_QUERY = gql`
  subscription onQueryMessage($filter: MessageFilter!) {
    queryMessage(filter: $filter ) {
     id
        message
        receiverMail
        senderMail
        timestamp
    }
  }
`;

const SUBSCRIPTION_QUERY_USER = gql`
  subscription {
    queryUser(order: { desc: name }) {
    id
      name
      email
      lastVisit
      messages {
            id
            message
            receiverMail
            senderMail
            timestamp
          }
    }
  }
`;
const SEND_USER = gql`
  mutation sendUser($name: String!, $email: String!) {
    addUser(input: [{ name: $name, email: $email }]) {
         user {
           id
           name
           email
         }
    }
  }
`;

const UPDATE_USER = gql`
  mutation updateUser($patch: UpdateUserInput!) {
    updateUser(input: $patch) {
         user {
           id
           lastVisit
         }
    }
  }
`;

const SEND_MESSAGE = gql`
  mutation sendMessage($message: String!, $receiverMail: String!, $senderMail: String!, $timestamp: DateTime!) {
    addMessage(input: [{ message: $message, receiverMail: $receiverMail, senderMail: $senderMail, timestamp: $timestamp  }]) {
      message {
         id
          message
          receiverMail
          senderMail
          timestamp
      }
    }
  }
`;

const DELETE_MESSAGE = gql`
  mutation deleteMessage($filter: MessageFilter!) {
    deleteMessage(filter: $filter )  {
    msg
    numUids
    }
  }
`;

export { SUBSCRIPTION_QUERY, SUBSCRIPTION_QUERY_USER, SEND_USER, SEND_MESSAGE, DELETE_MESSAGE, UPDATE_USER };