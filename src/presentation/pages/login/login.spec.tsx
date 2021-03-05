import React from 'react';
import { render, RenderResult, fireEvent, cleanup } from '@testing-library/react';
import Login from './login';
import { AuthenticationSpy, ValidationStub } from '@/presentation/test';
import faker from 'faker';

type SutTypes = {
  sut: RenderResult,
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  validationError: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  validationStub.errorMessage = params?.validationError;
  const sut = render(<Login validation={validationStub} authentication={authenticationSpy} />);
  return {
    sut,
    authenticationSpy
  }
}

describe('Login Component', () => {
  afterEach(cleanup);

  test('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    const errorWrap = sut.getByTestId('error-wrap');
    expect(errorWrap.childElementCount).toBe(0);
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(true);
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('N');
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('N');
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    const emailInput = sut.getByTestId('email');    
    fireEvent.input(emailInput, {target: { value: faker.internet.email()}});
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe(validationError);
    expect(emailStatus.textContent).toBe('N');
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    const passwordInput = sut.getByTestId('password');    
    fireEvent.input(passwordInput, {target: { value: faker.internet.password()}});
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe(validationError);
    expect(passwordStatus.textContent).toBe('N');
  });
  
  test('should show valid email if validation succeeds', () => {
    const { sut } = makeSut();   
    const emailInput = sut.getByTestId('email');    
    fireEvent.input(emailInput, {target: { value: faker.internet.email()}});
    const emailStatus = sut.getByTestId('email-status');
    expect(emailStatus.title).toBe('Tudo ok');
    expect(emailStatus.textContent).toBe('S');
  });

  test('should show valid password if validation succeeds', () => {
    const { sut } = makeSut();    
    const passwordInput = sut.getByTestId('password');    
    fireEvent.input(passwordInput, {target: { value: faker.internet.password()}});
    const passwordStatus = sut.getByTestId('password-status');
    expect(passwordStatus.title).toBe('Tudo ok');
    expect(passwordStatus.textContent).toBe('S');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');    
    fireEvent.input(emailInput, {target: { value: faker.internet.email()}});
    const passwordInput = sut.getByTestId('password');    
    fireEvent.input(passwordInput, {target: { value: faker.internet.password()}});
    const submitButton = sut.getByTestId('submit') as HTMLButtonElement;
    expect(submitButton.disabled).toBe(false);
  });

  test('should show spinner on submit', () => {
    const { sut } = makeSut();
    const emailInput = sut.getByTestId('email');    
    fireEvent.input(emailInput, {target: { value: faker.internet.email()}});
    const passwordInput = sut.getByTestId('password');    
    fireEvent.input(passwordInput, {target: { value: faker.internet.password()}});
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    const spinner = sut.getByTestId('spinner'); 
    expect(spinner).toBeTruthy();
  });

  test('should call Authentication with correct values', () => {
    const { sut, authenticationSpy } = makeSut();
    const emailInput = sut.getByTestId('email');    
    const email = faker.internet.email();
    fireEvent.input(emailInput, {target: { value: email}});
    const password = faker.internet.password();
    const passwordInput = sut.getByTestId('password');
    fireEvent.input(passwordInput, {target: { value: password}});
    const submitButton = sut.getByTestId('submit');
    fireEvent.click(submitButton);
    
    expect(authenticationSpy.params).toEqual({
      email,
      password
    });
  });


})

