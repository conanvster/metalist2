/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */

'use strict';
import User from '../api/user/user.model';
import Ticket from '../api/ticket/ticket.model';
import Match from '../api/match/match.model';
import PriceSchema from '../api/priceSchema/priceSchema.model';
import Order from '../api/order/order.model';

PriceSchema.find({}).remove()
  .then(() => {
    console.log('finished populating PriceSchemas');
  });


Match.find({}).remove()
  .then(() => {
    console.log('finished populating matches');
  });

Order.find({}).remove()
  .then(() => {
    console.log('finished populating orders');
  });


User.find({}).remove()
  .then(() => {
    User.create({
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      name: 'Test Steward',
      email: 'steward@example.com',
      password: 'test'
    }, {
      provider: 'local',
      name: 'Test Cashier',
      email: 'cashier@example.com',
      password: 'test'
    }, {
      provider: 'local',
      name: 'Test User',
      email: 'test@example.com',
      password: 'test'
    }, {
      provider: 'local',
      role: 'admin',
      name: 'Admin',
      email: 'admin@example.com',
      password: 'admin'
    })
      .then(() => {
        console.log('finished populating users');
      });
  });

Ticket.find({}).remove()
  .then(() => {
    console.log('finished populating tickets');
  });

