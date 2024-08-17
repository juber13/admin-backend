import Ticket from "../models/ticketModel.js";
import jwt from "jsonwebtoken";

export const raiseTicket = async (req, res) => {
    try {
        const { title, description, token } = req.body;
        const { id } = jwt.decode(token, process.env.SECRETKEY);

        const newTicket = await Ticket.create({ title, description, raisedBy: id });
        return res.status(201).json({
            message: "Ticket raised successfully",
            success: true,
        });
    } catch (error) {
        console.log(error.message);
    }
};

export const getAllTicket = async (req, res) => {
    try {
        const token = req.query.id;
        console.log("get all ticket");

        const { id, role } = jwt.decode(token, process.env.SECRETKEY);

        let allTickets;
        if (role === "user") allTickets = await Ticket.find({ raisedBy: id });
        else if (role === "agent") allTickets = await Ticket.find({});
        else allTickets = await Ticket.find({});

        return res.status(200).json({
            success: true,
            allTickets,
            raisedBy: id,
        });
    } catch (error) {
        console.log(error.message);
    }
};


export const updateTicketStatus = async (req, res) => {
  const { status, ticketId } = req.body;

  try {
    // Find the ticket by its ID
    const findTicket = await Ticket.findById(ticketId); // Assuming you're using Mongoose

    // Check if ticket was found
    if (!findTicket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    // Update the ticket status
    findTicket.status = status;
    await findTicket.save();

    // Send a successful response
    return res
      .status(200)
      .json({
        message: "Ticket status updated successfully",
        ticket: findTicket,
      });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({
        message: "An error occurred while updating the ticket status",
        error: error.message,
      });
  }
};
