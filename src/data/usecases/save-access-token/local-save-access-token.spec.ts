import { LocalSaveAccessToken } from "./local-save-access-token";
import faker from "faker";
import { SetStorageMock } from "@/data/test/mock-storage";

type SutTypes = {
  sut: LocalSaveAccessToken,
  setStorageMock: SetStorageMock
}

const makeSut = (): SutTypes => {
  const setStorageMock = new SetStorageMock();
  const sut = new LocalSaveAccessToken(setStorageMock);
  return { 
    sut,
    setStorageMock
   }
}

describe('LocalSaveAccessToken', () => {
  test('should call SetStorage with correct value',async () => {
    const { sut, setStorageMock } = makeSut();
    const accessToken = faker.random.uuid();
    await sut.save(accessToken);
    expect(setStorageMock.key).toBe('accessToken');
    expect(setStorageMock.value).toBe(accessToken);
  });
  
  test('should Throw if SetStorage Throws', async () => {
    const { sut, setStorageMock } = makeSut();
    jest.spyOn(setStorageMock, 'set').mockRejectedValueOnce(new Error());
    const promisse = sut.save(faker.random.uuid());
    await expect(promisse).rejects.toThrow(new Error());
  });
  
})
