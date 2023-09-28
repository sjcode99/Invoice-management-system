import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Container from "react-bootstrap/Container";
import InvoiceForm from "./components/InvoiceForm";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";
import { toggleShowInvoiceForm } from "./redux/invoiceSlice";
import InvoiceList from "./components/InvoiceList";

class App extends Component {
  closeFormModal() {
    this.props.toggleShowInvoiceForm();
  }

  openFormModal() {
    this.props.toggleShowInvoiceForm();
  }

  errorHandler(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    const showInvoiceForm = this.props.showInvoiceForm;

    return (
      <div>
        <Container className="h-full w-70 p-4">
          <Button
            variant="primary"
            className="w-30"
            onClick={
              showInvoiceForm
                ? this.closeFormModal.bind(this)
                : this.openFormModal.bind(this)
            }
          >
            {showInvoiceForm ? "← Invoice List" : "+ Create Invoice"}
          </Button>
          <div>
            <hr></hr>
          </div>
          {showInvoiceForm ? <InvoiceForm /> : <InvoiceList />}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showInvoiceForm: state.invoice.showInvoiceForm,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    toggleShowInvoiceForm: () => dispatch(toggleShowInvoiceForm()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
