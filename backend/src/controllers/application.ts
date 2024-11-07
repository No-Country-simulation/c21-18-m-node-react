import { application, RequestHandler, Response, Request } from "express";
import { prisma } from "../data/postgres";
import transporter from "../config/mailer";
import { ApplicationStatus } from "@prisma/client";
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
  //Chequeo si existe userId y petId
  if (!userId || !petId) {
    res
      .status(400)
      .json({ message: "Missing information from applicationForm" });
    return;
  }
  //Chequeo si existe los datos para el email antes de crear el formulario y enviar el email.
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
    res.status(400).json({ message: "Missing information from email" });
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
        .status(400)
        .json({ success: false, message: "Application already exists" });
      return;
    }
    //Buscamos al usuario
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });
    if (!user) {
      res.status(404).json({
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
      res.status(404).json({
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
      subject: "Solicitud de adopción",
      html: `<p>Estimado usuario</p>
      <p>¡Gracias por su interés en adoptar una mascota! Hemos recibido su solicitud para la mascota con ID ${petId}</p>
      <p>Su solicitud se encuentra en estado: <string>PENDIENTE</strong>.<p/>
      <p>En los próximos días, nos comunicaremos con usted para proporcionarle más información sobre el proceso de adopción.</p>
      <p>Le deseamos que tenga un bonito día.</p>
      <p>Saludos cordiales,</p>
      <p><strong>Comunidad Perros&Gatos</strong></p>
      `,
    });

    res.status(200).json({
      success: true,
      message: "Application submitted and email sent successfully",
      data: newApplication,
    });
    return;
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `Application created, but failed to send emails: ${error}`,
    });
  }
};

export const getAllApplications = async (req: Request, res: Response) => {
  try {
    const applications = await prisma.application.findMany({
      include: {
        user: true,
        pet: true,
      },
    });

    res.json({
      message: "Applications retrieved successfully",
      applications,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to retrieve applications." });
  }
};
export const updateApplicationStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { approved } = req.body;

  if (typeof approved !== "boolean") {
    res
      .status(400)
      .json({ error: "Invalid input: approved must be a boolean." });
    return;
  }
  const newStatus = approved
    ? ApplicationStatus.APPROVED
    : ApplicationStatus.DENIED;

  try {
    const updatedApplication = await prisma.application.update({
      where: { id: parseInt(id) },
      data: { status: newStatus },
    });

    res.send({
      message: "Application status updated successfully",
      application: updatedApplication,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: "Failed to update application status." });
  }
};
