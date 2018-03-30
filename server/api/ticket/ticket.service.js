'use strict';

import Ticket from './ticket.model';
import Match from '../match/match.model';
import * as priceSchemaService from '../priceSchema/priceSchema.service';
import * as matchService from '../match/match.service';
import * as crypto from 'crypto';

export function createTicket(seat, freeMessageStatus) {
  return Promise.all([
    priceSchemaService.getSeatPrice(seat),
    matchService.findById(seat.match)
  ])
    .then(([price, match]) => {
      let ticket = new Ticket({
        accessCode: randomNumericString(16),
        match: {
          id: match.id,
          headline: match.headline,
          date: match.date
        },
        seat: {
          id: seat.id,
          tribune: seat.tribune,
          sector: seat.sector,
          row: seat.row,
          seat: seat.seat
        },
        amount: freeMessageStatus ? 0 : price,
        status: 'paid',
        ticketNumber: crypto.randomBytes(20).toString('hex'),
        reserveDate: new Date(),
        freeMessageStatus,
      });

      return ticket.save();
    });
}

export function getUserTickets(tickets) {
  return getTicketsById(tickets, {'match.date': { $gte: new Date()}}, {'match.date': -1});
}

export function getByTicketNumber(ticketNumber) {
  return Ticket.findOne({ticketNumber: ticketNumber});
}

export function getByAccessCode(accessCode) {
  console.log('accessCode', accessCode);
  return Ticket.findOne({accessCode: accessCode});
}

export function randomNumericString(length) {
  let chars = '0123456789';
  let result = '';
  for (let i = length; i > 0; --i) result += chars[Math.round(Math.random() * (chars.length - 1))];
  return result;
}

function getTicketById(ticketId) {
  return Ticket.findById(ticketId);
}

function getTicketsById(ids, optionParams = {}, sortParams = {}) {
  const options = Object.assign(optionParams, {'_id': {$in: ids}});
  return Ticket.find(options) .populate({
    path: 'match.id', model: Match
  })
    .sort(sortParams)
}
