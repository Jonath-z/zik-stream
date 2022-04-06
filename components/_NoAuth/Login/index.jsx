import React from 'react';
import { Button, Input, Row, Col, Space } from 'antd';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { useLogin } from '../../contexts/LoginContext';

const LoginPage = () => {
  const {
    onEmailChange,
    onPasswordChange,
    login,
    isCreationProcess,
    isGettingError,
    isValidPassword,
  } = useLogin();
  return (
    <div>
      <p>Welcome Back</p>
      <Row>
        <Col>
          <Space direction="vertical">
            <Input
              type="email"
              placeholder="Enter your email"
              onChange={onEmailChange}
            />
            <Input
              type="password"
              placeholder="Password"
              onChange={onPasswordChange}
              style={{
                borderColor: `${isValidPassword ? 'blue' : 'red'}`,
              }}
            />
            {isGettingError && (
              <p styles={{ color: 'red' }}>
                Email or password incorrect
              </p>
            )}
            <Button
              onClick={login}
              disabled={isValidPassword ? false : true}
            >
              {isCreationProcess ? (
                <span>
                  <AiOutlineLoading3Quarters /> Processing
                </span>
              ) : (
                <span>Log in</span>
              )}
            </Button>
            <p>Log in Now</p>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default LoginPage;