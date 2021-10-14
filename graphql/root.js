const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList
} = require('graphql');

const UserType = require("./users.js");

const users = require("../src/server.js");

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => ({
        user: {
            type: UserType,
            description: 'A single user',
            args: {
                email: { type: GraphQLString }
            },
            resolve: async function(parent, args) {
                let userArray = await users.getDocs();

                return userArray.find(user => user.email === args.email);
            }
        },
        users: {
            type: GraphQLList(UserType),
            description: 'List of all users',
            resolve: async function() {
                return await users.getDocs();
            }
        }
    })
});


module.exports = RootQueryType;
