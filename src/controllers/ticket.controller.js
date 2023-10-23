import Ticket from "../models/ticket.model.js";

export const getTickets = async (req, res) => {
  try {
    //* Return all tickets for user logged in
    const tickets = await Ticket.find({
      //* The $or property was used to display the data if a user exists in the array.
      $or: [{ user: req.user.id }, { receiver: req.user.id }],
    }).populate(["user", "receiver"]);
    res.json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrog" });
  }
};

export const createTicket = async (req, res) => {
  try {
    //* Receiver added for create ticket
    const { dependencies, title, description, date, receiver } = req.body;
    const newTicket = new Ticket({
      dependencies,
      title,
      description,
      date,
      receiver,
      user: req.user.id,
    });
    const savedTicket = await newTicket.save();
    res.json(savedTicket);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrog" });
  }
};

export const getTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findById(req.params.id).populate("user");
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    return res.status(404).json({ message: "Ticket not found" });
  }
};

export const deleteTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndDelete(req.params.id);
    if (!ticket) return res.status(404).json({ message: "Ticket not found" });
    return res.sendStatus(204);
  } catch (error) {
    return res.status(404).json({ messege: "Ticket not found" });
  }
};

export const updateTicket = async (req, res) => {
  try {
    const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!ticket) return res.status(404).json({ messege: "Ticket not found" });
    res.json(ticket);
  } catch (error) {
    return res.status(404).json({ messege: "Ticket not found" });
  }
};
