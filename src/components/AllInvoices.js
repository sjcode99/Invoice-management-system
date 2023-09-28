import React, { useState } from "react";
import { Container, ListGroup, Button } from "react-bootstrap";
import InvoiceModal from "./InvoiceModal";
import { AiFillEye, AiFillDelete } from "react-icons/ai";
import { GoPencil } from "react-icons/go";
import { useDispatch, useSelector } from "react-redux";
import {
  // editInvoice,
  setSelectedInvoiceById,
  deleteInvoice,
  toggleShowInvoiceForm,
} from "../redux/invoiceSlice";

const AllInvoices = () => {
  const invoiceArray = useSelector((state) => state.invoice?.invoices);
  // const selectedInvoiceById = useSelector(
  //   (state) => state.invoice?.selectedInvoiceById
  // );
  const [isOpen, setIsOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState(null);
  const dispatch = useDispatch();

  // get the invoice by id
  const getInvoiceById = (id) => {
    const invoice = invoiceArray.find((item) => item.id === id);
    dispatch(setSelectedInvoiceById(invoice));
    return invoice;
  };

  // to view invoice
  const handleView = (id) => {
    setIsOpen(true);
    setSelectedInvoice(getInvoiceById(id));
  };

  // to edit invoice
  const handleEdit = (id) => {
    getInvoiceById(id);
    dispatch(toggleShowInvoiceForm());
    // if (selectedInvoiceById) dispatch(editInvoice(selectedInvoiceById));
  };

  // to delete invoice
  const handleDelete = (id) => {
    dispatch(deleteInvoice(id));
  };

  return (
    <>
      {selectedInvoice && (
        <InvoiceModal
          showModal={isOpen}
          closeModal={() => setIsOpen(false)}
          info={selectedInvoice}
          items={selectedInvoice.items}
          currency={selectedInvoice.currency}
          subTotal={selectedInvoice.subTotal}
          taxAmmount={selectedInvoice.taxAmmount}
          discountAmmount={selectedInvoice.discountAmmount}
          total={selectedInvoice.total}
        />
      )}
      <Container>
        <h2>Invoice List</h2>
        <ListGroup className="rounded">
          {invoiceArray.length !== 0 ? (
            invoiceArray.map((item) => (
              <ListGroup.Item
                className="d-flex justify-content-between align-items-center"
                key={item.id}
                style={{ marginBlock: "0.5rem", borderRadius: "0.5rem" }}
              >
                <div className="d-flex flex-column">
                  <div className="me-3">
                    <span className="fw-bold">Customer Name:</span>
                    <span className="ms-2">{item.billTo}</span>
                  </div>
                  <div className="me-3">
                    <span className="fw-bold">Customer Email:</span>
                    <span className="ms-2">{item.billToEmail}</span>
                  </div>
                  <div className="me-3">
                    <span className="fw-bold">Customer Address:</span>
                    <span className="ms-2">{item.billToAddress}</span>
                  </div>
                  <div className="me-3">
                    <span className="fw-bold">Invoice Date:</span>
                    <span className="ms-2">{item.dateOfIssue}</span>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: ".50rem",
                  }}
                >
                  <Button variant="light" onClick={() => handleView(item.id)}>
                    <AiFillEye size={15} />
                    &nbsp; View
                  </Button>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(item.id)}
                  >
                    <AiFillDelete size={15} />
                    &nbsp; Delete
                  </Button>
                  <Button variant="primary" onClick={() => handleEdit(item.id)}>
                    <GoPencil size={15} />
                    &nbsp; Edit
                  </Button>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="d-flex justify-content-center align-items-center">
              <span className="opacity-75">No invoices found</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </Container>
    </>
  );
};

export default AllInvoices;
