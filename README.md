# React Messenger
This is the client of a chat application built with Dgraph server and GraphQL as a backend. 
It was bootstrapped using create-react-app. 
It uses Apollo Client to connect the GraphQL server to React.

To try it go to https://abalshakou.github.io/react-messenger/, you could login, register and chat with another user  which you want.

Functionality:  
- register user used email and name saved it in localstorage as token
- auth user by token or by email if user logout with react reactivity 
- list of users, which you can invite to chat, receiving new users in real time
- chat component used subscriptions Apollo GraphQL and sending and receiving data in real time

Technologies and Tools
 - backend used Apollo GraphQL and Dgraph server for easy implementation
 - frontend used React.js with react hooks

