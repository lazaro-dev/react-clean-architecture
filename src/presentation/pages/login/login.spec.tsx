import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { render, RenderResult, fireEvent, cleanup, waitFor, screen } from '@testing-library/react';
import { Login } from '@/presentation/pages';
import { AuthenticationSpy, ValidationStub, SaveAccessTokenMock } from '@/presentation/test';
import faker from 'faker';
import { InvalidCredentialsError } from '@/domain/errors';

type SutTypes = {
  sut: RenderResult,
  authenticationSpy: AuthenticationSpy,
  saveAccessTokenMock: SaveAccessTokenMock
}

type SutParams = {
  validationError: string
}

const history = createMemoryHistory({ initialEntries: ['/login']});
const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  const authenticationSpy = new AuthenticationSpy();
  const saveAccessTokenMock = new SaveAccessTokenMock();
  validationStub.errorMessage = params?.validationError;
  const sut = render(
    <Router history={history}>
      <Login 
      validation={validationStub} 
      authentication={authenticationSpy} 
      saveAccessToken={saveAccessTokenMock}
      />
    </Router>
  );
  return {
    sut,
    authenticationSpy,
    saveAccessTokenMock
  }
}

const simulateValidSubmit = 
async (sut: RenderResult,
  email = faker.internet.email(),
  password = faker.internet.password()
): Promise<void> => {
  populateEmailField(sut, email);
  populatePasswordField(sut, password);
  const form = sut.getByTestId('form');
  fireEvent.submit(form);
  await waitFor(() => form);
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()):void => {
  const emailInput = sut.getByTestId('email');    
  fireEvent.input(emailInput, {target: { value: email}});
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()):void => {
  const passwordInput = sut.getByTestId('password');    
  fireEvent.input(passwordInput, {target: { value: password}});
}

const testStatusForField = (sut: RenderResult, fieldName: string, validationError?: string): void => {
  const emailStatus = sut.getByTestId(`${fieldName}-status`);
  expect(emailStatus.title).toBe(validationError || 'Tudo ok');
  expect(emailStatus.textContent).toBe(validationError? 'N' : 'S');
}

const testErrorWrapChildCount = (sut: RenderResult, count: number): void => {
  const errorWrap = sut.getByTestId('error-wrap');
  expect(errorWrap.childElementCount).toBe(count);
}

const testElementExists = (sut: RenderResult, fieldName: string): void => {
  const el = sut.getByTestId(fieldName); 
  expect(el).toBeTruthy();
}

const testElementText = (sut: RenderResult, fieldName: string, text: string): void => {
  const el = sut.getByTestId(fieldName);
  expect(el.textContent).toBe(text);
}

const testButtonIsDisable = (sut: RenderResult, fieldName: string, isDisable: boolean): void => {
  const button = sut.getByTestId(fieldName) as HTMLButtonElement;
  expect(button.disabled).toBe(isDisable);
}

describe('Login Component', () => {
  afterEach(cleanup);
 
  test('should start with initial state', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    testErrorWrapChildCount(sut, 0);
    testButtonIsDisable(sut, 'submit', true);
    testStatusForField(sut, 'email', validationError);
    testStatusForField(sut, 'password', validationError)
  });

  test('should show email error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    populateEmailField(sut);
    testStatusForField(sut, 'email', validationError)
  });

  test('should show password error if validation fails', () => {
    const validationError = faker.random.words();
    const { sut } = makeSut({validationError});
    populatePasswordField(sut);
    testStatusForField(sut, 'password', validationError);
  });
  
  test('should show valid email if validation succeeds', () => {
    const { sut } = makeSut();   
    populateEmailField(sut);
    testStatusForField(sut, 'email');
  });

  test('should show valid password if validation succeeds', () => {
    const { sut } = makeSut();    
    populatePasswordField(sut);
    testStatusForField(sut, 'password');
  });

  test('should enable submit button if form is valid', () => {
    const { sut } = makeSut();
    populateEmailField(sut);
    populatePasswordField(sut);
    testButtonIsDisable(sut, 'submit', false);
  });

  test('should show spinner on submit', async () => {
    const { sut } = makeSut();
    await simulateValidSubmit(sut);
    testElementExists(sut, 'spinner')
  });

  test('should call Authentication with correct values', async () => {
    const { sut, authenticationSpy } = makeSut();
    const email = faker.internet.email();
    const password = faker.internet.password();
    await simulateValidSubmit(sut, email, password);
    expect(authenticationSpy.params).toEqual({email, password});
  });

  test('should call Authentication only once', async () => {
    const { sut, authenticationSpy } = makeSut();
    await simulateValidSubmit(sut);
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(1);
  });

  test('should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { sut, authenticationSpy } = makeSut({validationError});
    await simulateValidSubmit(sut);
    expect(authenticationSpy.callsCount).toBe(0);
  });

  test('should present error if Authentication fails', async () => {
    const { sut, authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut);
    testElementText(sut, 'main-error', error.message);
    testErrorWrapChildCount(sut, 1);
    // expect(screen.getByTestId('main-error')).toBe(error.message)
    // expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  });

  test('should call SaveAccessToken on success', async () => {
    const { sut, authenticationSpy, saveAccessTokenMock } = makeSut();    
    await simulateValidSubmit(sut);
    expect(saveAccessTokenMock.accessToken).toBe(authenticationSpy.account.accessToken);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/');
  });

  test('should present error if SaveAccessToken fails', async () => {
    const { sut, saveAccessTokenMock } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(saveAccessTokenMock, 'save').mockReturnValueOnce(Promise.reject(error))
    await simulateValidSubmit(sut);
    testElementText(sut, 'main-error', error.message);
    testErrorWrapChildCount(sut, 1);
    // expect(screen.getByTestId('main-error')).toBe(error.message)
    // expect(screen.getByTestId('error-wrap').children).toHaveLength(1)
  });

  test('should add go to signup page', () => {
    const { sut } = makeSut();    
    const registre = sut.getByTestId('signup');
    fireEvent.click(registre);
    expect(history.length).toBe(2);
    expect(history.location.pathname).toBe('/signup');
  });

})
