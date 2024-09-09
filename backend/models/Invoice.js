const mongoose = require('mongoose');

const InvoiceSchema = new mongoose.Schema({
    sellerDetails: {
        name: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        pan: String,
        gst: String
    },
    billingDetails: {
        name: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        stateCode: String
    },
    shippingDetails: {
        name: String,
        address: String,
        city: String,
        state: String,
        pincode: String,
        stateCode: String
    },
    placeOfSupply: String,
    placeOfDelivery: String,
    orderDetails: {
        orderNo: String,
        orderDate: Date
    },
    invoiceDetails: {
        invoiceNo: String,
        invoiceDate: Date
    },
    reverseCharge: String,
    items: [{
        description: String,
        unitPrice: Number,
        quantity: Number,
        discount: Number,
        netAmount: Number,
        taxRate: Number,
        taxAmount: Number
    }],
    totalAmount: Number,
    totalTax: Number,
    signatureImage: String
});

module.exports = mongoose.model('Invoice', InvoiceSchema);
