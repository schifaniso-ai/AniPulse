import React, {useState} from "react";
import styled from "styled-components";
import {FaTimes, FaPlayCircle} from "react-icons/fa";
import PrimaryButton from "./ui/PrimaryButton";

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

function SignUpModal({ onClose, onSwitchToLogin }){
const [form, setForm] = useState({name: "", email: "", password: "", confirm: ""});

const handleChange = (e)=>{
    setForm({...form, [e.target.name]: e.target.value});
};

const handleSubmit = (e)=>{
    e.preventDefault();
};

return (
<Backdrop onClick={onClose}>
<Modal onClick={(e)=>e.stopPropagation()}>
    <CloseBtn onClick={onClose}><FaTimes /></CloseBtn>

    <LogoArea>
    <FaPlayCircle className="icon" />
    <span>AniPulse</span>
    </LogoArea>
    <Subtitle>Create your account to start watching</Subtitle>

    <Form onSubmit={handleSubmit}>
    <Field>
        <label>Name</label>
        <input
        type="text"
        name="name"
        placeholder="Enter your name"
        value={form.name}
        onChange={handleChange}
        />
    </Field>

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
        placeholder="Create a password"
        value={form.password}
        onChange={handleChange}
        />
    </Field>

    <Field>
        <label>Confirm Password</label>
        <input
        type="password"
        name="confirm"
        placeholder="Confirm your password"
        value={form.confirm}
        onChange={handleChange}
        />
    </Field>

    <PrimaryButton type="submit" fullWidth>Sign Up</PrimaryButton>
    </Form>

    <SwitchText>Already have an account? <span onClick={onSwitchToLogin}>Sign In</span></SwitchText>
</Modal>
</Backdrop>
)
}

export default SignUpModal;
