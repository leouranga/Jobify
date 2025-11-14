import { Link } from "react-router-dom";
import Wrapper from "../assets/wrappers/RegisterAndLoginPage";
import { FormRow, Logo } from "../components";

const Register = () => {
  return (
    <Wrapper>
      <form className="form">
        <Logo />
        <h4>Register</h4>
        <FormRow type="text" name="name" defaultValue="jake" />
        <FormRow
          type="text"
          name="lastname"
          labelText="last name"
          defaultValue="oss"
        />
        <FormRow type="text" name="location" defaultValue="United States" />
        <FormRow type="email" name="email" defaultValue="jake@gmail.com" />
        <FormRow type="password" name="password" defaultValue="123456" />
        <button type="submit" className="btn btn-block">
          submit
        </button>
        <p>
          Already a member?
          <Link to="/login" className="member-btn">
            Login
          </Link>
        </p>
      </form>
    </Wrapper>
  );
};
export default Register;
