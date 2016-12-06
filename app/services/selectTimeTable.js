//var model = require('../util/model');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// スキーマ
var SakeType = new Schema({
  _id: Number,
  type: String
});

var Temperature = new Schema({
  _id: Number,
  temperature: String
});

var Sake = new Schema({
  brand: String,
  type: { type: Number, ref: 'SakeType' },
  impressions: [{
    temperature: { type: Number, ref: 'Temperature' },
    impression: String
  }]
});

// MongoDBへの接続
mongoose.connect('mongodb://localhost/sake');

// スキーマからモデルをコンパイルし、モデルをエクスポートする
var Temperature = mongoose.model('Temperature', Temperature);
var SakeType = mongoose.model('SakeType', SakeType);
var Sake = mongoose.model('Sake', Sake);


// var Sake = model.Sake;
// var SakeType = model.SakeType;
// var Temperature = model.Temperature;

module.exports = function(req, res) {
  // ドキュメントの作成
  var kuheiji = new Sake({
    brand: '醸し人九平次',
    type: 9,
    impressions: [
      { temperature: 7, impression: 'めちゃうま' },
      { temperature: 10, impression: '激うま' }
    ]
  });
  
  var kuheiji2 = new Sake({
    brand: '八海山',
    type: 10,
    impressions: [
      { temperature: 7, impression: 'めちゃうま' },
      { temperature: 10, impression: '激うま' }
    ]
  });
  
  // ドキュメントの保存
  Sake.insertMany([kuheiji, kuheiji2], function(err) {
    if (err) throw err;
    
    Sake.findOne({ type: 10 }, function(err, result) {
      if (err) throw err;
      res.send(JSON.stringify(result.brand));
    });
  });
};
