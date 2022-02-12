import React, { Fragment, useState } from "react";
import DatetimeRangePicker from "react-datetime-range-picker";
import moment from "moment";
import { Carousel, Col, Row, Form, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { logout, reqConsult } from "../actions/auth";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const [value, setValue] = useState([new Date(), new Date()]);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    comments: "",
  });
  const { name, email, phone, comments } = formData;

  const handleInputChange = (status) => {
    // console.log(status);
    setValue(status);
  };

  const closeCalender = () => {
    debugger;
    console.log(
      "StartDate:" +
        moment(value[0]).format("MMMM Do YYYY, hh:mm:ss A") +
        "           EndDate:" +
        moment(value[1]).format("MMMM Do YYYY, hh:mm:ss A")
    );
  };

  const submitBtn = () => {
    const data = {
      startDate: moment(value["start"]).format("MMMM Do YYYY, hh:mm:ss A"),
      endDate: moment(value["end"]).format("MMMM Do YYYY, hh:mm:ss A"),
      name: name,
      email: email,
      phone: phone,
      comments: comments,
    };
    console.log(data);
    dispatch(reqConsult(data));
  };

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onLogout = () => {
    dispatch(logout());
  };

  return (
    <Fragment>
      <ToastContainer />
      <div className="App">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "20px",
            justifyContent: "center",
            alignItems: "center",
            fontSize: "50px",
            letterSpacing: "16px",
            fontWeight: "600",
          }}
        >
          <img src="assets/images/logo.jpg" width="100px" height="100px" />
          <p>Tax</p>
        </div>
        <Row className="Carousel_Customize">
          <Carousel variant="dark" interval="3000" pause="false">
            <Carousel.Item>
              <div
                style={{
                  background: "url('./assets/images/1.jpg')",
                  height: "600px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></div>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  background: "url('./assets/images/2.jpg')",
                  height: "600px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></div>
            </Carousel.Item>
            <Carousel.Item>
              <div
                style={{
                  background: "url('./assets/images/3.jpg')",
                  height: "600px",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "100% 100%",
                }}
              ></div>
            </Carousel.Item>
          </Carousel>
        </Row>
        <Row className="Content">
          <Col md="8" className="Content_Part">
            <h1>Welcome to Kairos Tax Service.</h1>
            <h3>
              We are a tax firm with 20 years’ experience. We are authorized IRS
              e-file provider
            </h3>
            <p>
              We prepare both individual – 1040 series and business – 1040
              Schedule C, Partnership 1046, C- Corp 1120, S- Corp 1120s, Exempt
              Companies 990 series. We provide our service contactless to help
              you and also save you money. We offer both tax filing and tax
              planning service. We also offer advice on business formation,
              business growth and business financing. Give us a call and we’ll
              be willing to help you or schedule appointment online.
            </p>
            <h1>Picture for Office Managing Partner</h1>
            <h1>Client Portal</h1>
            <h3>Clients Open Verifiable Account and submit document.</h3>
          </Col>
          <Col md="4" className="Content_Part">
            <h3>Schedule a consultation</h3>
            <Row className="Schedule p-4 m-1">
              <Form.Control
                className="mt-2"
                placeholder="Name"
                name="name"
                onChange={onChange}
              />
              <Form.Control
                className="mt-2"
                type="email"
                placeholder="Email"
                name="email"
                onChange={onChange}
              />
              <Form.Control
                className="mt-2"
                placeholder="Phone"
                name="phone"
                onChange={onChange}
              />
              <Form.Control
                className="mt-2"
                type="text"
                placeholder="Comments"
                name="comments"
                onChange={onChange}
              />
              <div
                style={{
                  paddingRight: "0px",
                  paddingLeft: "0px",
                  paddingTop: "5px",
                  paddingBottom: "5px",
                }}
              >
                <DatetimeRangePicker
                  onChange={handleInputChange}
                  value={value}
                  disableClock={true}
                  disableCalendar={false}
                  format={"d-MM-yyyy HH:mm"}
                  minDate={new Date()}
                  onCalendarClose={closeCalender}
                />
              </div>
              <Button className="mt-2" onClick={() => submitBtn()}>
                Request Consultation
              </Button>
            </Row>
          </Col>
        </Row>
        <Row className="Footer">
          <Col md="12">
            <h5>Contact Us</h5>
            <p>kairostaxservice@gmail.com</p>
            <Link
              to="/fileupload"
              style={{
                color: "white",
                textDecoration: "none",
                borderBottom: "0px",
              }}
            >
              <p>Send Us A File</p>
            </Link>
            {isAuthenticated ? (
              <p style={{ cursor: "pointer" }} onClick={onLogout}>
                Logout
              </p>
            ) : (
              <></>
            )}
          </Col>
        </Row>
      </div>
    </Fragment>
  );
};

export default Dashboard;
