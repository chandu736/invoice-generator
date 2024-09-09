const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice');
const pdf = require('html-pdf');
const path = require('path');
const fs = require('fs');
const ejs = require('ejs');

// POST request to create and generate the invoice
router.post('/generate', async (req, res) => {
    const invoiceData = req.body;

    try {
        // Save the invoice data in MongoDB
        const newInvoice = new Invoice(invoiceData);
        await newInvoice.save();

        // Calculate total amounts and taxes
        let totalAmount = 0;
        let totalTax = 0;

        invoiceData.items.forEach(item => {
            const netAmount = item.unitPrice * item.quantity - item.discount;
            const taxAmount = netAmount * (item.taxRate / 100);
            item.netAmount = netAmount;
            item.taxAmount = taxAmount;

            totalAmount += netAmount;
            totalTax += taxAmount;
        });

        invoiceData.totalAmount = totalAmount + totalTax;
        invoiceData.totalTax = totalTax;

        // Render the HTML template using EJS
        const templatePath = path.join(__dirname, '../templates/invoice-template.ejs');
        const template = fs.readFileSync(templatePath, 'utf8');
        const html = ejs.render(template, { invoiceData });

        // Generate PDF
        const pdfOptions = { format: 'A4' };
        pdf.create(html, pdfOptions).toFile('./public/invoice.pdf', (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error generating PDF' });
            }

            res.json({ pdfUrl: 'http://localhost:5000/invoice.pdf' });
        });
    } catch (error) {
        res.status(500).json({ error: 'Error generating invoice' });
    }
});

module.exports = router;
