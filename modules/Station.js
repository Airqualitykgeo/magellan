const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const StationSchema = new Schema ({
    stationId: {
        type: String,
        required: true,
        trim: true
        //default: 'A00'
    },
    tempValue: {
        type: Number,
        required: true
        //default: 0
    },
    humidValue: {
        type: Number,
        required: true
        //default: 0
    },
    dustValue: {
        type: Number,
        required: true
        //default: 0
    },
    co2Value: {
        type: Number,
        required: true
        //default: 0
    },
    date: {
    	type: Date,
	required: true
    }
});

module.exports = mongoose.model('stations', StationSchema);
