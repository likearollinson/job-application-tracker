
const Serializer = require('sequelize-to-json');
const Events = require('../../models/Events');

// our serialization scheme for the `BlogPost` model with the associated `User` (stored in the `author` field)
const scheme = {
    // include all own properties and the associated `User` instance
    include: ['@all'],
    // let's exclude from the above the primary key and all foreign keys
    exclude: ['@pk', '@fk'],
};

// now fetch some posts, with authors, and serialize them
Events.findAll({
}).then(function (events) {
    // serialize all the items efficiently
    eventsAsJSON = Serializer.serializeMany(events, Events, scheme);
});