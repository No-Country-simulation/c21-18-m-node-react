import transporter from "../config/mailer";
import { prisma } from "../data/postgres";
import { RequestHandler } from "express";

export const sendApplicationConfirmation: RequestHandler = async (req, res) => {
  const { isApproved, userId, petId, email, name } = req.body;
  console.log("Datos recibidos:", { isApproved, userId, petId, email, name });
  try {
    const updatedAppication = await prisma.application.update({
      where: {
        userId_petId: {
          userId: userId,
          petId: petId,
        },
      },
      data: {
        status: isApproved ? "APPROVED" : "DENIED",
      },
    });

    if (isApproved) {
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Estado de adopción",
        replyTo: email,
        html: `<p>Estimado ${name},</p>
        <p>¡Estamos encantados de informarte que tu solicitud de adopción ha sido aprobada!</p>
        <p>Te contactaremos pronto para coordinar el día y el horario de entrega de tu mascota.</p>
        <p>Saludos cordiales,</p>
        <p><strong>Comunidad Perros&Gatos</strong></p>`,
      });
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: "Solicitud de adopción",
        replyTo: email,
        html: ` 
        <h1>Solicitud de adopción de ${name}</h1>
        <p><strong> Haz aprobado la solitud de adopción para el usuario: </strong> ${name}</p>
        <p><strong>Deberas llamar a ${name} para coordinar horario y día para finalizar la adopción</strong></p>
        <p><strong>El email del del solicitante aprobado para la adopción es: </strong>${email}</p>
        <p><strong>User ID: </strong>${userId}</p>
        <p><strong>Pet ID: </strong>${petId}</p>
        <p><strong>Status: </strong>APPROVED</p>`,
      });
    } else {
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: email,
        subject: "Estado de adopción",
        replyTo: email,
        html: `<p>Estimado ${name},</p>
        <p>Te informamos que, lamentablemente, tu solicitud de adopción ha sido desaprobada.</p>
        <p>Hemos analizado detalladamente la solicitud de adopción y administración ha decidido rechazarla en esta oportunidad.</p>
        <p>Lo sentimos mucho,</p>
        <p>Saludos cordiales,</p>
        <p><strong>Comunidad Perros&Gatos</strong></p>`,
      });
      await transporter.sendMail({
        from: process.env.NODEMAILER_EMAIL,
        to: process.env.NODEMAILER_EMAIL,
        subject: "Solicitud de adopción",
        replyTo: email,
        html: ` 
        <h1>Solicitud de adopción de ${name}<h1/>
        <p><strong> Haz desaprobado la solitud de adopción para el usuario: </strong> ${name}</p>
        <p><strong> Haz desaprobado la solitud de adopción para el usuario: </strong> ${name}</p>
        <p><strong>User ID: </strong>${userId}</p>
        <p><strong>Pet ID: </strong>${petId}</p>
        <p><strong>Status: </strong>APPROVED</p>`,
      });
    }
    res.status(200).json({
      success: true,
      message: "confirmation adoption send successfully",
      data: updatedAppication,
    });
  } catch (error) {
    console.error("Error en sendApplicationConfirmation:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to send email", error });
  }
};
