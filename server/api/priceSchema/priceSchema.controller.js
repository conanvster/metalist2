'use strict';

import PriceSchema from "./priceSchema.model";
import * as log4js from 'log4js';

let logger = log4js.getLogger('PriceSchema');

export function index(req, res) {
  return PriceSchema.find({}).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function savePriceSchema(req, res) {
  console.log('savePriceSchema', req.body);
  let priceSchema = req.body;
  console.log('savePriceSchema', priceSchema);
  PriceSchema.findById(priceSchema.id)
    .then((price)  => {
      if (!price) {
        let newPrice = new PriceSchema({
          priceSchema: priceSchema
        });
        newPrice.priceSchema.id = newPrice.id;
        return newPrice.save();
      }
      price.priceSchema = priceSchema;
      return price.save();
    })
    .then(respondWithResult(res))
    .catch(handleError(res))
  ;
}

export function view(req, res) {
  return PriceSchema.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function deletePrice(req, res) {
  return PriceSchema.findByIdAndRemove(req.params.id).exec()
    .then(function () {
      res.status(204).end();
    })
    .catch(handleError(res));
}

//private functions

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function (entity) {
    if (entity) {
      logger.info('respondWithResult ' + entity._id);
      return res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function (entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function (err) {
    logger.error('handleError '+err);
    res.status(statusCode).send(err);
  };
}
