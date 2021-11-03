import React, { useEffect, useState } from "react";
import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import { convertDateToObj, convertObjToData } from "../util/date";
import customAxios from "../config/customAxios";
import * as yup from "yup";
import { useFormik } from "formik";
import {
  Col,
  Row,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
} from "reactstrap";
import { Modal } from "react-bootstrap";
import { logout } from "../store/slice/authSlice";
import { useDispatch, useSelector } from "react-redux";

const field = {
  mobileNumber: "MobileNumber",
  firstName: "FirstName",
  lastName: "LastName",
  fatherName: "FatherName",
  gender: "Gender",
  nationalCode: "NationalCode",
  brithDate: "BrithDate",
  phone: "Phone",
  email: "Email",
  postalCode: "PostalCode",
  address: "Address",
};

const initialValues = {
  mobileNumber: "",
  firstName: "",
  lastName: "",
  fatherName: "",
  gender: "",
  nationalCode: "",
  brithDate: null,
  phone: "",
  email: "",
  postalCode: "",
  address: "",
  smsCode: "",
};

function Dashboard() {
  const auth = useSelector((state) => state.auth);
  const [smsCode, setSmsCode] = useState("");

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch = useDispatch();

  useEffect(() => {
    handleGetData();
  }, []);

  const handleSubmit = (values) => {
    const data = {
      mobileNumber: values.mobileNumber,
      nationalCode: values.nationalCode,
    };

    customAxios
      .post("/User/FinnotechRequestSmsAuthentication", data)
      .then(() => {
        handleShow();
      })
      .catch((err) => console.log(err));
  };

  const formik = useFormik({
    initialValues,
    onSubmit: handleSubmit,

    validationSchema: yup.object({
      firstName: yup.string().required("نام ضروری است."),
      lastName: yup.string().required("نام خانوادگی ضروری است."),
      fatherName: yup.string().required("نام پدر ضروری است."),
      gender: yup.string().required("جنسیت ضروری است."),
      nationalCode: yup.string().required("کد ملی معتبر نمی باشد."),
      // brithDate:  ,
      phone: yup.string().required("تلفن منزل ضروری است."),
    }),
  });
  // console.log(Object.entries(field));

  const handleConfirm = (values) => {
    const data = {
      mobileNumber: values.mobileNumber,
      nationalCode: values.nationalCode,
      smsCode,
    };

    customAxios
      .post("/User/FinnotechConfirmSmsAuthentication", data)
      .then(() => {
        handleUpdate();
      })
      .catch((err) => console.log(err));
  };

  const handleUpdate = () => {
    const data = {
      firstName: formik.values.firstName,
      lastName: formik.values.lastName,
      fatherName: formik.values.fatherName,
      gender: formik.values.gender,
      nationalCode: formik.values.nationalCode,
      brithDate: convertObjToData(formik.values.brithDate),
      phone: formik.values.phone,
      email: formik.values.email,
      postalCode: formik.values.postalCode,
      address: formik.values.address,
    };

    customAxios
      .put("/User/my", data)
      .then(() => {
        setShow(false);
      })
      .catch((err) => console.log(err));
  };

  const handleGetData = () => {
    customAxios
      .get("/User/my")
      .then((res) => {
        const data = res.data.Data;
        Object.entries(field).forEach(([key, value]) => {
          if (key === "brithDate")
            return formik.setFieldValue(key, convertDateToObj(data[value]));
          formik.setFieldValue(key, data[value]);
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="navbar">
        <h6>{auth.name} خوش آمدید.</h6>
        <a href="">
          <Button onClick={() => dispatch(logout())}>خروج</Button>
        </a>
      </nav>
      <Form onSubmit={formik.handleSubmit} className="dashboard-form">
        <Container>
          <h1>پروفایل</h1>
          <Row>
            <Col md={6}>
              <FormGroup>
                <Label>شماره موبایل</Label>
                <Input
                  type="text"
                  value={formik.values.mobileNumber}
                  onChange={formik.handleChange}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>نام</Label>
                <Input
                  name="firstName"
                  type="text"
                  value={formik.values.firstName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <div className="error">{formik.errors.firstName}</div>
                ) : null}
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>نام خانوادگی</Label>
                <Input
                  name="lastName"
                  type="text"
                  value={formik.values.lastName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <div className="error">{formik.errors.lastName}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>نام پدر</Label>
                <Input
                  name="fatherName"
                  type="text"
                  value={formik.values.fatherName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.fatherName && formik.errors.fatherName ? (
                  <div className="error">{formik.errors.fatherName}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>جنسیت</Label>
                <Input
                  className="gender-input"
                  name="gender"
                  type="select"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                >
                  <option>زن</option>
                  <option>مرد</option>
                  <option>سایر</option>
                </Input>
                {formik.touched.gender && formik.errors.gender ? (
                  <div className="error">{formik.errors.gender}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>کدملی</Label>
                <Input
                  name="nationalCode"
                  type="text"
                  value={formik.values.nationalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.nationalCode && formik.errors.nationalCode ? (
                  <div className="error">{formik.errors.nationalCode}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>تلفن</Label>
                <Input
                  name="phone"
                  type="text"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.phone && formik.errors.phone ? (
                  <div className="error">{formik.errors.phone}</div>
                ) : null}
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>ایمیل</Label>
                <Input
                  name="email"
                  type="text"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
            </Col>

            <Col md={6}>
              <FormGroup>
                <Label>کدپستی</Label>
                <Input
                  name="postalCode"
                  type="text"
                  value={formik.values.postalCode}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>آدرس</Label>
                <Input
                  name="address"
                  type="text"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Label>تاریخ تولد</Label>
                <DatePicker
                  className="birth-input"
                  value={formik.values.brithDate}
                  onChange={(value) => {
                    formik.handleChange({
                      target: {
                        value: value,
                        name: "brithDate",
                      },
                    });
                  }}
                  inputName="brithDate"
                  locale="fa"
                  shouldHighlightWeekends
                />
              </FormGroup>
            </Col>
            <Col md={6}>
              <FormGroup>
                <Button type="submit">ثبت مشخصات</Button>
              </FormGroup>
            </Col>
          </Row>
        </Container>
      </Form>

      {/* MODAL */}

      <Modal
        className="modal"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header>
          <Modal.Title>کد ارسال شده را وارد کنید.</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Input
            type="text"
            name="smsCode"
            placeholder="کد را وارد کنید."
            value={smsCode}
            onChange={(e) => setSmsCode(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer className="modal-btn">
          <Button onClick={handleConfirm}>تایید</Button>
          <Button onClick={handleClose}>بستن</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Dashboard;
