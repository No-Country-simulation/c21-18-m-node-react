import { RequestHandler } from "express";
import { prisma } from "../data/postgres";
// import { Resend } from "resend";
import dotenv from "dotenv";
import transporter from "../config/mailer";
dotenv.config();
// const apiKey = process.env.RESEND_API_KEY;
// const fromEmail = process.env.FROM_EMAIL;

// const resend = new Resend(apiKey);

// if (!apiKey || !fromEmail) {
//   throw new Error("RESEND_API_KEY and FROM_EMAIL must be defined");
// }

export const createApplication: RequestHandler = async (req, res) => {
  const { userId, petId, email, userName, age, address, province, locality, phoneNumber, message } = req.body;
  try {
    const newApplication = await prisma.application.create({
      data: {
        userId,
        petId,
        status: "PENDING",
      },
    });

    const emailResponseToAdmin = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Solicitud de adopción",
      replyTo: email,
      html: ` 
      <h1>Solicitud de adopción de ${userName}<h1/>
      <p><strong> Edad del solicitante: </strong> ${age}</p>
      <p><strong>Dirección del solicitante: </strong>${address}</p>
      <p><strong>Provincia del solicitante: </strong>${province}</p>
      <p><strong>Localidad del solicitante: </strong>${locality}</p>
      <p><strong>Número de teléfono del solicitante: </strong>${phoneNumber}</p>
      <p><strong>Mensaje del solicitante: </strong>${message}</p>
      <p><strong>User ID: </strong>${userId}</p>
      <p><strong>Pet ID: </strong>${petId}</p>
      <p><strong>Status: </strong>PENDING</p>`,
    });

    const emailResponseToApplicant = await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: email,
      subject: "Confirmación de solicitud de adopción",
      html: `<p>Estimado usuario</p>
      <p>¡Gracias por su interés en adoptar una mascota! Hemos recibido su solicitud para la mascota con ID ${petId}</p>
      <p>Su solicitud se encuentra en estado: <string>PENDIENTE</strong>.<p/>
      <p>En los próximos días, nos comunicaremos con usted para proporcionarle más información sobre el proceso de adopción.</p>
      <p>Le deseamos que tenga un bonito día.</p>
      <p>Saludos cordiales,</p>
      <p><strong>Comunidad Perros&Gatos</strong></p>
      `,
    });

    res.status(200).send({
      success: true,
      message: "Application submitted and email sent",
      data: newApplication,
      emailResponseToAdmin,
      emailResponseToApplicant,
    });
  } catch (error) {
    res.status(500).send({ success: false, message: `error: ${error}` });
  }
};
