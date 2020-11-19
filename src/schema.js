const { gql } = require('apollo-server')
const { Note, Upcoming } = require('./database')
var cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: 'xxxxx',
    api_key: 'xxxxx',
    api_secret: 'xxxxx'
});

const typeDefs = gql
`type Query {
    getNote(id: ID!): Note
    getNotes: [Note]
    getNoteByTitle(title: String!): [Note]
    getUpcoming: [Upcoming]
  }

  enum VideoCategory {
    LIVE_RECORD
    YOUTUBE
    DEVICE
  }

  type Note {
    id:ID!
    title: String!
    date: String!
    url: String!
    content: String!
    video: VideoCategory!
    reminder: String!
    Image: String
  }

  type Upcoming {
    id:ID!
    title: String!
    date: String!
    url: String!
    content: String!
    video: VideoCategory!
    reminder: String!
    Image: String
  }

  type Mutation {
      addNote(title: String!, date: String!, url: String!, content: String!, video:VideoCategory!, reminder:String!, Image:String): Note!,
      deleteNote(id: ID!): String,
      addImage(id: ID!, Image: String!): String
  }`

const resolvers = {
    Query: {
        getNotes: () => Note.find(),
        getUpcoming: () => Upcoming.find(),
        getNote: async (_, { id }) => {
            var result = await Note.findById(id);
            return result;
        },
        getNoteByTitle: async (_, { title }) => {
            allNotes = await Note.find();
            var notes = allNotes.filter(b => b.title == title);
            return notes;
        }
    },

    Mutation: {
        addNote: async (_, { title, date, url, content, video, reminder, Image }) => {
            const note = new Note({ title, date, url, content, video, reminder, Image });
            await note.save();
            const imagePath = Image;
            if (imagePath !== null) {
                cloudinary.uploader.upload(imagePath, { tags: 'note taking app', public_id: title + Image });
            };
            return note;
        },
        deleteNote: async (_, { id }) => {
            await Note.findByIdAndRemove(id);
            return "Note deleted";
        },
        addImage: async (_, { id, Image }) => {
            await Note.findByIdAndUpdate(id, { Image: Image });
            cloudinary.uploader.upload(Image, { tags: 'note taking app', public_id: id + Image });
            return "Added Image";
        }
    }
}

module.exports = {
    resolvers,
    typeDefs,
}