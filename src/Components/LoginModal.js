import React, {useState} from "react";
import styled from "styled-components";
import {FaTimes, FaPlayCircle} from "react-icons/fa";
import {FcGoogle} from "react-icons/fc";
import PrimaryButton from "./ui/PrimaryButton";
import SecondaryButton from "./ui/SecondaryButton";

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const Modal = styled.div`
  background: #1a1a2e;
  border-radius: 20px;
  width: 100%;
  max-width: 440px;
  padding: 40px;
  position: relative;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: 16px;
  right: 16px;
  background: transparent;
  border: none;
  color: #8892a4;
  font-size: 20px;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #e22227;
  }
`;

const LogoArea = styled.div`
  display: flex;
  align-items: center;
  gap: 0.6rem;
  justify-content: center;
  margin-bottom: 8px;

  .icon {
    color: #e22227;
    font-size: 1.8rem;
  }

  span {
    color: #f8fafc;
    font-size: 1.5rem;
    font-weight: 800;
  }
`;

const Subtitle = styled.p`
  text-align: center;
  color: #8892a4;
  font-size: 14px;
  margin: 0 0 30px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 18px;
`;

const Field = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  label {
    font-size: 13px;
    color: #d9e2ec;
    font-weight: 500;
  }

  input {
    padding: 12px 16px;
    border-radius: 10px;
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: #222831;
    color: #f8fafc;
    font-size: 14px;
    font-family: "Inter", sans-serif;
    outline: none;
    transition: border-color 0.3s ease;

    &::placeholder {
      color: #55606e;
    }

    &:focus {
      border-color: #e22227;
    }
  }
`;

const Divider = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin: 4px 0;

  &::before,
  &::after {
    content: "";
    flex: 1;
    height: 1px;
    background: rgba(255, 255, 255, 0.08);
  }

  span {
    color: #55606e;
    font-size: 12px;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }
`;

const SwitchText = styled.p`
  text-align: center;
  color: #8892a4;
  font-size: 13px;
  margin-top: 20px;

  span {
    color: #e22227;
    cursor: pointer;
    font-weight: 600;

    &:hover {
      text-decoration: underline;
    }
  }
`;

function LoginModal({ onClose, onSwitchToSignUp }) {
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <Backdrop onClick={onClose}>
      <Modal onClick={(e) => e.stopPropagation()}>
        <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>

        <LogoArea>
          <FaPlayCircle className="icon" />
          <span>AniPulse</span>
        </LogoArea>
        <Subtitle>Welcome back! Sign in to continue watching</Subtitle>

        <Form onSubmit={handleSubmit}>
          <Field>
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={form.email}
              onChange={handleChange}
            />
          </Field>

          <Field>
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={form.password}
              onChange={handleChange}
            />
          </Field>

          <PrimaryButton type="submit" fullWidth>Log In</PrimaryButton>

          <Divider><span>or</span></Divider>

          <SecondaryButton type="button" fullWidth>
            <FcGoogle size={20} />
            Continue with Google
          </SecondaryButton>
        </Form>

        <SwitchText>
          Don't have an account?{" "}
          <span onClick={onSwitchToSignUp}>Sign Up</span>
        </SwitchText>
      </Modal>
    </Backdrop>
  );
}

export default LoginModal;
