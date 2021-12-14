import express from 'express';
import moment from 'moment';
// divido los imports por tipos
import { db } from '../../db/database';
import * as mailer from '../util/mailer';

// para no alargar el codigo creo una function flecha que devulve un objeto
const lang = 'CAS';
const options = () => ({
  include: [
    {
      model: db.HotelRequestStatus,
      include: [
        {
          model: db.RequestStatus,
          include: [
            {
              model: db.I18NRequestStatus,
              where: { lang },
              attributes: [ 'description' ],
              required: false,
            },
          ],
        },
      ],
    },
    {
      model: db.Hotel,
      include: [
        { model: db.I18NHotel, attributes: [ 'name' ], where: { lang } },
      ],
    },
    { model: db.HotelOffer, include: [ db.RoomOffer ], required: false },

    {
      model: db.TripRequest,
      include: [
        {
          model: db.User,
          attributes: [ 'username', 'name', 'phone' ],
          include: [
            {
              model: db.SystemUser,
              as: 'agent',
              attributes: [ 'name', 'lastName', 'phone', 'email' ],
            },
          ],
        },
        {
          model: db.Destination,
          attributes: [ 'code' ],
          include: [
            {
              model: db.I18NDestination,
              attributes: [ 'name' ],
              where: { lang },
              required: false,
            },
          ],
        },
      ],
    },
  ],
});


// creo funciones externas para no reptir codigo

const sendEmail = (sendMail, emailHR) => {
  setTimeout(() => {
    sendMail();
    emailHR.addOneToOfferToCustomerEmailCount();
  }, 2000);
};

const diffMoment = hr => moment().diff(moment(hr.triprequest.requestDate), 'hours') as number;

export async function resendOfferCustomer(req: any, res: express.Response) {
  try {
    const hotelRequests = await db.HotelRequest.findAll({
      where: { offerToCustomerEmailCount: { [Op.between]: [ 1, 2 ] } },
      attributes: [ 'id' ],
      include: [
        {
          model: db.TripRequest,
          where: { cancelled: false },
          required: true,
        },
      ],
    });
    //Refactor del then. Lo que hago es esperar a la const hours de la linea 76 y despues la respuesta de esto que es array le hago un promise all para que sea asincrono y no tenga esperar a cada request.
    await Promise.all(hotelRequests.map(hotelRequest => async index => {
      const hr = hotelRequest[index];
      const emailHR = await db.HotelRequest.findByPk(hr.id, options());
      if (!emailHR) {
        res.send({ ok: true });
      }
      const diffHoursBetweenRequestDateAndToday: number = diffMoment(hr);
      const mailMessages: Array<any> = await emailHR.getMail_messages();
      // Esta especie de destructuring que es lo mismo que la primera posicion del array [0];
      const [ lastAcceptedMail ]: any = mailMessages
        .filter((x: any) => (x.status === 'delivered' || x.status === 'opened') && x.type === MailTypes.offerToCustomer)
      // He cambiado el sort para que reste uno con otro y nos de el mayor
        .sort(({ sendingDate: y }, { sendingDate: x }) => y - x);
      if (lastAcceptedMail) {
        const lastDeliveredMailDiffHours: number = diffMoment(hr);
        if (emailHR.lastStatus() === 'ANSWERED') {
          // He puesto un arrow function
          const sendMail: any = async () => mailer.sendReceivedOfferCustomer(emailHR, lang);
          // IDEA: solo tomar en cuenta la diferencia horaria entre el envio del mail y ahora
          if (diffHoursBetweenRequestDateAndToday >= 24
            && diffHoursBetweenRequestDateAndToday < 48
            && lastDeliveredMailDiffHours >= 24
            && lastDeliveredMailDiffHours < 48) {
            sendEmail(sendMail, emailHR);
          }
          if (diffHoursBetweenRequestDateAndToday >= 48 && lastDeliveredMailDiffHours >= 48) {
            sendEmail(sendMail, emailHR);
          }
        }
      }
    }));
    res.send({ ok: true });
  } catch (error) {
    res.send({ error: error });
  }
}
