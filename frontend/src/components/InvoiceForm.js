import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const InvoiceForm = () => {
    const [formData, setFormData] = useState({
        sellerDetails: { name: '', address: '', city: '', state: '', pincode: '', pan: '', gst: '' },
        billingDetails: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' },
        shippingDetails: { name: '', address: '', city: '', state: '', pincode: '', stateCode: '' },
        placeOfSupply: '',
        placeOfDelivery: '',
        orderDetails: { orderNo: '', orderDate: '' },
        invoiceDetails: { invoiceNo: '', invoiceDate: '' },
        reverseCharge: 'No',
        items: [{ description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }],
        signatureImage: ''
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        axios.post('http://localhost:5000/api/invoice/generate', formData)
            .then(response => {
                window.open(response.data.pdfUrl);
            })
            .catch(error => {
                console.error('Error generating invoice:', error);
            });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        const [field, subfield] = name.split('.');
        if (subfield) {
            setFormData(prev => ({
                ...prev,
                [field]: { ...prev[field], [subfield]: value }
            }));
        } else {
            setFormData(prev => ({ ...prev, [name]: value }));
        }
    };

    const handleItemChange = (index, e) => {
        const { name, value } = e.target;
        const updatedItems = [...formData.items];
        updatedItems[index] = { ...updatedItems[index], [name]: value };
        setFormData(prev => ({ ...prev, items: updatedItems }));
    };

    const addItem = () => {
        setFormData(prev => ({
            ...prev,
            items: [...prev.items, { description: '', unitPrice: 0, quantity: 0, discount: 0, taxRate: 18 }]
        }));
    };

    const handleSignatureUpload = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prev => ({ ...prev, signatureImage: reader.result }));
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className="container mt-5">
            <div className="card shadow-lg">
                <div className="card-header bg-primary text-white text-center">
                    <h3>Invoice Generation Form</h3>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Seller Details */}
                        <h4 className="text-secondary">Seller Details</h4>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Seller Name</label>
                                <input type="text" className="form-control" name="sellerDetails.name" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Seller Address</label>
                                <input type="text" className="form-control" name="sellerDetails.address" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>City</label>
                                <input type="text" className="form-control" name="sellerDetails.city" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>State</label>
                                <input type="text" className="form-control" name="sellerDetails.state" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Pincode</label>
                                <input type="text" className="form-control" name="sellerDetails.pincode" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>PAN No.</label>
                                <input type="text" className="form-control" name="sellerDetails.pan" onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* Billing Details */}
                        <h4 className="text-secondary mt-4">Billing Details</h4>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Billing Name</label>
                                <input type="text" className="form-control" name="billingDetails.name" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Billing Address</label>
                                <input type="text" className="form-control" name="billingDetails.address" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>City</label>
                                <input type="text" className="form-control" name="billingDetails.city" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>State</label>
                                <input type="text" className="form-control" name="billingDetails.state" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Pincode</label>
                                <input type="text" className="form-control" name="billingDetails.pincode" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>State/UT Code</label>
                                <input type="text" className="form-control" name="billingDetails.stateCode" onChange={handleInputChange} />
                            </div>
                        </div>
                        {/* Shipping Details */}
                        <h4 className="text-secondary mt-4">Shipping Details</h4>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>Shipping Name</label>
                                <input type="text" className="form-control" name="shippingDetails.name" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Shipping Address</label>
                                <input type="text" className="form-control" name="shippingDetails.address" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>City</label>
                                <input type="text" className="form-control" name="shippingDetails.city" onChange={handleInputChange} />
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-4 form-group">
                                <label>State</label>
                                <input type="text" className="form-control" name="shippingDetails.state" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>Pincode</label>
                                <input type="text" className="form-control" name="shippingDetails.pincode" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-4 form-group">
                                <label>State/UT Code</label>
                                <input type="text" className="form-control" name="shippingDetails.stateCode" onChange={handleInputChange} />
                            </div>
                        </div>
                        {/* Order Details */}
                        <h4 className="text-secondary mt-4">Order Details</h4>
                        <div className="row">
                            <div className="col-md-6 form-group">
                                <label>Order No.</label>
                                <input type="text" className="form-control" name="orderDetails.orderNo" onChange={handleInputChange} />
                            </div>
                            <div className="col-md-6 form-group">
                                <label>Order Date</label>
                                <input type="date" className="form-control" name="orderDetails.orderDate" onChange={handleInputChange} />
                            </div>
                        </div>

                        {/* Items Section */}
                        <h4 className="text-secondary mt-4">Items</h4>
                        {formData.items.map((item, index) => (
                            <div key={index} className="row">
                                <div className="col-md-3 form-group">
                                    <label>Description</label>
                                    <input type="text" className="form-control" name="description" value={item.description} onChange={(e) => handleItemChange(index, e)} />
                                </div>
                                <div className="col-md-2 form-group">
                                    <label>Unit Price</label>
                                    <input type="number" className="form-control" name="unitPrice" value={item.unitPrice} onChange={(e) => handleItemChange(index, e)} />
                                </div>
                                <div className="col-md-2 form-group">
                                    <label>Quantity</label>
                                    <input type="number" className="form-control" name="quantity" value={item.quantity} onChange={(e) => handleItemChange(index, e)} />
                                </div>
                                <div className="col-md-2 form-group">
                                    <label>Discount</label>
                                    <input type="number" className="form-control" name="discount" value={item.discount} onChange={(e) => handleItemChange(index, e)} />
                                </div>
                                <div className="col-md-2 form-group">
                                    <label>Tax Rate (%)</label>
                                    <input type="number" className="form-control" name="taxRate" value={item.taxRate} onChange={(e) => handleItemChange(index, e)} />
                                </div>
                            </div>
                        ))}
                        <button type="button" className="btn btn-info mt-2" onClick={addItem}>Add Item</button>

                        {/* Signature */}
                        <h4 className="text-secondary mt-4">Signature</h4>
                        <div className="form-group">
                            <input type="file" className="form-control-file" onChange={handleSignatureUpload} />
                        </div>

                        {/* Submit Button */}
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-success btn-lg">Generate Invoice</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default InvoiceForm;
