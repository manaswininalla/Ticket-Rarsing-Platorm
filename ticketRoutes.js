const express = require('express');
const Ticket = require('../models/Ticket');

const router = express.Router();

// Create Ticket
router.post('/', async (req, res) => {
    try {
        const { title, description } = req.body;
        const newTicket = new Ticket({ title, description });
        await newTicket.save();
        res.status(201).json(newTicket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Get All Tickets
router.get('/', async (req, res) => {
    try {
        const tickets = await Ticket.find();
        res.status(200).json(tickets);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update Ticket Status
router.put('/:id', async (req, res) => {
    try {
        const ticket = await Ticket.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(ticket);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Delete Ticket
router.delete('/:id', async (req, res) => {
    try {
        await Ticket.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: 'Ticket deleted' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
