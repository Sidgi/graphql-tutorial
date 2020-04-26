const express = require("express");
const bodyParser = require("body-parser");
const graphqlHttp = require('express-graphql');
const app = express();
const {buildSchema} = require("graphql");

const events = [];

app.use(bodyParser.json());

app.use('/graphql',graphqlHttp({
    schema: buildSchema(`
        type Event {
            _id:ID!
            title: String!
            description: String!
            price: Float!
            date: String!
        }

        input  EventInput {
            title: String!
            description: String!
            price: Float!
            date: String!
        } 

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }

        schema {
            query:RootQuery
            mutation:RootMutation
        }
    `),
    rootValue:{
        events: ()=>{
            return events;
        },
        createEvent:args=>{
            const event = {
                _id: Math.random().toString(),
                title:eventInput.args.title,
                description: eventInput.args.description,
                price: eventInput.args.price,
                date: eventInput.args.date
            }
            events.push(event);
            return event;
        }
    },
    graphiql:true
}))

app.listen(3000);