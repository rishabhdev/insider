import { success, notFound } from '../../services/response/'
import { Image } from '.'
import {aws_config} from '../../config'
var ObjectID = require('mongodb').ObjectID;
var Upload = require('s3-uploader');
var base64ToImage = require('base64-to-image');
var AWS = require('aws-sdk');
AWS.config.update(aws_config);
var s3Bucket = new AWS.S3( { params: {Bucket: 'aws-explore'} } );

export const create = ({ bodymen:{body}},res,next) =>
{
  if(body.image){
  var buf = new Buffer(body.image.replace(/^data:image\/\w+;base64,/, ""),'base64');
  var data1 = {
    Key: (new ObjectID()).toString()+'.jpeg', 
    Body: buf,
    ContentEncoding: 'base64',
    ContentType: 'image/jpeg'
  };
  s3Bucket.upload(data1, function(err, data){
      if (err) { 
        console.log(err);
        console.log('Error uploading data: ', data); 
      } else {
        delete body.image;
        body.url = data.Location;
        console.log('succesfully uploaded the image! >>> ',data);        
        Image.create(body)
        .then((image) => image.view(true))
        .then(success(res, 201))
        .catch(next)
      }
  });
}
else{
  next("No Image");
}
}
export const index = (req, res, next) =>{
  Image.find(req.query,{})
    .then((images) => images.map((image) => image.view()))
    .then(success(res))
    .catch(next)
}

export const show = ({ params }, res, next) =>
  Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? image.view() : null)
    .then(success(res))
    .catch(next)

export const update = ({ bodymen: { body }, params }, res, next) =>
  Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? Object.assign(image, body).save() : null)
    .then((image) => image ? image.view(true) : null)
    .then(success(res))
    .catch(next)

export const destroy = ({ params }, res, next) =>
  Image.findById(params.id)
    .then(notFound(res))
    .then((image) => image ? image.remove() : null)
    .then(success(res, 204))
    .catch(next)
