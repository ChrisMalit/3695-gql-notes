const cron = require('node-cron');
const moment = require('moment');

// Run Job every 30minutes 
cron.schedule('*/30 * * * *', () => {
    Note.find({}, function(err, result) {
        var currentData = [];
        if (err) {
            console.log(err);
        } else {
            currentData.push(...result);
        }
        const filteredResult = currentData.filter(a => a.date == moment(new Date()).format("YYYY-MM-DD"))

        for(let x of filteredResult) {
            mongooseConnect.collection('upcomings').insertOne(x)
        }
      });
})