import { application, RequestHandler } from "express";
import { prisma } from "../data/postgres";
import transporter from "../config/mailer";

export const createApplication: RequestHandler = async (req, res) => {
  const {
    userId,
    petId,
    email,
    name,
    age,
    address,
    provincia,
    localidad,
    phone,
    message,
  } = req.body;

  if (!userId || !petId) {
    res.status(404).send("Missing information from applicationForm");
    return;
  }

  let newApplication;
  try {
    //Verificamos que la application exista
    const existingApplication = await prisma.application.findUnique({
      where: {
        userId_petId: {
          userId: userId,
          petId: petId,
        },
      },
    });

    if (existingApplication) {
      res
        .status(404)
        .send({ success: false, message: "Application already exists" });
      return;
    }
    //Buscamos al usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).send({
        success: false,
        message: "The user does not exist in your database",
      });
      return;
    }
    //Buscamos la mascota
    const pet = await prisma.pet.findUnique({
      where: { id: petId },
    });
    if (!pet) {
      res.status(404).send({
        success: false,
        message: "The pet does not exist in your database",
      });
      return;
    }
    //crear aplicación
    newApplication = await prisma.application.create({
      data: {
        userId,
        petId,
        status: "PENDING",
      },
    });
    if (
      !email ||
      !name ||
      !age ||
      !address ||
      !provincia ||
      !localidad ||
      !phone ||
      !message
    ) {
      res.status(404).send("Missing information from email");
      return;
    }
    await transporter.sendMail({
      from: process.env.NODEMAILER_EMAIL,
      to: process.env.NODEMAILER_EMAIL,
      subject: "Solicitud de adopción",
      replyTo: email,
      html: ` 
      <h1>Solicitud de adopción de ${name}<h1/>
      <p><strong> Edad del solicitante: </strong> ${age}</p>
      <p><strong>Dirección del solicitante: </strong>${address}</p>
      <p><strong>Provincia del solicitante: </strong>${provincia}</p>
      <p><strong>Localidad del solicitante: </strong>${localidad}</p>
      <p><strong>Número de teléfono del solicitante: </strong>${phone}</p>
      <p><strong>Mensaje del solicitante: </strong>${message}</p>
      <p><strong>User ID: </strong>${userId}</p>
      <p><strong>Pet ID: </strong>${petId}</p>
      <p><strong>Status: </strong>PENDING</p>`,
    });

    await transporter.sendMail({
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
    });
    return;
  } catch (error) {
    res.status(500).send({
      success: false,
      message: `Application created, but failed to send emails: ${error}`,
    });
  }
};
