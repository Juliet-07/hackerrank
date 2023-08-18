import React, { useState } from "react";
import "./PaymentValidation.css";

const PaymentValidation = () => {
  const initialValues = {
    cardName: "",
    cardNumber: "",
    expiryMonth: "",
    expiryYear: "",
    cvv: "",
    cardNumberError: false,
    cardNameError: false,
    expiryMonthError: false,
    expiryYearError: false,
    cvvError: false,
  };

  const [cardDetails, setCardDetails] = useState(initialValues);
  const {
    cardName,
    cardNumber,
    expiryMonth,
    expiryYear,
    cvv,
    cardNumberError,
    cardNameError,
    expiryMonthError,
    expiryYearError,
    cvvError,
  } = cardDetails;

  const [formValid, setFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    let error = false;
    const currentYear = new Date().getFullYear();

    if (name === "expiryMonth") {
      error = !/^\d{2}$/.test(value) || Number(value) > 12;
    } else if (name === "expiryYear") {
      const year = Number(value);
      error =
        !/^\d{4}$/.test(value) || year < currentYear || year > currentYear + 10;
    } else if (name === "cvv") {
      error = !/^\d{3}$/.test(value);
    } else if (name === "cardNumber") {
      error = !/^\d{16}$/.test(value);
    } else if (name === "cardName") {
      error = !/^[A-Za-z\s]+$/.test(value);
    }

    const updatedCardDetails = {
      ...cardDetails,
      [name]: value,
      [`${name}Error`]: error,
    };

    const allValidationsComplete = Object.values(updatedCardDetails).every(
      (field) => field !== "" && field !== false
    );

    setCardDetails(updatedCardDetails);

    // Update formValid based on the validation status of all inputs
    setFormValid(allValidationsComplete);
  };

  return (
    <div className="mt-30 layout-column justify-content-center align-items-center">
      <div className="card outlined" style={{ width: "650px" }}>
        <div data-testid="debit-card">
          <h3 style={{ textAlign: "center" }}>Card Details</h3>
          <br />
          <div className="debit-card-body">
            <p className="debit-card-bank">Bank Name</p>
            <p className="debit-card-no">{cardNumber || "XXXXXXXXXXXXXXXX"}</p>
            <br />
            <div
              style={{ height: "45px", backgroundColor: "black" }}
              className="debit-card-stripe"
            ></div>
            <p>
              <span className="debit-card-holder-name">
                {cardName || "HOLDER NAME"}
              </span>
              <span className="debit-card-date">
                {expiryMonth || "MM"}/{expiryYear || "YYYY"}
              </span>
              <span className="debit-card-cvv">{cvv || "CVV"}</span>
            </p>
          </div>
        </div>
        <section>
          <div className="pa-50">
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="layout-column mb-15">
                <input
                  placeholder="Card Number"
                  data-testid="cardNumberInput"
                  name="cardNumber"
                  value={cardNumber}
                  onChange={handleChange}
                />
                {cardNumberError && (
                  <p className="invalid-text" data-testid="numberInputError">
                    Invalid Card Number
                  </p>
                )}
              </div>
              <div className="layout-column mb-15">
                <input
                  placeholder="Name On Card"
                  data-testid="nameInput"
                  name="cardName"
                  value={cardName}
                  onChange={handleChange}
                />
                {cardNameError && (
                  <p className="invalid-text" data-testid="nameInputError">
                    Invalid Card Name
                  </p>
                )}
              </div>
              <div className="flex justify-content-around align-items-center">
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="Expiry Month"
                    data-testid="monthInput"
                    name="expiryMonth"
                    value={expiryMonth}
                    onChange={handleChange}
                  />
                  {expiryMonthError && (
                    <p className="invalid-text" data-testid="monthInputError">
                      Invalid Month
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="Expiry Year"
                    data-testid="yearInput"
                    name="expiryYear"
                    value={expiryYear}
                    onChange={handleChange}
                  />
                  {expiryYearError && (
                    <p className="invalid-text" data-testid="yearInputError">
                      Invalid Year
                    </p>
                  )}
                </div>
                <div className="layout-column mb-30">
                  <input
                    type="number"
                    placeholder="CVV"
                    data-testid="cvvInput"
                    name="cvv"
                    value={cvv}
                    onChange={handleChange}
                  />
                  {cvvError && (
                    <p className="invalid-text" data-testid="cvvInputError">
                      Invalid CVV
                    </p>
                  )}
                </div>
              </div>
              <div className="layout-column mb-30">
                <button
                  type="submit"
                  className="mx-0"
                  data-testid="submitButton"
                  disabled={!formValid}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default PaymentValidation;
