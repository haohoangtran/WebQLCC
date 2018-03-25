const Position = require('./positionSchema')

let addNewPosition = (name, callback) => {
    let position = new Position({name});
    position.save(err => {
        if (err) {
            callback(err);

        }
        else {
            callback(null, position)
        }
    })
};
let findPositionByName = (name, callback) => {

    Position.findOne({name}).exec((err, position) => {
        callback(err, position);
    })

}
let getAllPosition = (callback) => {
    Position.find({}, function (err, positions) {


        callback(err, positions);
    });
};
module.exports = {
    getAllPosition, addNewPosition, findPositionByName
}

