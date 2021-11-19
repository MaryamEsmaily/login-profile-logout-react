import { useHistory } from "react-router";
import { Button, Col, Row, Input, Container } from "reactstrap";
import customAxios from "../config/customAxios";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { useDispatch } from "react-redux";
import { setData } from "../store/slice/authSlice";
import { toast } from "react-toastify";

const formSchema = yup.object().shape({
  mobileNumber: yup
    .number()
    .typeError("ورودی باید عدد باشد.")
    .required("وارد کردن شماره موبایل ضروری است."),
  password: yup.string().required("وارد کردن رمزعبور ضروری است."),
});

const initialValues = {
  mobileNumber: "",
  password: "",
};

function Login() {
  const history = useHistory();

  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    customAxios
      .post("/User/LoginWithPassword", values)
      .then((res) => {
        dispatch(
          setData({
            access_token: res.data.Date?.access_token,
            name: res.data.Data?.name,
          })
        );
        localStorage.setItem("TOKEN", res.data.Data.access_token);
        localStorage.setItem("NAME", res.data.Data.name);
        toast.success("با موفقیت وارد شدید.");
        history.push("/Dashboard");
      })
      .catch((err) => {
        if (err.response.status === 400) {
          toast.error("نام کاربری یا رمز عبور اشتباه است!");
        }
      });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={handleSubmit}
    >
      {({
        errors,
        touched,
        values,
        handleChange,
        handleSubmit,
        handleBlur,
      }) => (
        <Form onSubmit={handleSubmit} className="input-form">
          <Container>
            <h2>ورود</h2>
            <Row>
              <Col>
                <label>شماره موبایل</label>
                <Input
                  name="mobileNumber"
                  type="text"
                  placeholder="شماره موبایل"
                  value={values.mobileNumber}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.mobileNumber && errors.mobileNumber ? (
                  <div className="error">{errors.mobileNumber}</div>
                ) : null}
              </Col>
            </Row>
            <Row>
              <Col>
                <label>رمز عبور</label>
                <Input
                  name="password"
                  type="password"
                  placeholder="رمزعبور"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.password && errors.password ? (
                  <div className="error">{errors.password}</div>
                ) : null}
              </Col>
            </Row>

            <Col md={12}>
              <Button type="submit" color="primary">
                ورود
              </Button>
            </Col>
          </Container>
        </Form>
      )}
    </Formik>
  );
}

export default Login;
